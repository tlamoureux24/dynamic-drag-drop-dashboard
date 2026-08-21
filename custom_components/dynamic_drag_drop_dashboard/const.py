"""Constants for Dynamic Drag & Drop Dashboard."""

DOMAIN = "dynamic_drag_drop_dashboard"

STORAGE_VERSION = 1
# Compatibility with installations of the original backend.
STORAGE_KEY = "dragdrop_storage"

LEGACY_API_PATH = "/api/dragdrop_storage"
API_PATH = f"/api/{DOMAIN}"

FRONTEND_URL = "/dynamic_drag_drop_dashboard/dynamic-drag-drop-dashboard.js"
FRONTEND_FILENAME = "dynamic-drag-drop-dashboard.js"

MAX_REQUEST_BYTES = 5 * 1024 * 1024
