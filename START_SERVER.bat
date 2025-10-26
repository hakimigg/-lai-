@echo off
echo ========================================
echo   LAI - AI Assistant Website
echo ========================================
echo.
echo Starting local server...
echo.
echo Open your browser and go to:
echo http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

cd /d "%~dp0"
python -m http.server 8000

pause
