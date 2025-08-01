import * as vscode from "vscode";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";

let client: LanguageClient;

function getPlatform(): string {
  const platform = os.platform();
  const arch = os.arch();

  if (platform === "win32") {
    return arch === "arm64" ? "windows-arm64" : "windows-amd64";
  } else if (platform === "darwin") {
    return arch === "arm64" ? "darwin-arm64" : "darwin-amd64";
  } else {
    return arch === "arm64" ? "linux-arm64" : "linux-amd64";
  }
}

function getServerPath(context: vscode.ExtensionContext): string {
  const platform = getPlatform();
  const ext = process.platform === "win32" ? ".exe" : "";
  const binaryName = `quadlet-lsp${ext}`;
  return context.asAbsolutePath(path.join("bin", platform, binaryName));
}

export async function activate(context: vscode.ExtensionContext) {
  try {
    const serverPath = getServerPath(context);

    // Verify the binary exists
    try {
      await fs.promises.access(serverPath, fs.constants.X_OK);
    } catch (err) {
      vscode.window.showErrorMessage(
        `Quadlet LSP binary not found at ${serverPath}. Please reinstall the extension.`,
      );
      return;
    }

    // Set executable permissions for non-Windows platforms
    if (process.platform !== "win32") {
      try {
        await fs.promises.chmod(serverPath, 0o755);
      } catch (err) {
        console.warn(`Failed to set executable permissions: ${err}`);
      }
    }

    const serverOptions: ServerOptions = {
      command: serverPath,
      args: [],
    };

    const clientOptions: LanguageClientOptions = {
      documentSelector: [{ scheme: "file", language: "quadlet" }],
      outputChannel: vscode.window.createOutputChannel(
        "Quadlet Language Server",
      ),
    };

    client = new LanguageClient(
      "quadletLSP",
      "Quadlet Language Server",
      serverOptions,
      clientOptions,
    );

    await client.start();
  } catch (err) {
    vscode.window.showErrorMessage(
      `Failed to activate Quadlet LSP: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
