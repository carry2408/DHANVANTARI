@echo off
echo.
echo ===================================================
echo   HealthVault ID - Backend Setup Script
echo ===================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [1/5] Creating folder structure...
if not exist "backend" mkdir backend
cd backend
if not exist "routes" mkdir routes
if not exist "database" mkdir database  
if not exist "uploads" mkdir uploads
echo  Done!
echo.

echo [2/5] Checking for backend files...
if not exist "package.json" (
    echo ERROR: Backend files are missing!
    echo Please create the backend files first.
    echo See BACKEND-FILES.md for instructions.
    pause
    exit /b 1
)
echo  Files found!
echo.

echo [3/5] Installing Node.js dependencies...
echo This may take a few minutes...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)
echo  Done!
echo.

echo [4/5] Initializing database with sample data...
call npm run init-db
if %errorlevel% neq 0 (
    echo ERROR: Failed to initialize database!
    pause
    exit /b 1
)
echo  Done!
echo.

echo [5/5] Setup complete!
echo.
echo ===================================================
echo   Backend Setup Successful!
echo ===================================================
echo.
echo  Server is ready to start!
echo.
echo  To start the server:
echo    cd backend
echo    npm start
echo.
echo  Or for development mode with auto-reload:
echo    npm run dev
echo.
echo  Demo Credentials:
echo    Patient:  HV123456789 / patient123
echo    Doctor:   HV123456789 / doctor123
echo    Hospital: HOSP12345 / hospital123
echo.
echo ===================================================
echo.
pause
