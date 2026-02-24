@echo off
setlocal
cd /d "%~dp0"

set "PORT=4173"
set "HOST=127.0.0.1"
set "PY_CMD="

where py >nul 2>nul && set "PY_CMD=py -3"
if not defined PY_CMD where python >nul 2>nul && set "PY_CMD=python"
if not defined PY_CMD where python3 >nul 2>nul && set "PY_CMD=python3"

if not defined PY_CMD (
  echo [ERROR] Python 3 was not found on PATH.
  echo Install Python 3 from https://www.python.org/downloads/windows/
  echo Then run serve.bat again.
  pause
  exit /b 1
)

echo Serving this export at http://%HOST%:%PORT%
echo Press Ctrl+C to stop the server.
echo.
call %PY_CMD% -m http.server %PORT% --bind %HOST%
set "EXIT_CODE=%ERRORLEVEL%"

if not "%EXIT_CODE%"=="0" (
  echo.
  echo Server exited with code %EXIT_CODE%.
  pause
)

exit /b %EXIT_CODE%
