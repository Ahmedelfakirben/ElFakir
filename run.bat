@echo off
echo ====================================
echo   AHMED EL FAKIR - MATRIX PORTFOLIO
echo ====================================
echo.

:menu
echo Selecciona una opcion:
echo 1. Instalar dependencias (npm install)
echo 2. Ejecutar en modo desarrollo (npm start)
echo 3. Construir para produccion (npm run build)
echo 4. Abrir en Visual Studio Code
echo 5. Abrir carpeta del proyecto
echo 6. Salir
echo.
set /p choice="Ingresa tu opcion (1-6): "

if "%choice%"=="1" goto install
if "%choice%"=="2" goto start
if "%choice%"=="3" goto build
if "%choice%"=="4" goto vscode
if "%choice%"=="5" goto explorer
if "%choice%"=="6" goto exit

echo Opcion invalida. Intenta de nuevo.
echo.
goto menu

:install
echo.
echo Instalando dependencias...
echo ====================================
npm install
echo.
echo ✅ Dependencias instaladas correctamente!
echo.
pause
goto menu

:start
echo.
echo Iniciando servidor de desarrollo...
echo ====================================
echo El proyecto se abrira en: http://localhost:3000
echo Presiona Ctrl+C para detener el servidor
echo.
npm start
pause
goto menu

:build
echo.
echo Construyendo proyecto para produccion...
echo ====================================
npm run build
echo.
echo ✅ Proyecto construido en la carpeta 'build'
echo.
pause
goto menu

:vscode
echo.
echo Abriendo en Visual Studio Code...
code .
goto menu

:explorer
echo.
echo Abriendo carpeta del proyecto...
explorer .
goto menu

:exit
echo.
echo ¡Gracias por usar el portfolio de Ahmed El Fakir!
echo Contacto: ahmed@elfakir.com
echo.
pause
exit

:error
echo.
echo ❌ Error: Node.js no esta instalado o no esta en PATH
echo Por favor instala Node.js desde: https://nodejs.org/
echo.
pause
goto menu
