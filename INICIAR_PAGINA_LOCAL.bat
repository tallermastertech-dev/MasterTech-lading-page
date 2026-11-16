@echo off
title Servidor Local MasterTech
echo ===================================================
echo INICIANDO SERVIDOR COMPLETO MASTERTECH
echo Backend API (Puerto 3001) + Frontend Vite (Puerto 3000)
echo ===================================================
cd /d "C:\Users\maste\OneDrive\Desktop\PAGINA WEBS\lading mastertech"

REM 1. Iniciar servidor API en segundo plano
start /B "" "%APPDATA%\Antigravity\bin\agy-node.cmd" "node_modules\tsx\dist\cli.mjs" server.ts

REM 2. Pausa breve para enlace de sockets y abrir navegador
timeout /t 2 /nobreak >nul
start http://localhost:3000

REM 3. Iniciar Vite Frontend
call "%APPDATA%\Antigravity\bin\agy-node.cmd" "node_modules\vite\bin\vite.js" --port 3000 --host 0.0.0.0
pause
