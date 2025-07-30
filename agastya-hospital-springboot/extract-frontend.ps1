# PowerShell script to extract frontend files for Vercel deployment

# Define source and destination directories
$sourceDir = "$PSScriptRoot\src\main\resources\static"
$destDir = "$PSScriptRoot\..\agastya-hospital-frontend"

# Create destination directory if it doesn't exist
if (-not (Test-Path -Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force
    Write-Host "Created destination directory: $destDir"
}

# Copy all files from source to destination
Copy-Item -Path "$sourceDir\*" -Destination $destDir -Recurse -Force

# Create a new vercel.json file with the correct API_URL
$vercelJsonContent = @"
{
  "version": 2,
  "builds": [
    { "src": "**/*", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/$1" },
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
"@

$vercelJsonContent | Out-File -FilePath "$destDir\vercel.json" -Encoding utf8 -Force

# Create a README.md file with deployment instructions
$readmeContent = @"
# Agastya Hospital Frontend

This is the frontend for the Agastya Hospital Appointment System.

## Deployment to Vercel

1. Deploy this directory to Vercel
2. Set the following environment variable in Vercel:
   - `API_URL`: Your Railway backend URL (e.g., https://your-app.railway.app)

## Local Development

To run locally:

1. Use a static file server like `serve` or `http-server`
2. Open `index.html` in your browser

## Features

- Appointment booking
- Admin dashboard
- Responsive design
"@

$readmeContent | Out-File -FilePath "$destDir\README.md" -Encoding utf8 -Force

Write-Host "Frontend files extracted successfully to: $destDir"
Write-Host "You can now deploy this directory to Vercel."