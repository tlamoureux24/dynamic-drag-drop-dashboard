"""Dynamic Drag & Drop Dashboard integration."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN, FRONTEND_FILENAME, FRONTEND_URL
from .views import register_http_views


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up persistence and load the bundled Lovelace module."""
    state = hass.data.setdefault(DOMAIN, {})
    register_http_views(hass)

    if not state.get("frontend_registered"):
        frontend_path = Path(__file__).parent / "frontend" / FRONTEND_FILENAME
        await hass.http.async_register_static_paths(
            [StaticPathConfig(FRONTEND_URL, str(frontend_path), True)]
        )
        hass.data.setdefault("frontend_extra_module_url", set()).add(FRONTEND_URL)
        state["frontend_registered"] = True

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload the config entry.

    HTTP routes and static paths remain registered until Home Assistant restarts.
    """
    return True
