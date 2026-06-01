const http = require("http");
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const root = path.resolve(__dirname, "..");
const port = 37110;
const configPath = path.join(root, ".vellum-atelier-sync.json");
const legacyConfigPath = path.join(root, ".phd-writer-sync.json");
const docsDir = path.join(root, "github-export");
const allowedOrigins = new Set(["http://127.0.0.1:4180", "http://localhost:4180"]);

function corsHeaders(origin = "") {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };

  if (origin && allowedOrigins.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

function rejectOrigin(req, res) {
  const origin = req.headers.origin || "";
  if (!origin || allowedOrigins.has(origin)) return false;
  sendJson(req, res, 403, {
    ok: false,
    message: "This sync helper only accepts requests from the local Vellum Atelier app.",
  });
  return true;
}

function sendJson(req, res, status, payload) {
  res.writeHead(status, {
    ...corsHeaders(req.headers.origin || ""),
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

async function ensureBranch(branch = "main") {
  if (!branch) return;
  const current = (await runGit(["branch", "--show-current"])).trim();
  if (current === branch) return;

  try {
    await runGit(["rev-parse", "--verify", branch]);
    await runGit(["checkout", branch]);
  } catch {
    await runGit(["checkout", "-b", branch]);
  }
}

async function ensureGit(repoUrl, branch = "main") {
  repoUrl = normalizeRepoUrl(repoUrl);
  if (!fs.existsSync(path.join(root, ".git"))) {
    await runGit(["init"]);
  }

  try {
    await runGit(["config", "user.email"]);
  } catch {
    await runGit(["config", "user.email", "sync@vellum-atelier.local"]);
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

  await ensureBranch(branch);
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

Project type: ${project.mode || "dissertation-chapter"}
Working title: ${project.workingTitle || ""}
Researcher: ${project.researcherName || ""}
Programme or field: ${project.programmeField || ""}
Supervisor(s): ${project.supervisors || ""}
Project status: ${project.workStatus || ""}
Target venue: ${project.targetVenue || ""}
Deadline: ${project.deadline || ""}
Keywords: ${project.keywords || ""}

## Main Research Question

${project.researchQuestion || ""}

## Sub-questions

${project.subQuestions || ""}

## Methodology

${project.methodology || ""}

## Contribution

${project.contribution || ""}

## Meeting Notes

${project.meetingNotes || ""}

## Questions for Supervisor

${project.supervisorQuestions || ""}

## Revision Tasks

${project.revisionTasks || ""}

## Next Deadline

${project.nextDeadline || ""}

## Supervisor Comments

${project.supervisorComments || ""}
`;
}

function literatureMatrixMarkdown(payload) {
  const rows = payload.literatureMatrix || [];
  const header =
    "| Citation | Status | Key argument | Method | Theory/framework | Evidence/material | Relevance | Gap/critique |\n|---|---|---|---|---|---|---|---|";
  const body = rows
    .map((row) =>
      [
        row.citation || row.source,
        row.status,
        row.keyArgument || row.finding,
        row.method,
        row.framework || row.theory,
        row.evidence,
        row.relevance,
        row.gap,
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

async function commitAndPush(reason, repoUrl, branch = "main") {
  await ensureGit(repoUrl, branch);
  const trackedPaths = [
    "github-export",
    "README.md",
    "index.html",
    "manifest.webmanifest",
    "service-worker.js",
    "assets",
    "styles",
    "src",
    "server",
    "tests",
    "scripts",
    "package.json",
    "eslint.config.mjs",
    ".prettierrc.json",
    ".github",
    "CHANGELOG.md",
    "CONTRIBUTING.md",
    "docs",
  ].filter((entry) => fs.existsSync(path.join(root, entry)));

  await runGit(["add", "-f", ...trackedPaths]);

  const status = await runGit(["status", "--porcelain"]);
  if (!status.trim()) {
    return "No file changes to push.";
  }

  const stamp = new Date().toISOString().replace("T", " ").slice(0, 19);
  await runGit(["commit", "-m", `Save Vellum Atelier draft (${reason}, ${stamp})`]);

  try {
    const activeBranch = (await runGit(["branch", "--show-current"])).trim() || branch || "main";
    await runGit(["push", "-u", "origin", activeBranch]);
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
      sshUrl ? `Use this SSH URL instead if this device already has a GitHub SSH key: ${sshUrl}` : "",
      "Or authenticate HTTPS with GitHub Desktop, Git Credential Manager, or a personal access token.",
    ]
      .filter(Boolean)
      .join(" ");
  }

  if (text.includes("Permission denied") && text.includes("publickey")) {
    return "GitHub rejected the SSH key. Add this device's SSH key to GitHub or use an authenticated HTTPS remote.";
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

function readConfig() {
  if (!fs.existsSync(configPath) && fs.existsSync(legacyConfigPath)) {
    const legacy = fs.readFileSync(legacyConfigPath, "utf8");
    fs.writeFileSync(configPath, legacy);
    fs.rmSync(legacyConfigPath, { force: true });
  }

  if (!fs.existsSync(configPath)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch {
    return {};
  }
}

const server = http.createServer(async (req, res) => {
  if (rejectOrigin(req, res)) {
    return;
  }

  if (req.method === "OPTIONS") {
    sendJson(req, res, 200, { ok: true });
    return;
  }

  try {
    if (req.method === "POST" && req.url === "/api/config") {
      const payload = JSON.parse(await readBody(req));
      payload.repoUrl = normalizeRepoUrl(payload.repoUrl);
      fs.writeFileSync(configPath, JSON.stringify(payload, null, 2));
      fs.rmSync(legacyConfigPath, { force: true });
      await ensureGit(payload.repoUrl, payload.branch || "main");
      sendJson(req, res, 200, {
        ok: true,
        message: "GitHub repository saved. Pushes will run every 110 seconds.",
      });
      return;
    }

    if (req.method === "POST" && req.url === "/api/snapshot") {
      const payload = JSON.parse(await readBody(req));
      const config = readConfig();
      const repoUrl = normalizeRepoUrl(payload.repoUrl || config.repoUrl);
      const branch = payload.branch || config.branch || "main";

      writeSnapshot(payload);
      const message = await commitAndPush(payload.reason || "auto", repoUrl, branch);
      sendJson(req, res, 200, { ok: true, message });
      return;
    }

    if (req.method === "POST" && req.url === "/api/pull") {
      const payload = JSON.parse(await readBody(req));
      const config = readConfig();
      const repoUrl = normalizeRepoUrl(payload.repoUrl || config.repoUrl);
      const branch = payload.branch || config.branch || "main";

      await ensureGit(repoUrl, branch);
      try {
        const activeBranch = (await runGit(["branch", "--show-current"])).trim() || branch;
        await runGit(["pull", "--ff-only", "origin", activeBranch]);
      } catch (error) {
        sendJson(req, res, 200, {
          ok: false,
          message: `Pull failed: ${friendlyGitPushError(error.output || error.message, repoUrl)}`,
        });
        return;
      }

      sendJson(req, res, 200, {
        ok: true,
        message: "Pulled latest GitHub snapshot.",
        snapshot: readSnapshot(),
      });
      return;
    }

    sendJson(req, res, 404, { ok: false, message: "Not found" });
  } catch (error) {
    sendJson(req, res, 500, {
      ok: false,
      message: error.output || error.message || "Sync failed",
    });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Vellum Atelier GitHub sync helper running at http://127.0.0.1:${port}`);
});
