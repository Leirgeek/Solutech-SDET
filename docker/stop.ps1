# PowerShell equivalent of stop.sh
Write-Host "======================================================================"
Write-Host "     Stopping Docker Containers        " -ForegroundColor Yellow
Write-Host "======================================================================"
Write-Host ""

# Change to the parent directory where docker-compose.yml is located
Set-Location ..
docker-compose down
