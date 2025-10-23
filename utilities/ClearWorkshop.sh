#!/usr/bin/env bash
set -euo pipefail

current_dir="$(pwd)"
target_folder="workshop_parts"
folder_path="$current_dir/$target_folder"

if [[ -d "$folder_path" ]]; then
  # Delete all files under the folder (recursively), keep directories
  find "$folder_path" -type f -exec rm -f -- {} +
  echo "All files inside '$target_folder' have been deleted."
else
  echo "Folder '$target_folder' not found in the current directory."
fi
