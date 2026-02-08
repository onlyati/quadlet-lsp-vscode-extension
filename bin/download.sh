#!/usr/bin/env bash
set -euo pipefail

# ------------------------------------------------------------------------------
# Configuration
# ------------------------------------------------------------------------------
target_version="0.7.2"
target_architectures=("darwin-amd64" "darwin-arm64" "linux-amd64" "linux-arm64" "windows-amd64" "windows-arm64")
target_url="https://github.com/onlyati/quadlet-lsp/releases/download/v${target_version}"

# ------------------------------------------------------------------------------
# Checking prerequisite tools
# ------------------------------------------------------------------------------
required_tools=("wget" "tar" "unzip")
for tool in "${required_tools[@]}"; do
  if ! command -v "$tool" &> /dev/null; then
    echo "Error: $tool is not installed. Please install it and try again."
    exit 1
  fi
done

# ------------------------------------------------------------------------------
# Downloading and extracting the files fore each architecture
# ------------------------------------------------------------------------------
for arch in "${target_architectures[@]}"; do
  # If the directory does not exist, we create it
  if [ ! -d "./${arch}" ]; then
    mkdir "./${arch}"
  fi

  # We use a sub-shell to change the directory context for each architecture
  (
    cd "./${arch}" || {
      # We handle the case where changing directory fails to prevent issues.
      echo "Failed to change directory to ./${arch}"
      exit 1
    }

    # We wipe any pre-existing artifacts in the folder
    rm -f ./*

    # We handle the different archive formats based on the architecture
    case "${arch}" in
    windows-*)
      file_extension=".zip"
    ;;
    *)
      file_extension=".tar.gz"
    ;;
    esac

    target_file="quadlet-lsp-${target_version}-${arch}${file_extension}"

    # Download the appropriate file
    wget "${target_url}/${target_file}" || exit 1

    # Extract the downloaded file based on the file extension
    case "${file_extension}" in
    ".zip")
      unzip "${target_file}" || exit 1
    ;;
    ".tar.gz")
      tar -xzf "${target_file}" || exit 1
    ;;
    esac

    # We remove the downloaded archive
    rm -f "${target_file}"
  )
done
