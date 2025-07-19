# Podman Quadlet Language Server

This is an implementation of language server for
[Podman Quadlet](https://docs.podman.io/en/latest/markdown/podman-systemd.unit.5.html#description)
files.

During the first activation, the LSP is downloaded from the
[repository](https://github.com/onlyati/quadlet-lsp).

## Features

Following features are currently available:

- Code completion
  - Provide static completion based on Podman Quadlet documentation
  - Query images, volumes, networks, pods, and so on, and provide completion
    based on real configuration
- Hover menu
- Implemented "go definition" and "go references" functions

For more details and demo, please check the
[onlyati/quadlet-lsp](https://github.com/onlyati/quadlet-lsp) repository.

## Requirements

## Extension Settings

## Known Issues

## Release Notes

### 0.1.0

Initial version
