# Get the current working directory
$CurrentDir = Get-Location

# Target folder name
$TargetFolder = "workshop_parts"

# Find the "workshop_parts" folder under the current directory
$FolderPath = Join-Path $CurrentDir $TargetFolder

# Check if the folder exists
if (Test-Path $FolderPath) {
    # Get all files inside the folder and delete them
    Get-ChildItem -Path $FolderPath -File -Recurse | Remove-Item -Force
    Write-Host "All files inside '$TargetFolder' have been deleted."
} else {
    Write-Host "Folder '$TargetFolder' not found in the current directory."
}
