@echo off
echo [(1/3) Starting Voltwise System...]
echo [Reference] Axiom 12: Infrastructure compounds through automation.

:: Start Backend in Background
start "Voltwise Backend (API)" cmd /k "pip install fastapi uvicorn & python -m uvicorn backend.api.main:app --reload --port 8000"

:: Wait for API to warm up
timeout /t 5

:: Start Frontend
echo [(2/3) Launching Visualization Layer...]
cd frontend
start "Voltwise Frontend" cmd /k "npm run dev"

echo [(3/3) System Online.]
echo Access the Dashboard at: http://localhost:5173
echo.
pause
