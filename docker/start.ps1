# PowerShell equivalent of start.sh
Write-Host "======================================================================"
Write-Host "     Solutech Booking Challenge Setup        " -ForegroundColor Yellow
Write-Host "======================================================================"
Write-Host ""
Write-Host "booking-app :" -NoNewline -ForegroundColor Blue
Write-Host "          http://localhost:8000/      " -ForegroundColor Green
Write-Host "booking-mailhog :" -NoNewline -ForegroundColor Blue
Write-Host "     http://localhost:8001/      " -ForegroundColor Green
Write-Host "booking-phpmyadmin :" -NoNewline -ForegroundColor Blue
Write-Host "    http://localhost:8002/      " -ForegroundColor Green
Write-Host "================================ Login Credentials =================================="
Write-Host "URL:" -NoNewline -ForegroundColor Blue
Write-Host "          http://localhost:8000/login      " -ForegroundColor Green
Write-Host "Username:" -NoNewline -ForegroundColor Blue
Write-Host "     admin@account.com      " -ForegroundColor Green
Write-Host "Password:" -NoNewline -ForegroundColor Blue
Write-Host "     password      " -ForegroundColor Green
Write-Host "======================================================================"
Write-Host "Starting Docker Containers, confirm running service with 'docker ps'" -ForegroundColor Yellow
Write-Host "Tip: Error 'ContainerConfig' occurs on updated configuration, run restart (stop.sh && start.sh) /rebuild (build.sh) container to fix" -ForegroundColor Yellow
Write-Host ""

# Change to the parent directory where docker-compose.yml is located
Set-Location ..
docker-compose up -d
