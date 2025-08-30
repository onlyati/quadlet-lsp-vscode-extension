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

For more details, documentation and demo, please check the
[onlyati/quadlet-lsp](https://github.com/onlyati/quadlet-lsp) repository.

> [!NOTE]
>
> Open your issues/questions in the `onlyati/quadlet-lsp` repository.

## Requirements

## Extension Settings

## Known Issues

For some reason, VS Code does not refresh the diagnostics after
`.quadletrc.json` file change. After this file change, restart VS Code top apply
changes.

## Release Notes

### 0.0.7

Add feature for toggle comment.

Apply <https://github.com/onlyati/quadlet-lsp/releases/tag/v0.4.0>

#### Features

- 3rd party extension for Zed editor (#61)
- Hover explanation for systemd specifiers (#57)
- Hover explanation for `UserNS` (#78)
- Hover explanation for `Volume` (#84)
- Hover explanation for `Secret` (#85)
- `QSR022`: validate path with systemd specifier (#57)
- `QSR023`: validate systemd specifiers (#57)
- `QSR024`: warn for forbidden properties in `[Service]` (#77)
- Completion for systemd specifiers (#72)
- The `go definition` and `go references` works with template files (#75)
- Rule disabling on file basis (#81)

#### Bugfixes

- `QSR003` pointed the error to the previous line (#64)
- `QSR021` accept all accept all systemd unit types (#65)
- `QSR008`, `QSR009`: fix naming convention checking (#66)
- The `;` also count as valid comment character besides `#` (#76)

### 0.0.6

Apply <https://github.com/onlyati/quadlet-lsp/releases/tag/v0.3.1>

#### Bugfixes

- The '@' character caused false positive checks in QSR021
  <https://github.com/onlyati/quadlet-lsp/pull/53>
- DefaultInstance was missing in Install section
  <https://github.com/onlyati/quadlet-lsp/pull/53>
- The value of Exec property can be split to multiple line and multi line was
  handled individually <https://github.com/onlyati/quadlet-lsp/pull/52>
- Fix fully qualified syntax checking
  <https://github.com/onlyati/quadlet-lsp/pull/51>

#### Features

### 0.0.5

Apply <https://github.com/onlyati/quadlet-lsp/releases/tag/v0.3.0>
modifications.

#### Features

- New syntax validation: checking container, volume, pod and network name
  <https://github.com/onlyati/quadlet-lsp/pull/33>
- Set properties of Podman 5.6.0
  <https://github.com/onlyati/quadlet-lsp/pull/34>
- Build files has static completion and new template
  <https://github.com/onlyati/quadlet-lsp/pull/35>
- Add completion for `Unit` and `Service` sections and validate automatic
  dependency translation <https://github.com/onlyati/quadlet-lsp/pull/36>
- Modify syntax rule, from Podman 5.6.0, environment variable can be specified
  without value <https://github.com/onlyati/quadlet-lsp/pull/39>
- Language server listing the exposed ports based on the image. But if image is
  not pulled, it cannot read. From now it gives an information message if
  exposed port is not found and could not check all images
  <https://github.com/onlyati/quadlet-lsp/pull/40>
- Add new language server commands: list jobs and pull all image
  <https://github.com/onlyati/quadlet-lsp/pull/41>

#### Bugfixes

- Label, Annotation and Environment variables only accepted one style
  specification. Syntax check has been updated to accept all possible variation
  <https://github.com/onlyati/quadlet-lsp/pull/32>
- Invalid property was checking the commented lines too
  <https://github.com/onlyati/quadlet-lsp/pull/32>

### 0.0.4

Fix a bug: language server failed if there was not `.quadletrc.json` file in the
current working directory.

### 0.0.3

Apply and bundle 0.2.0 Quadlet LSP, with its goodies.

### 0.0.2

Initial version
