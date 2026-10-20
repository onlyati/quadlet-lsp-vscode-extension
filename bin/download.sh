#!/usr/bin/env bash
set -euo pipefail

# ------------------------------------------------------------------------------
# Configuration
# ------------------------------------------------------------------------------
target_version="0.8.0"
target_architectures=("darwin-amd64" "darwin-arm64" "linux-amd64" "linux-arm64" "windows-amd64" "windows-arm64")
target_url="https://github.com/onlyati/quadlet-lsp/releases/download/v${target_version}"

# SHA256 of the release archives for target_version. Update together with it,
# the values are listed in quadlet-lsp_<version>_checksums.txt of the release.
declare -A target_checksums=(
  ["darwin-amd64"]="0ab49764d1e9c1e2f745f9e11ed74bd03d4a1f1ee8ea3ec2fb28eb0d1efa35ff"
  ["darwin-arm64"]="926a169a3b30f4b8d54102c121b60a40b7c9a4970cffd827998b38816561a80d"
  ["linux-amd64"]="04390988f41a0dde6b0eaeadc6be5e6e61ef5061fa33a0c2754bd76547fb53de"
  ["linux-arm64"]="0319cbd834233e3192c0550ec2911585d60c3640bf292f48ba89d816205fffad"
  ["windows-amd64"]="6cac29daf64e5a9901e541e4725df292dd992a9cd3b3b3f49c3162c56992e744"
  ["windows-arm64"]="2b12950755f0c7e8163a7dc79df4296f99dc46f1e84a896a0485ba889db91e86"
)

# ------------------------------------------------------------------------------
# Checking prerequisite tools
# ------------------------------------------------------------------------------
required_tools=("wget" "tar" "unzip" "sha256sum")
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
  if [ ! -d "./bin/${arch}" ]; then
    mkdir "./bin/${arch}"
  fi

  # We use a sub-shell to change the directory context for each architecture
  (
    cd "./bin/${arch}" || {
      # We handle the case where changing directory fails to prevent issues.
      echo "Failed to change directory to ./bin/${arch}"
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

    # Verify the archive before anything is extracted
    echo "${target_checksums[${arch}]}  ${target_file}" | sha256sum -c - || exit 1

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
