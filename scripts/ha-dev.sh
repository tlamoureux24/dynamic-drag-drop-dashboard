#!/usr/bin/env bash
set -euo pipefail

container_name="dynamic-drag-drop-dashboard-ha-dev"
script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
project_dir="$(cd -- "${script_dir}/.." && pwd)"
config_dir="${project_dir}/dev/home-assistant/config"
integration_dir="${project_dir}/custom_components/dynamic_drag_drop_dashboard"
image="ghcr.io/home-assistant/home-assistant:stable"

start_container() {
  if docker container inspect "${container_name}" >/dev/null 2>&1; then
    docker start "${container_name}" >/dev/null
  else
    docker run -d \
      --name "${container_name}" \
      --restart unless-stopped \
      -p 127.0.0.1:8124:8123 \
      -e TZ=Europe/Paris \
      -v "${config_dir}:/config" \
      -v "${integration_dir}:/config/custom_components/dynamic_drag_drop_dashboard:ro" \
      "${image}" >/dev/null
  fi
  printf 'Home Assistant dev: http://localhost:8124\n'
}

case "${1:-start}" in
  start)
    start_container
    ;;
  stop)
    docker stop "${container_name}"
    ;;
  restart)
    docker restart "${container_name}"
    ;;
  logs)
    docker logs --follow --tail 200 "${container_name}"
    ;;
  status)
    docker ps --all --filter "name=^/${container_name}$"
    ;;
  reset)
    printf 'Reset is intentionally manual. Remove %s only after backing up anything needed.\n' "${config_dir}"
    exit 2
    ;;
  *)
    printf 'Usage: %s {start|stop|restart|logs|status|reset}\n' "$0" >&2
    exit 2
    ;;
esac
