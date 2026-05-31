export const APP_VERSION = "2026.05.31";
export const STORAGE_SCHEMA_VERSION = 2;
export const STORAGE_KEY = "vellum-atelier-state-v1";
export const LEGACY_STORAGE_KEYS = ["vellum-atelier-state-v2", "arted-phd-writer-state-v1"];
export const SESSION_SECRETS_KEY = "vellum-atelier-session-secrets";
export const EXPORT_FORMAT = "vellum-atelier-project";
export const defaultFolderId = "folder-unsorted";
export const templateFolderId = "folder-templates";
export const defaultGithubBranch = "main";
export const defaultFontFamily = "Times New Roman";
export const defaultFontSize = 12;
export const defaultLineHeight = 2;
export const defaultZoom = 100;

let lastStorageIssue = "";

function createId() {
  return globalThis.crypto?.randomUUID?.() || `doc-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function clampZoom(value) {
  return Math.min(170, Math.max(70, Math.round(value || defaultZoom)));
}

export function createDocument(overrides = {}) {
  return {
    id: overrides.id || createId(),
    title: overrides.title || "Untitled academic draft",
    style: overrides.style || "apa",
    status: overrides.status || "Draft",
    content: overrides.content || "",
    references: Array.isArray(overrides.references) ? overrides.references : [],
    manualReferences: Array.isArray(overrides.manualReferences) ? overrides.manualReferences : [],
    folderId: overrides.folderId || defaultFolderId,
    fontFamily: overrides.fontFamily || defaultFontFamily,
    fontSize: Number(overrides.fontSize) || defaultFontSize,
    lineHeight: Number(overrides.lineHeight) || defaultLineHeight,
    zoom: clampZoom(Number(overrides.zoom) || defaultZoom),
    updatedAt: overrides.updatedAt || Date.now(),
    formattingPresetVersion: overrides.formattingPresetVersion || STORAGE_SCHEMA_VERSION,
  };
}

export function createDefaultFolders() {
  return [
    { id: defaultFolderId, name: "Current project", createdAt: Date.now() },
    { id: templateFolderId, name: "Starter templates", createdAt: Date.now(), collapsed: true },
  ];
}

export function createStarterDocuments() {
  return [
    createDocument({
      title: "Dissertation chapter",
      content:
        "<h1>Chapter title</h1><h2>Research question</h2><p>State the chapter question and explain how it connects to the wider dissertation argument.</p><h2>Method</h2><p>Outline the material, method, and analytical approach used in this chapter.</p><h2>Discussion</h2><p>Develop the evidence, interpretation, and contribution of the chapter here.</p>",
    }),
    createDocument({
      title: "Journal article",
      content:
        "<h1>Working title</h1><h2>Abstract</h2><p>Summarize the problem, argument, method, and contribution in a compact form.</p><h2>Introduction</h2><p>Introduce the topic, explain why it matters, and position the article in relation to existing scholarship.</p>",
      folderId: templateFolderId,
      updatedAt: Date.now() - 60_000,
    }),
    createDocument({
      title: "Conference paper",
      content:
        "<h1>Presentation title</h1><h2>Core argument</h2><p>State the key claim, why it matters, and what the audience should take away.</p><h2>Material and method</h2><p>Describe the evidence, method, or case material you will present.</p><h2>Takeaway</h2><p>End with the contribution, open question, or next step for discussion.</p>",
      folderId: templateFolderId,
      updatedAt: Date.now() - 120_000,
    }),
    createDocument({
      title: "Literature review",
      content:
        "<h2>Key debates</h2><p>Summarize the main conversations, leading authors, and unresolved questions in the field here.</p><h2>Gaps</h2><p>Use this section to note where the literature is thin, contradictory, or methodologically limited.</p>",
      folderId: templateFolderId,
      updatedAt: Date.now() - 180_000,
    }),
    createDocument({
      title: "Research plan",
      content:
        "<h1>Project title</h1><h2>Problem</h2><p>Describe the research problem and why it deserves attention.</p><h2>Questions</h2><p>List the main research question and any supporting questions.</p><h2>Approach</h2><p>Outline the planned method, material, and expected contribution.</p>",
      folderId: templateFolderId,
      updatedAt: Date.now() - 240_000,
    }),
    createDocument({
      title: "Funding application outline",
      content:
        "<h1>Application title</h1><h2>Need and significance</h2><p>Explain the research need, urgency, and relevance.</p><h2>Objectives</h2><p>List the project aims, questions, and expected outputs.</p><h2>Execution plan</h2><p>Outline the work packages, timetable, and resources required.</p>",
      folderId: templateFolderId,
      updatedAt: Date.now() - 300_000,
    }),
    createDocument({
      title: "Supervisor meeting notes",
      content:
        "<h1>Meeting notes</h1><h2>Agenda</h2><p>List the questions, decisions, and draft sections to discuss.</p><h2>Discussion notes</h2><p>Capture feedback, risks, and next steps during the meeting.</p><h2>Actions</h2><p>Record what needs to happen before the next meeting.</p>",
      folderId: templateFolderId,
      updatedAt: Date.now() - 360_000,
    }),
    createDocument({
      title: "Revision response plan",
      content:
        "<h1>Revision plan</h1><h2>Reviewer or supervisor comments</h2><p>Summarize the key requests, critiques, and priorities.</p><h2>Response strategy</h2><p>Explain how each issue will be addressed in the next draft.</p><h2>Completion plan</h2><p>Track what is done, what is pending, and what still needs clarification.</p>",
      folderId: templateFolderId,
      updatedAt: Date.now() - 420_000,
    }),
  ];
}

export function createDefaultState() {
  const starterDocuments = createStarterDocuments();
  return normalizeState({
    folders: createDefaultFolders(),
    documents: starterDocuments,
    activeId: starterDocuments[0].id,
    customReferences: {},
  });
}

function defaultProjectState() {
  return {
    mode: "dissertation-chapter",
    workingTitle: "",
    researcherName: "",
    programmeField: "",
    supervisors: "",
    workStatus: "Planning",
    targetVenue: "",
    deadline: "",
    keywords: "",
    researchQuestion: "",
    subQuestions: "",
    methodology: "",
    contribution: "",
    meetingNotes: "",
    supervisorQuestions: "",
    revisionTasks: "",
    nextDeadline: "",
    supervisorComments: "",
  };
}

function normalizeProjectMode(value) {
  const map = {
    thesis: "dissertation-chapter",
    article: "journal-article",
    proposal: "research-plan",
  };
  return map[value] || value || "dissertation-chapter";
}

function storageGet(storageLike, key) {
  try {
    return storageLike?.getItem?.(key) ?? null;
  } catch {
    return null;
  }
}

function storageSet(storageLike, key, value) {
  try {
    storageLike?.setItem?.(key, value);
    return true;
  } catch {
    return false;
  }
}

function storageRemove(storageLike, key) {
  try {
    storageLike?.removeItem?.(key);
  } catch {
    // Ignore storage clear failures in private mode / unsupported browsers.
  }
}

function bareStateForPersistence(state, activeId) {
  return {
    ...state,
    schemaVersion: STORAGE_SCHEMA_VERSION,
    appVersion: APP_VERSION,
    activeId,
    githubToken: "",
    zotero: {
      ...(state.zotero || {}),
      apiKey: "",
    },
  };
}

function sessionSecretsFromState(state) {
  return {
    githubToken: state.githubToken || "",
    zoteroApiKey: state.zotero?.apiKey || "",
  };
}

function readSessionSecrets(sessionStorageLike = globalThis.sessionStorage) {
  const raw = storageGet(sessionStorageLike, SESSION_SECRETS_KEY);
  if (!raw) return { githubToken: "", zoteroApiKey: "" };

  try {
    const parsed = JSON.parse(raw);
    return {
      githubToken: parsed.githubToken || "",
      zoteroApiKey: parsed.zoteroApiKey || "",
    };
  } catch {
    return { githubToken: "", zoteroApiKey: "" };
  }
}

function writeSessionSecrets(state, sessionStorageLike = globalThis.sessionStorage) {
  storageSet(
    sessionStorageLike,
    SESSION_SECRETS_KEY,
    JSON.stringify(sessionSecretsFromState(state)),
  );
}

export function normalizeState(value) {
  const safeValue = value && typeof value === "object" ? value : {};
  const documentsInput = Array.isArray(safeValue.documents) && safeValue.documents.length
    ? safeValue.documents
    : createStarterDocuments();
  const folders = Array.isArray(safeValue.folders) && safeValue.folders.length
    ? safeValue.folders
    : createDefaultFolders();

  const folderIds = new Set(folders.map((folder) => folder.id));
  const documents = documentsInput.map((doc) => {
    const fontFamily = doc.fontFamily || defaultFontFamily;
    const fontSize = Number(doc.fontSize) || defaultFontSize;
    const lineHeight = Number(doc.lineHeight) || defaultLineHeight;
    const useAcademicDefaults =
      !doc.formattingPresetVersion &&
      fontFamily === "Georgia" &&
      fontSize === 14 &&
      lineHeight === 1.75;

    return {
      ...createDocument(doc),
      fontFamily: useAcademicDefaults ? defaultFontFamily : fontFamily,
      fontSize: useAcademicDefaults ? defaultFontSize : fontSize,
      lineHeight: useAcademicDefaults ? defaultLineHeight : lineHeight,
      formattingPresetVersion: STORAGE_SCHEMA_VERSION,
      folderId: folderIds.has(doc.folderId) ? doc.folderId : defaultFolderId,
      status: doc.status || "Draft",
      manualReferences: Array.isArray(doc.manualReferences) ? doc.manualReferences : [],
      zoom: clampZoom(Number(doc.zoom) || defaultZoom),
    };
  });

  return {
    ...safeValue,
    schemaVersion: STORAGE_SCHEMA_VERSION,
    appVersion: APP_VERSION,
    folders,
    documents,
    project: {
      ...defaultProjectState(),
      ...(safeValue.project || {}),
      mode: normalizeProjectMode(safeValue.project?.mode),
    },
    theme: safeValue.theme || "night",
    literatureMatrix: Array.isArray(safeValue.literatureMatrix)
      ? safeValue.literatureMatrix.map((row) => ({
          id: row.id || createId(),
          citation: row.citation || row.source || "",
          status: row.status || "unread",
          keyArgument: row.keyArgument || row.finding || "",
          method: row.method || "",
          framework: row.framework || row.theory || "",
          evidence: row.evidence || "",
          relevance: row.relevance || "",
          gap: row.gap || "",
        }))
      : [],
    githubRepoUrl: safeValue.githubRepoUrl || "",
    githubBranch: safeValue.githubBranch || defaultGithubBranch,
    githubToken: safeValue.githubToken || "",
    githubLastSyncAt: safeValue.githubLastSyncAt || "",
    githubLastAction: safeValue.githubLastAction || "",
    ui: {
      focusMode: false,
      ...(safeValue.ui || {}),
    },
    zotero: {
      libraryType: "users",
      libraryId: "",
      apiKey: "",
      searchQuery: "",
      ...(safeValue.zotero || {}),
    },
    activeId: documents.some((doc) => doc.id === safeValue.activeId)
      ? safeValue.activeId
      : documents[0]?.id,
    customReferences: safeValue.customReferences || {},
  };
}

export function loadState(
  localStorageLike = globalThis.localStorage,
  sessionStorageLike = globalThis.sessionStorage,
) {
  lastStorageIssue = "";

  for (const key of [STORAGE_KEY, ...LEGACY_STORAGE_KEYS]) {
    const saved = storageGet(localStorageLike, key);
    if (!saved) continue;

    try {
      const parsed = JSON.parse(saved);
      const normalized = normalizeState(parsed);
      const sessionSecrets = readSessionSecrets(sessionStorageLike);
      normalized.githubToken = sessionSecrets.githubToken || "";
      normalized.zotero.apiKey = sessionSecrets.zoteroApiKey || "";
      if (key !== STORAGE_KEY) {
        persistState(normalized, normalized.activeId, localStorageLike, sessionStorageLike);
        LEGACY_STORAGE_KEYS.forEach((legacyKey) => storageRemove(localStorageLike, legacyKey));
      }
      return normalized;
    } catch {
      lastStorageIssue =
        "Saved local data could not be read safely. Vellum Atelier started with a clean workspace instead.";
      break;
    }
  }

  return createDefaultState();
}

export function persistState(
  state,
  activeId,
  localStorageLike = globalThis.localStorage,
  sessionStorageLike = globalThis.sessionStorage,
) {
  writeSessionSecrets(state, sessionStorageLike);
  return storageSet(
    localStorageLike,
    STORAGE_KEY,
    JSON.stringify(bareStateForPersistence(state, activeId)),
  );
}

export function clearPersistedState(
  localStorageLike = globalThis.localStorage,
  sessionStorageLike = globalThis.sessionStorage,
) {
  [STORAGE_KEY, ...LEGACY_STORAGE_KEYS].forEach((key) => storageRemove(localStorageLike, key));
  storageRemove(sessionStorageLike, SESSION_SECRETS_KEY);
}

export function clearSessionSecrets(sessionStorageLike = globalThis.sessionStorage) {
  storageRemove(sessionStorageLike, SESSION_SECRETS_KEY);
}

export function getLastStorageIssue() {
  return lastStorageIssue;
}

export function buildProjectExport(state, activeId) {
  return JSON.stringify(
    {
      format: EXPORT_FORMAT,
      schemaVersion: STORAGE_SCHEMA_VERSION,
      appVersion: APP_VERSION,
      exportedAt: new Date().toISOString(),
      state: bareStateForPersistence(state, activeId),
    },
    null,
    2,
  );
}

export function parseProjectImport(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("This file is not valid JSON.");
  }

  const rawState =
    parsed?.format === EXPORT_FORMAT && parsed.state && typeof parsed.state === "object"
      ? parsed.state
      : parsed;

  if (!Array.isArray(rawState?.documents) || rawState.documents.length === 0) {
    throw new Error("This file does not contain a valid Vellum Atelier project.");
  }

  const normalized = normalizeState(rawState);
  normalized.githubToken = "";
  normalized.zotero.apiKey = "";
  return {
    state: normalized,
    metadata: {
      format: parsed?.format || EXPORT_FORMAT,
      schemaVersion: parsed?.schemaVersion || rawState?.schemaVersion || 1,
      appVersion: parsed?.appVersion || rawState?.appVersion || "unknown",
      exportedAt: parsed?.exportedAt || "",
    },
  };
}
