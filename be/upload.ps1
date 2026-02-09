$ErrorActionPreference = "Stop"
$baseUrl = "http://127.0.0.1:8000/films/"
$scriptDir = $PSScriptRoot
$imagesPath = Join-Path $scriptDir "images"
$jsonPath = Join-Path $scriptDir "films.json"

$jsonText = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
$films = $jsonText | ConvertFrom-Json

foreach ($f in $films) {
    $name = $f.name
    Write-Host "Adding film: $name"
    $imgPath = Join-Path $imagesPath $f.image
    if (-not (Test-Path $imgPath)) {
        Write-Host "  Error: file not found $imgPath"
        Write-Host "---"
        continue
    }
    $bytes = [System.IO.File]::ReadAllBytes($imgPath)
    $b64 = [Convert]::ToBase64String($bytes)
    $body = @{
        name        = $f.name
        description = $f.description
        image       = "data:image/png;base64,$b64"
        film_type   = $f.film_type
        duration    = [int]$f.duration
    } | ConvertTo-Json
    try {
        $r = Invoke-RestMethod -Uri $baseUrl -Method Post -Body $body -ContentType "application/json; charset=utf-8"
        Write-Host "  OK (id=$($r.id))"
    } catch {
        Write-Host "  Error: $_"
    }
    Write-Host "---"
}
Write-Host "Done. Check http://localhost:8000/films/"
