import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(_: vscode.ExtensionContext) {
  const serverCommand = "quadlet-lsp"; // Assumes your Go LSP is in PATH

  const serverOptions: ServerOptions = {
    run: { command: serverCommand },
    debug: { command: serverCommand, args: ["-debug"] },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "quadlet" }],
    synchronize: {
      fileEvents: vscode.workspace.createFileSystemWatcher("**/*.container"),
    },
  };

  client = new LanguageClient(
    "quadletLsp",
    "Quadlet Language Server",
    serverOptions,
    clientOptions,
  );

  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  return client?.stop();
}
