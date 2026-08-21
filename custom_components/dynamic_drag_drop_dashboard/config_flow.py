"""Config flow for Dynamic Drag & Drop Dashboard."""

from __future__ import annotations

from typing import Any

from homeassistant import config_entries

from .const import DOMAIN


class DynamicDragDropDashboardConfigFlow(
    config_entries.ConfigFlow, domain=DOMAIN
):
    """Create the integration's single config entry."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.ConfigFlowResult:
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        return self.async_create_entry(
            title="Dynamic Drag & Drop Dashboard", data={}
        )
