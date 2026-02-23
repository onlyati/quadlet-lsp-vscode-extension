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
- Provide syntax checking Provide built-in commands

For more information see the repository or check the documentation website:
<https://quadlet-lsp.thinkaboutit.tech>

> [!NOTE]
>
> Open your issues/questions in the `onlyati/quadlet-lsp` repository.

## Requirements

## Extension Settings

## Known Issues

For some reason, VS Code does not refresh the diagnostics after
`.quadletrc.json` file change. After this file change, restart VS Code top apply
changes.

The line continuation is not handled from the highlight view. Each line count as
different definitions, although the language server handle it. Reason of this
issue that I haven't found a way how I could implement it in VS Code, like I did
in Neovim.

## Release Notes

See in the main repository:
<https://github.com/onlyati/quadlet-lsp/blob/main/CHANGELOG.md>
