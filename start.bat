@echo off
echo ========================================
echo   K3 Safety AI Analyzer - Launcher
echo ========================================
echo.
echo Starting Backend Server (Python)...
start "K3 Backend" cmd /k "python main.py"
timeout /t 3 /nobreak >nul
echo.
echo Starting Frontend Server (React)...
start "K3 Frontend" cmd /k "cd frontend && npm run dev"
echo.
echo ========================================
echo   Servers are starting...
echo   Backend:  http://localhost:8001
echo   Frontend: http://localhost:3000
echo ========================================
echo.
echo Press any key to exit this window...
pause >nul
