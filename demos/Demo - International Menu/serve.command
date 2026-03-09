#!/bin/bash
cd "$(dirname "$0")" || exit 1

PORT=4173
HOST=127.0.0.1

if command -v python3 >/dev/null 2>&1; then
  PY_CMD=(python3)
elif command -v python >/dev/null 2>&1; then
  PY_CMD=(python)
else
  echo "Python 3 was not found on PATH."
  echo "Install Python 3 and run ./serve.command again."
  echo
  read -r -n 1 -s -p "Press any key to close..."
  echo
  exit 1
fi

echo "Serving this export at http://${HOST}:${PORT}"
echo "Press Ctrl+C to stop the server."
echo
"${PY_CMD[@]}" -m http.server "${PORT}" --bind "${HOST}"
exit_code=$?

if [ "${exit_code}" -ne 0 ]; then
  echo
  echo "Server exited with code ${exit_code}."
  read -r -n 1 -s -p "Press any key to close..."
  echo
fi

exit "${exit_code}"
