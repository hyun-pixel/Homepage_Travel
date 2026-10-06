@echo off
setlocal
cd /d "%~dp0"
echo Local preview: http://127.0.0.1:5180
echo Keep this window open. Press Ctrl+C to stop the preview.
call npm.cmd run dev -- --host 127.0.0.1 --port 5180 --strictPort
pause
