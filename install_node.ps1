$zipPath = Join-Path $env:TEMP "node-win-x64.zip"
$destDir = Join-Path $env:LOCALAPPDATA "Programs"
Write-Host "Downloading Node..."
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri "https://nodejs.org/dist/v20.18.0/node-v20.18.0-win-x64.zip" -OutFile $zipPath
Write-Host "Extracting..."
Expand-Archive -Path $zipPath -DestinationPath $destDir -Force
$src = Join-Path $destDir "node-v20.18.0-win-x64"
$target = Join-Path $destDir "nodejs"
if (Test-Path $target) { Remove-Item -Recurse -Force $target }
Rename-Item -Path $src -NewName "nodejs"
Remove-Item $zipPath
$env:Path = "$target;$env:Path"
Write-Host "Node version:"
& (Join-Path $target "node.exe") -v
Set-Location "C:\Users\heerp\OneDrive\Desktop\FamilyVerse"
& (Join-Path $target "npm.cmd") install
