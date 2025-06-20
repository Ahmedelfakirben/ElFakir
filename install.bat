@echo off
echo ====================================
echo   INSTALACION AUTOMATICA
echo ====================================
echo.
echo Instalando dependencias del proyecto...
echo Esto puede tomar unos minutos...
echo.

npm install

if %errorlevel% equ 0 (
    echo.
    echo ✅ ¡Instalacion completada exitosamente!
    echo.
    echo Para ejecutar el proyecto:
    echo 1. Ejecuta "start.bat" 
    echo 2. O ejecuta "npm start" en la terminal
    echo.
    echo El proyecto se abrira en: http://localhost:3000
    echo.
) else (
    echo.
    echo ❌ Error durante la instalacion
    echo Asegurate de tener Node.js instalado: https://nodejs.org/
    echo.
)

pause
