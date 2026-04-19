const http = require("http");
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const root = __dirname;
const port = 37110;
const configPath = path.join(root, ".phd-writer-sync.json");
const docsDir = path.join(root, "github-export");

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 20_000_000) {
        reject(new Error("Request too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function runGit(args) {
  return new Promise((resolve, reject) => {
    execFile("git", args, { cwd: root }, (error, stdout, stderr) => {
      if (error) {
        error.output = `${stdout}\n${stderr}`.trim();
        reject(error);
        return;
      }
      resolve(`${stdout}\n${stderr}`.trim());
    });
  });
}

async function ensureGit(repoUrl) {
  repoUrl = normalizeRepoUrl(repoUrl);
  if (!fs.existsSync(path.join(root, ".git"))) {
    await runGit(["init"]);
  }

  try {
    await runGit(["config", "user.email"]);
  } catch {
    await runGit(["config", "user.email", "phd-writer@example.local"]);
  }

  try {
    await runGit(["config", "user.name"]);
  } catch {
    await runGit(["config", "user.name", "Vellum Atelier"]);
  }

  if (repoUrl) {
    try {
      await runGit(["remote", "get-url", "origin"]);
      await runGit(["remote", "set-url", "origin", repoUrl]);
    } catch {
      await runGit(["remote", "add", "origin", repoUrl]);
    }
  }
}

function slug(value) {
  return String(value || "untitled")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "untitled";
}

function writeSnapshot(payload) {
  fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(
    path.join(docsDir, "project-state.json"),
    JSON.stringify(payload, null, 2),
  );
  fs.writeFileSync(path.join(docsDir, "project-plan.md"), projectPlanMarkdown(payload));
  fs.writeFileSync(path.join(docsDir, "literature-matrix.md"), literatureMatrixMarkdown(payload));

  const folderNames = new Map(
    (payload.folders || []).map((folder) => [folder.id, folder.name]),
  );

  for (const doc of payload.documents || []) {
    const folderName = folderNames.get(doc.folderId) || "Unsorted";
    const folderPath = path.join(docsDir, slug(folderName));
    fs.mkdirSync(folderPath, { recursive: true });

    const base = slug(doc.title || doc.id);
    const text = `# ${doc.title || "Untitled"}\n\n${doc.plainText || ""}\n`;
    const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${escapeHtml(doc.title || "Untitled")}</title>
  </head>
  <body>
    <h1>${escapeHtml(doc.title || "Untitled")}</h1>
    ${doc.content || ""}
  </body>
</html>
`;

    fs.writeFileSync(path.join(folderPath, `${base}.md`), text);
    fs.writeFileSync(path.join(folderPath, `${base}.html`), html);
  }
}

function readSnapshot() {
  const statePath = path.join(docsDir, "project-state.json");
  if (!fs.existsSync(statePath)) return null;
  return JSON.parse(fs.readFileSync(statePath, "utf8"));
}

function projectPlanMarkdown(payload) {
  const project = payload.project || {};
  return `# Project Plan

Mode: ${project.mode || "thesis"}

## Main Research Question

${project.researchQuestion || ""}

## Sub-questions

${project.subQuestions || ""}

## Methodology

${project.methodology || ""}

## Contribution

${project.contribution || ""}
`;
}

function literatureMatrixMarkdown(payload) {
  const rows = payload.literatureMatrix || [];
  const header = "| Source | Theory | Method | Finding | Relevance |\n|---|---|---|---|---|";
  const body = rows
    .map((row) =>
      [
        row.source,
        row.theory,
        row.method,
        row.finding,
        row.relevance,
      ]
        .map((value) => String(value || "").replace(/\n/g, "<br>").replace(/\|/g, "\\|"))
        .join(" | "),
    )
    .map((line) => `| ${line} |`)
    .join("\n");

  return `# Literature Matrix

${header}
${body}
`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function commitAndPush(reason, repoUrl) {
  await ensureGit(repoUrl);
  await runGit(["add", "github-export", "README.md", "index.html", "styles.css", "app.js", "sync-server.js"]);

  const status = await runGit(["status", "--porcelain"]);
  if (!status.trim()) {
    return "No file changes to push.";
  }

  const stamp = new Date().toISOString().replace("T", " ").slice(0, 19);
  await runGit(["commit", "-m", `Save Vellum Atelier draft (${reason}, ${stamp})`]);

  try {
    const branch = (await runGit(["branch", "--show-current"])).trim() || "main";
    await runGit(["push", "-u", "origin", branch]);
    return `Committed and pushed to GitHub at ${stamp}.`;
  } catch (error) {
    return `Committed locally, but push failed: ${friendlyGitPushError(
      error.output || error.message,
      repoUrl,
    )}`;
  }
}

function friendlyGitPushError(output, repoUrl = "") {
  const text = String(output || "");
  if (text.includes("could not read Username") && repoUrl.startsWith("https://github.com")) {
    const sshUrl = httpsGithubToSsh(repoUrl);
    return [
      "GitHub needs credentials for HTTPS.",
      sshUrl ? `Use this SSH URL instead if your Mac has a GitHub SSH key: ${sshUrl}` : "",
      "Or authenticate HTTPS with GitHub Desktop, Git Credential Manager, or a personal access token.",
    ]
      .filter(Boolean)
      .join(" ");
  }

  if (text.includes("Permission denied") && text.includes("publickey")) {
    return "GitHub rejected the SSH key. Add this Mac's SSH key to GitHub or use an authenticated HTTPS remote.";
  }

  return text;
}

function httpsGithubToSsh(repoUrl) {
  const match = String(repoUrl).match(/^https:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?$/);
  if (!match) return "";
  return `git@github.com:${match[1]}/${match[2]}.git`;
}

function normalizeRepoUrl(repoUrl = "") {
  return httpsGithubToSsh(repoUrl) || repoUrl;
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 200, { ok: true });
    return;
  }

  try {
    if (req.method === "POST" && req.url === "/api/config") {
      const payload = JSON.parse(await readBody(req));
      payload.repoUrl = normalizeRepoUrl(payload.repoUrl);
      fs.writeFileSync(configPath, JSON.stringify(payload, null, 2));
      await ensureGit(payload.repoUrl);
      sendJson(res, 200, {
        ok: true,
        message: "GitHub repository saved. Pushes will run every 110 seconds.",
      });
      return;
    }

    if (req.method === "POST" && req.url === "/api/snapshot") {
      const payload = JSON.parse(await readBody(req));
      const config = fs.existsSync(configPath)
        ? JSON.parse(fs.readFileSync(configPath, "utf8"))
        : {};
      const repoUrl = normalizeRepoUrl(payload.repoUrl || config.repoUrl);

      writeSnapshot(payload);
      const message = await commitAndPush(payload.reason || "auto", repoUrl);
      sendJson(res, 200, { ok: true, message });
      return;
    }

    if (req.method === "POST" && req.url === "/api/pull") {
      const payload = JSON.parse(await readBody(req));
      const config = fs.existsSync(configPath)
        ? JSON.parse(fs.readFileSync(configPath, "utf8"))
        : {};
      const repoUrl = normalizeRepoUrl(payload.repoUrl || config.repoUrl);

      await ensureGit(repoUrl);
      try {
        const branch = (await runGit(["branch", "--show-current"])).trim() || "main";
        await runGit(["pull", "--ff-only", "origin", branch]);
      } catch (error) {
        sendJson(res, 200, {
          ok: false,
          message: `Pull failed: ${friendlyGitPushError(error.output || error.message, repoUrl)}`,
        });
        return;
      }

      sendJson(res, 200, {
        ok: true,
        message: "Pulled latest GitHub snapshot.",
        snapshot: readSnapshot(),
      });
      return;
    }

    sendJson(res, 404, { ok: false, message: "Not found" });
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      message: error.output || error.message || "Sync failed",
    });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Vellum Atelier GitHub sync helper running at http://127.0.0.1:${port}`);
});
