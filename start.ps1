# ===================================
# React Shop - Start All Servers
# ===================================

Write-Host "🚀 מתחיל את כל השרתים..." -ForegroundColor Cyan

# עצור תהליכים ישנים על הפורטים
Write-Host "🔄 עוצר תהליכים ישנים..." -ForegroundColor Yellow
$ports = @(5173, 5174, 3000)
foreach ($port in $ports) {
    $processPids = netstat -ano | Select-String ":$port " | ForEach-Object {
        ($_ -split '\s+')[-1]
    } | Where-Object { $_ -match '^\d+$' } | Select-Object -Unique
    foreach ($procId in $processPids) {
        if ($procId -ne "0") {
            try { Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue } catch {}
        }
    }
}

Start-Sleep -Seconds 1

# הגדר נתיב
$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# התחל את שרת ה-Backend (Node.js)
Write-Host "✅ מתחיל Backend Server (port 3000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectPath\server'; Write-Host 'BACKEND SERVER RUNNING' -ForegroundColor Green; npm start" -WindowStyle Normal

Start-Sleep -Seconds 2

# התחל את שרת ה-Frontend (React/Vite)
Write-Host "✅ מתחיל Frontend Server (port 5173)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectPath'; Write-Host 'FRONTEND SERVER RUNNING' -ForegroundColor Cyan; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 3

Write-Host ""
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  ✅ כל השרתים פועלים!" -ForegroundColor Green
Write-Host "  🌐 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "  🔧 Backend:  http://localhost:3000" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""

# פתח את הדפדפן
Start-Sleep -Seconds 2
Start-Process "http://localhost:5173"
