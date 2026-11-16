@echo off
title Video Tutorial MasterTech
echo ===================================================
echo REPRODUCTOR DE VIDEO TUTORIAL ANIMADO MASTERTECH
echo Locucion Profesional Venezolana (ElevenLabs)
echo ===================================================
echo.
echo 1. Iniciando servidor web si no esta encendido...
start /B "" "%APPDATA%\Antigravity\bin\agy-node.cmd" "node_modules\vite\bin\vite.js" --port 3000 --host 0.0.0.0
timeout /t 2 /nobreak >nul
echo 2. Abriendo video tutorial en el navegador...
start http://localhost:3000/video-tutorial.html
echo.
echo Para reproducir el video, dale clic en la pantalla o al boton Reproducir.
echo Puedes alternar entre formato 16:9 y 9:16 (Reels/TikTok) y descargar el video.
echo.
pause
