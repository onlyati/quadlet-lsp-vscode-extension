# Podman Quadlet Language Server

This is an implementation of language server for
[Podman Quadlet](https://docs.podman.io/en/latest/markdown/podman-systemd.unit.5.html#description)
files.

## Features

Following features are currently available:

- Code completion
  - Provide static completion based on Podman Quadlet documentation
  - Query images, volumes, networks, pods, and so on, and provide completion
    based on real configuration
- Hover menu
- Implemented "go definition" and "go references" functions

## Requirements

Download the latest version of Quadlet LSP, then place into you PATH.
<https://github.com/onlyati/quadlet-lsp?tab=readme-ov-file#download-the-latest-version>

## Extension Settings

## Known Issues

## Release Notes

### 0.1.0

Initial version
