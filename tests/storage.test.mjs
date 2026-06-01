import test from "node:test";
import assert from "node:assert/strict";

import {
  SESSION_SECRETS_KEY,
  STORAGE_KEY,
  buildProjectExport,
  createDefaultState,
  getLastStorageIssue,
  loadState,
  parseProjectImport,
  persistState,
} from "../src/lib/storage.mjs";

class MemoryStorage {
  constructor() {
    this.map = new Map();
  }

  getItem(key) {
    return this.map.has(key) ? this.map.get(key) : null;
  }

  setItem(key, value) {
    this.map.set(key, String(value));
  }

  removeItem(key) {
    this.map.delete(key);
  }
}

test("persistState strips long-lived secrets and keeps session secrets separate", () => {
  const local = new MemoryStorage();
  const session = new MemoryStorage();
  const state = createDefaultState();

  state.githubToken = "gh-secret";
  state.zotero.apiKey = "zotero-secret";
  state.customReferences = {
    keep: { id: "keep", title: "Kept reference" },
    drop: { id: "drop", title: "Transient reference" },
  };
  state.documents[0].references = ["keep"];

  const result = persistState(state, state.activeId, local, session);
  assert.equal(result.ok, true);

  const persisted = JSON.parse(local.getItem(STORAGE_KEY));
  assert.equal(persisted.githubToken, "");
  assert.equal(persisted.zotero.apiKey, "");
  assert.deepEqual(Object.keys(persisted.customReferences), ["keep"]);

  const secrets = JSON.parse(session.getItem(SESSION_SECRETS_KEY));
  assert.equal(secrets.githubToken, "gh-secret");
  assert.equal(secrets.zoteroApiKey, "zotero-secret");
});

test("loadState migrates legacy storage and restores session secrets", () => {
  const local = new MemoryStorage();
  const session = new MemoryStorage();
  const state = createDefaultState();
  state.documents[0].title = "Migrated draft";

  local.setItem("arted-phd-writer-state-v1", JSON.stringify(state));
  session.setItem(
    SESSION_SECRETS_KEY,
    JSON.stringify({ githubToken: "session-gh", zoteroApiKey: "session-zotero" }),
  );

  const loaded = loadState(local, session);
  assert.equal(loaded.documents[0].title, "Migrated draft");
  assert.equal(loaded.githubToken, "session-gh");
  assert.equal(loaded.zotero.apiKey, "session-zotero");
  assert.ok(local.getItem(STORAGE_KEY));
  assert.equal(local.getItem("arted-phd-writer-state-v1"), null);
});

test("project export and import survive a round trip", () => {
  const state = createDefaultState();
  state.project.workingTitle = "Release candidate";
  state.documents[0].content = "<h1>Draft</h1><p>Useful paragraph.</p>";

  const payload = buildProjectExport(state, state.activeId);
  const imported = parseProjectImport(payload);

  assert.equal(imported.state.project.workingTitle, "Release candidate");
  assert.equal(imported.state.documents[0].content, "<h1>Draft</h1><p>Useful paragraph.</p>");
  assert.equal(imported.state.githubToken, "");
  assert.equal(imported.state.zotero.apiKey, "");
});

test("parseProjectImport rejects broken input", () => {
  assert.throws(() => parseProjectImport("{not json"), /not valid JSON/i);
  assert.throws(() => parseProjectImport(JSON.stringify({ nope: true })), /does not contain a valid/i);
});

test("persistState reports storage failures clearly", () => {
  const local = {
    getItem() {
      return null;
    },
    setItem() {
      const error = new Error("Quota full");
      error.name = "QuotaExceededError";
      throw error;
    },
    removeItem() {},
  };
  const session = new MemoryStorage();
  const state = createDefaultState();

  const result = persistState(state, state.activeId, local, session);
  assert.equal(result.ok, false);
  assert.match(result.error, /storage is full/i);
  assert.match(getLastStorageIssue(), /storage is full/i);
});
