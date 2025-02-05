# PowerShell equivalent of config.sh
Write-Host "=============================================="
Write-Host "     Solutech Booking Challenge Setup        " -ForegroundColor Yellow
Write-Host "=============================================="
Write-Host "Running setup for composer, NPM and DB migrations $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
Write-Host ""

# Make setup.sh executable and run it
docker exec -it booking-php-fpm chmod +x /setup/setup.sh
docker exec -it booking-php-fpm chmod +x /docker/*.sh
docker exec -it booking-php-fpm /setup/setup.sh
