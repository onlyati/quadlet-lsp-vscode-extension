# Podman Quadlet Language Server

This is an implementation of language server for
[Podman Quadlet](https://docs.podman.io/en/latest/markdown/podman-systemd.unit.5.html#description)
files.

Language server binaries are bundled together with the extension, but you can
find it in this repository:
[repository](https://github.com/onlyati/quadlet-lsp).

## Features

Following features are currently available:

- Code completion
  - Provide static completion based on Podman Quadlet documentation
  - Query images, volumes, networks, pods, and so on, and provide completion
    based on real configuration
- Hover menu
- Implemented "go definition" and "go references" functions
- Provide syntax checking

For more details and demo, please check the
[onlyati/quadlet-lsp](https://github.com/onlyati/quadlet-lsp) repository.

## Requirements

## Extension Settings

## Known Issues

For some reason, VS Code does not refresh the diagnostics after
`.quadletrc.json` file change. After this file change, restart VS Code top apply
changes.

## Release Notes

### 0.0.3

Apply and bundle 0.2.0 Quadlet LSP, with its goodies.

### 0.0.2

Initial version
