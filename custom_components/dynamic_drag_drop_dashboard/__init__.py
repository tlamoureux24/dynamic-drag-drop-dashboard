"""Dynamic Drag & Drop Dashboard integration."""

from __future__ import annotations

import logging
from pathlib import Path
from typing import Any

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.loader import async_get_integration

from .const import DOMAIN, FRONTEND_FILENAME, FRONTEND_URL
from .views import register_http_views

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up persistence and load the bundled Lovelace module."""
    state = hass.data.setdefault(DOMAIN, {})
    register_http_views(hass)

    if not state.get("frontend_registered"):
        frontend_path = Path(__file__).parent / "frontend" / FRONTEND_FILENAME
        await hass.http.async_register_static_paths(
            [StaticPathConfig(FRONTEND_URL, str(frontend_path), True)]
        )
        # The static file is cached for 31 days, so the module URL carries the
        # integration version to make browsers fetch each release.
        integration = await async_get_integration(hass, DOMAIN)
        module_url = f"{FRONTEND_URL}?v={integration.version}"
        add_extra_js_url(hass, module_url)
        # The extra module only reaches pages rendered after this setup, and the
        # frontend service worker keeps serving older copies of the page. A
        # Lovelace resource is fetched with each dashboard config instead.
        await _async_sync_lovelace_resource(hass, module_url)
        state["frontend_registered"] = True

    return True


async def async_remove_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Remove the Lovelace resource so dashboards stop requesting the module."""
    await _async_sync_lovelace_resource(hass, None)


def _lovelace_resources(hass: HomeAssistant) -> Any | None:
    """Return the editable Lovelace resource collection, if resources use storage."""
    data = hass.data.get("lovelace")
    resources = getattr(data, "resources", None)
    if resources is None and isinstance(data, dict):
        resources = data.get("resources")
    if resources is None or not hasattr(resources, "async_create_item"):
        # YAML resource mode: users list the module in configuration.yaml.
        return None
    return resources


async def _async_sync_lovelace_resource(hass: HomeAssistant, url: str | None) -> None:
    """Point the module resource at url, or remove it when url is None."""
    resources = _lovelace_resources(hass)
    if resources is None:
        return
    try:
        if not getattr(resources, "loaded", True):
            await resources.async_load()
            resources.loaded = True
        items = [
            item
            for item in resources.async_items()
            if str(item.get("url", "")).split("?")[0] == FRONTEND_URL
        ]
        if url is None:
            for item in items:
                await resources.async_delete_item(item["id"])
            return
        if not items:
            await resources.async_create_item({"res_type": "module", "url": url})
            return
        first, *duplicates = items
        if first.get("url") != url or first.get("type") != "module":
            await resources.async_update_item(
                first["id"], {"res_type": "module", "url": url}
            )
        for item in duplicates:
            await resources.async_delete_item(item["id"])
    except Exception:  # noqa: BLE001 - the extra module still loads on fresh pages
        _LOGGER.warning("Could not register the dashboard Lovelace resource", exc_info=True)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload the config entry.

    HTTP routes and static paths remain registered until Home Assistant restarts.
    """
    return True
