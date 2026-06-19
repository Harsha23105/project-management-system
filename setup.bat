@echo off
REM Windows Quick Start Script
REM Run from project root: setup.bat

echo.
echo ========================================
echo   ProjectFlow - Quick Start Setup
echo ========================================
echo.

REM Check if .env exists
if exist ".env" (
    echo [OK] .env file found
) else (
    if exist ".env.local" (
        copy .env.local .env
        echo [CREATED] .env from .env.local
    )
)

REM Check Docker
docker --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Docker is installed
    echo.
    echo To start the project with Docker:
    echo   docker-compose up
) else (
    echo [WARNING] Docker not found
    echo.
    echo To start manually:
    echo   cd backend
    echo   npm install
    echo   npm run dev
    echo.
    echo   (in another terminal)
    echo   cd frontend
    echo   npm install
    echo   npm run dev
)

echo.
echo For deployment guide, see: DEPLOYMENT_GUIDE.md
echo.
