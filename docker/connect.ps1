# PowerShell equivalent of connect.sh
Write-Host "======================================================================"
Write-Host "     Connecting to PHP-FPM Container        " -ForegroundColor Yellow
Write-Host "======================================================================"
Write-Host ""

docker exec -it booking-php-fpm /bin/bash
