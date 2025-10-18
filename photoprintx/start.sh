#!/bin/bash

# PhotoPrintX Start Script

echo "Starting PhotoPrintX Application..."

# Function to clean up background processes on exit
cleanup() {
    echo "Stopping all processes..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Trap SIGINT and SIGTERM to clean up
trap cleanup SIGINT SIGTERM

# Start backend server
echo "Starting backend server..."
cd backend
node server.js &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "Starting frontend server..."
cd frontend
npx ng serve --port 4200 --host 0.0.0.0 &
FRONTEND_PID=$!
cd ..

echo "Servers started!"
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:4200"
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
