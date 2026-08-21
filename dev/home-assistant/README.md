# Home Assistant development container

This environment is isolated from production and listens only on
`http://localhost:8124`.

```bash
./scripts/ha-dev.sh start
./scripts/ha-dev.sh logs
./scripts/ha-dev.sh restart
./scripts/ha-dev.sh stop
```

On first launch:

1. Complete Home Assistant onboarding at `http://localhost:8124`.
2. Open **Settings → Devices & services → Add integration**.
3. Add **Dynamic Drag & Drop Dashboard**.
4. Hard-refresh the browser, then add a
   `custom:dynamic-drag-drop-dashboard` card.

The integration source is mounted read-only from `custom_components`, so run
`npm run build` and restart the container after frontend changes. Runtime Home
Assistant data remains under `dev/home-assistant/config` and is ignored by Git.
