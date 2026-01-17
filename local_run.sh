#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -f "$ROOT_DIR/.env" ]; then
  set -a
  # shellcheck disable=SC1090
  source "$ROOT_DIR/.env"
  set +a
fi

if [ ! -d "$ROOT_DIR/backend/.venv" ]; then
  python3 -m venv "$ROOT_DIR/backend/.venv"
fi

(
  cd "$ROOT_DIR/backend"
  source .venv/bin/activate
  pip install -r requirements.txt
)

if [ ! -d "$ROOT_DIR/frontend/node_modules" ]; then
  (cd "$ROOT_DIR/frontend" && npm install)
fi

cleanup() {
  echo ""
  echo "Stopping servers..."
  if [ -n "${BACKEND_PID:-}" ]; then
    kill "$BACKEND_PID" 2>/dev/null || true
  fi
  if [ -n "${FRONTEND_PID:-}" ]; then
    kill "$FRONTEND_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM

(
  cd "$ROOT_DIR/backend"
  source .venv/bin/activate
  uvicorn app.main:app --reload --port 8000
) &
BACKEND_PID=$!

(
  cd "$ROOT_DIR/frontend"
  npm run dev
) &
FRONTEND_PID=$!

echo "Backend running on http://localhost:8000"
echo "Frontend running on http://localhost:3000"

wait "$BACKEND_PID" "$FRONTEND_PID"
