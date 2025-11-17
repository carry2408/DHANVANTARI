@echo off
echo.
echo ===================================================
echo   Starting HealthVault API Server
echo ===================================================
echo.

cd backend

REM Check if node_modules exists
if not exist "node_modules" (
    echo ERROR: Dependencies not installed!
    echo Please run setup-backend.bat first
    pause
    exit /b 1
)

REM Check if database exists
if not exist "database\healthvault.db" (
    echo WARNING: Database not found!
    echo Initializing database...
    call npm run init-db
    echo.
)

echo Starting server...
echo.
echo  API will be available at: http://localhost:3000
echo  Press Ctrl+C to stop the server
echo.
echo ===================================================
echo.

npm start
