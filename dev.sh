#!/bin/sh
set -eu
cd "$(dirname "$0")"
port="${1:-4173}"
printf 'Local preview: http://127.0.0.1:%s/\n' "$port"
exec python3 -m http.server "$port" --bind 127.0.0.1
