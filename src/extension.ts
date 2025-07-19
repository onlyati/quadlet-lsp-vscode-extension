import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import * as https from "https";
import * as unzipper from "unzipper";
import * as tar from "tar";
import { finished } from "stream/promises";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";

const version = "v0.1.1";
const binName = "quadlet-lsp";
const repoBase = "https://github.com/OnlyAti/quadlet-lsp/releases/download";

function getPlatformKey(): string {
  const platform = os.platform();
  const arch = os.arch();

  if (platform === "win32")
    return arch === "arm64" ? "windows-arm64" : "windows-amd64";
  if (platform === "darwin") return "darwin-amd64";
  if (platform === "linux")
    return arch === "arm64" ? "linux-arm64" : "linux-amd64";
  throw new Error(`Unsupported platform: ${platform}-${arch}`);
}

function downloadFile(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);

    https
      .get(url, (res) => {
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          // Follow redirect
          file.close();
          fs.unlinkSync(destPath);
          return downloadFile(res.headers.location, destPath)
            .then(resolve)
            .catch(reject);
        }

        if (res.statusCode !== 200) {
          return reject(
            new Error(
              `Failed to download ${url}. HTTP status: ${res.statusCode}`,
            ),
          );
        }

        res.pipe(file);
        res.on("error", reject);
        file.on("error", reject);

        finished(file)
          .then(() => {
            file.close((err) => {
              if (err) return reject(err);
              resolve();
            });
          })
          .catch(reject);
      })
      .on("error", reject);
  });
}

async function ensureLspDownloaded(
  context: vscode.ExtensionContext,
): Promise<string> {
  const platformKey = getPlatformKey();
  const binPath = path.join(
    context.globalStorageUri.fsPath,
    binName + (os.platform() === "win32" ? ".exe" : ""),
  );

  if (fs.existsSync(binPath)) {
    vscode.window.showInformationMessage(
      `Quadlet Language Server already installed at ${binPath}`,
    );
    return binPath;
  }

  const url = `${repoBase}/${version}/quadlet-lsp-${version}-${platformKey}${platformKey.startsWith("windows") ? ".zip" : ".tar.gz"}`;
  const tmpPath = path.join(
    context.globalStorageUri.fsPath,
    path.basename(url),
  );
  fs.mkdirSync(context.globalStorageUri.fsPath, { recursive: true });

  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: "Quadlet LSP: Downloading...",
      cancellable: false,
    },
    async () => {
      vscode.window.showInformationMessage(`Fetching LSP binary from: ${url}`);

      try {
        await downloadFile(url, tmpPath);
      } catch (err) {
        vscode.window.showErrorMessage(`Download failed: ${err}`);
        throw err;
      }

      if (!fs.existsSync(tmpPath) || fs.statSync(tmpPath).size < 1000) {
        vscode.window.showErrorMessage("Downloaded file is incomplete.");
        throw new Error("Downloaded file is empty or too small.");
      }

      // Extract
      try {
        if (platformKey.startsWith("windows")) {
          await fs
            .createReadStream(tmpPath)
            .pipe(unzipper.Extract({ path: context.globalStorageUri.fsPath }))
            .promise();
        } else {
          await tar.x({
            file: tmpPath,
            cwd: context.globalStorageUri.fsPath,
          });
        }

        fs.chmodSync(binPath, 0o755);
        vscode.window.showInformationMessage(
          `Quadlet LSP downloaded to: ${binPath}`,
        );
      } catch (err) {
        vscode.window.showErrorMessage(`Failed to extract Quadlet LSP: ${err}`);
        throw err;
      }
    },
  );

  return binPath;
}

let client: LanguageClient;

export async function activate(context: vscode.ExtensionContext) {
  const serverPath = await ensureLspDownloaded(context);

  const serverOptions: ServerOptions = {
    run: { command: serverPath },
    debug: { command: serverPath, args: ["-debug"] },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "quadlet" }],
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
