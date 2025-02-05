# PowerShell equivalent of build.sh
Write-Host "======================================================================"
Write-Host "     Solutech Booking Challenge Setup        " -ForegroundColor Yellow
Write-Host "======================================================================"
Write-Host ""
Write-Host "Building Docker containers..."

# Change to the parent directory where docker-compose.yml is located
Set-Location ..
docker-compose build --no-cache
