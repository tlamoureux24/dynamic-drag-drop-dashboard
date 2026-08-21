"""Authenticated HTTP API for dashboard persistence."""

from __future__ import annotations

from typing import Any

from aiohttp import web
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant

from .const import API_PATH, DOMAIN, LEGACY_API_PATH, MAX_REQUEST_BYTES
from .storage import DashboardStore


def _store(request: web.Request) -> DashboardStore:
    return request.app["hass"].data[DOMAIN]["store"]


class DashboardKeysView(HomeAssistantView):
    """List stored dashboard keys."""

    requires_auth = True

    def __init__(self, url: str, suffix: str) -> None:
        self.url = url
        self.name = f"api:{DOMAIN}:keys:{suffix}"

    async def get(self, request: web.Request) -> web.Response:
        return self.json(await _store(request).keys())


class DashboardItemView(HomeAssistantView):
    """Read, replace, or delete one dashboard."""

    requires_auth = True

    def __init__(self, url: str, suffix: str) -> None:
        self.url = f"{url}/{{key}}"
        self.name = f"api:{DOMAIN}:item:{suffix}"

    async def get(self, request: web.Request, key: str) -> web.Response:
        value = await _store(request).get(key)
        return self.json(value or {})

    async def post(self, request: web.Request, key: str) -> web.Response:
        if request.content_length and request.content_length > MAX_REQUEST_BYTES:
            raise web.HTTPRequestEntityTooLarge(
                max_size=MAX_REQUEST_BYTES, actual_size=request.content_length
            )
        try:
            payload: Any = await request.json()
        except Exception as err:
            raise web.HTTPBadRequest(text="Invalid JSON") from err
        if not isinstance(payload, dict):
            raise web.HTTPBadRequest(text="Expected a JSON object")
        await _store(request).set(key, payload)
        return self.json({"ok": True})

    async def delete(self, request: web.Request, key: str) -> web.Response:
        if not await _store(request).delete(key):
            raise web.HTTPNotFound(text="Dashboard not found")
        return self.json({"ok": True})


class PackageStatusView(HomeAssistantView):
    """Report the intentionally disabled upstream package writer."""

    requires_auth = True

    def __init__(self, url: str, suffix: str) -> None:
        self.url = f"{url}_package_status"
        self.name = f"api:{DOMAIN}:package-status:{suffix}"

    async def get(self, request: web.Request) -> web.Response:
        return self.json(
            {
                "ok": True,
                "supported": False,
                "supports_package_sync": False,
                "reason": "Package YAML writes are disabled in this release.",
            }
        )


def register_http_views(hass: HomeAssistant) -> None:
    """Register the canonical and backward-compatible endpoints once."""
    state = hass.data.setdefault(DOMAIN, {})
    if state.get("http_registered"):
        return

    state["store"] = DashboardStore(hass)
    for path, suffix in ((LEGACY_API_PATH, "legacy"), (API_PATH, "canonical")):
        hass.http.register_view(DashboardKeysView(path, suffix))
        hass.http.register_view(DashboardItemView(path, suffix))
        hass.http.register_view(PackageStatusView(path, suffix))
    state["http_registered"] = True
