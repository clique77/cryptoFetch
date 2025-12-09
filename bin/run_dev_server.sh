#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT/server"
npm run dev &
SERVER_PID=$!

cd "$PROJECT_ROOT/client"
npm run dev &
CLIENT_PID=$!

echo "Server PID: $SERVER_PID"
echo "Client PID: $CLIENT_PID"
echo "Press Ctrl+C to stop both servers"

trap "kill $SERVER_PID $CLIENT_PID 2>/dev/null; exit" INT TERM

wait
