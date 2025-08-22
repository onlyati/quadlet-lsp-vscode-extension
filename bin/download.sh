#!/bin/bash

target_version="v0.3.1"

cd ./darwin-amd64
wget "https://github.com/onlyati/quadlet-lsp/releases/download/${target_version}/quadlet-lsp-${target_version}-darwin-amd64.tar.gz"
ls -1 | grep '.tar.gz' | xargs tar -xvf
ls -1 | grep '.tar.gz' | xargs rm
cd ..

cd ./linux-amd64
wget "https://github.com/onlyati/quadlet-lsp/releases/download/${target_version}/quadlet-lsp-${target_version}-linux-amd64.tar.gz"
ls -1 | grep '.tar.gz' | xargs tar -xvf
ls -1 | grep '.tar.gz' | xargs rm
cd ..

cd ./linux-arm64
wget "https://github.com/onlyati/quadlet-lsp/releases/download/${target_version}/quadlet-lsp-${target_version}-linux-arm64.tar.gz"
ls -1 | grep '.tar.gz' | xargs tar -xvf
ls -1 | grep '.tar.gz' | xargs rm
cd ..

cd ./windows-amd64
wget "https://github.com/onlyati/quadlet-lsp/releases/download/${target_version}/quadlet-lsp-${target_version}-windows-amd64.zip"
ls -1 | grep '.zip' | xargs unzip -o
ls -1 | grep '.zip' | xargs rm
cd ..

cd ./windows-arm64
wget "https://github.com/onlyati/quadlet-lsp/releases/download/${target_version}/quadlet-lsp-${target_version}-windows-arm64.zip"
ls -1 | grep '.zip' | xargs unzip -o
ls -1 | grep '.zip' | xargs rm
cd ..
