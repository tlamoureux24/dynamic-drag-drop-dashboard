"""Serialized Home Assistant storage for dashboard layouts."""

from __future__ import annotations

import asyncio
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import STORAGE_KEY, STORAGE_VERSION


class DashboardStore:
    """Small key/value store backed by Home Assistant's .storage directory."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._store: Store[dict[str, Any]] = Store(
            hass, STORAGE_VERSION, STORAGE_KEY
        )
        self._lock = asyncio.Lock()
        self._data: dict[str, Any] | None = None

    async def _ensure_loaded(self) -> None:
        if self._data is None:
            self._data = await self._store.async_load() or {}

    async def keys(self) -> list[str]:
        await self._ensure_loaded()
        return list(self._data or {})

    async def get(self, key: str) -> Any | None:
        await self._ensure_loaded()
        return (self._data or {}).get(key)

    async def set(self, key: str, value: dict[str, Any]) -> None:
        async with self._lock:
            await self._ensure_loaded()
            assert self._data is not None
            self._data[key] = value
            await self._store.async_save(self._data)

    async def delete(self, key: str) -> bool:
        async with self._lock:
            await self._ensure_loaded()
            assert self._data is not None
            if key not in self._data:
                return False
            del self._data[key]
            await self._store.async_save(self._data)
            return True
