# PowerShell script to help with Render deployment

# Check if Render CLI is installed
$renderInstalled = $null
try {
    $renderInstalled = Get-Command render -ErrorAction SilentlyContinue
} catch {
    # Command not found
}

if (-not $renderInstalled) {
    Write-Host "Render CLI is not installed. Please note that Render primarily uses its web interface for deployments." -ForegroundColor Yellow
    Write-Host "You can deploy directly from the Render Dashboard: https://dashboard.render.com" -ForegroundColor Cyan
}

# Check if .env file exists, if not create it from .env.example
if (-not (Test-Path -Path ".env")) {
    if (Test-Path -Path ".env.example") {
        Copy-Item -Path ".env.example" -Destination ".env"
        Write-Host "Created .env file from .env.example. Please edit it with your actual values." -ForegroundColor Yellow
        Write-Host "Press any key to continue after editing..." -ForegroundColor Yellow
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    } else {
        Write-Host "No .env.example file found. Please create a .env file manually." -ForegroundColor Red
        exit
    }
}

# Build the application
Write-Host "Building the application..." -ForegroundColor Cyan
mvn clean package -DskipTests

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Please fix the errors and try again." -ForegroundColor Red
    exit
}

Write-Host "\nBuild successful!" -ForegroundColor Green

# Instructions for manual deployment
Write-Host "\nTo deploy to Render:" -ForegroundColor Cyan
Write-Host "1. Go to https://dashboard.render.com/" -ForegroundColor White
Write-Host "2. Click 'New +' and select 'Blueprint'" -ForegroundColor White
Write-Host "3. Connect your GitHub repository" -ForegroundColor White
Write-Host "4. Render will automatically detect the render.yaml file and configure your services" -ForegroundColor White
Write-Host "5. Set your environment variables in the Render Dashboard" -ForegroundColor White
Write-Host "   - ADMIN_USERNAME" -ForegroundColor White
Write-Host "   - ADMIN_PASSWORD" -ForegroundColor White
Write-Host "   - HOSPITAL_ADMIN_USERNAME" -ForegroundColor White
Write-Host "   - HOSPITAL_ADMIN_PASSWORD" -ForegroundColor White
Write-Host "6. Click 'Apply' to start the deployment" -ForegroundColor White

Write-Host "\nAlternatively, you can deploy individual services:" -ForegroundColor Cyan
Write-Host "1. For the backend: Select 'Web Service' and choose 'Docker'" -ForegroundColor White
Write-Host "2. For the frontend: Select 'Static Site'" -ForegroundColor White

Write-Host "\nDeployment preparation complete!" -ForegroundColor Green
Write-Host "Note: Render deployment is primarily managed through their web interface." -ForegroundColor Yellow