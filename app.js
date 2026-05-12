const storageKey = "arted-phd-writer-state-v1";
const defaultFolderId = "folder-unsorted";
const defaultGithubBranch = "main";
const defaultFontFamily = "Times New Roman";
const defaultFontSize = 12;
const defaultLineHeight = 2;
const defaultZoom = 100;

function createDocument(overrides = {}) {
  return {
    id: crypto.randomUUID(),
    title: "Untitled academic draft",
    style: "apa",
    status: "Draft",
    content: "",
    references: [],
    manualReferences: [],
    folderId: defaultFolderId,
    fontFamily: defaultFontFamily,
    fontSize: defaultFontSize,
    lineHeight: defaultLineHeight,
    zoom: defaultZoom,
    updatedAt: Date.now(),
    ...overrides,
  };
}

const starterDocuments = [
  createDocument({
    title: "Thesis chapter draft",
    content: `<h2>Introduction</h2><p>Art education can be understood as a site where visual culture, identity, and critical pedagogy meet. This chapter examines how reflective practice can support students in connecting personal meaning with broader social questions.</p><p>The central argument is that socially engaged art education requires more than skill development; it requires attention to voice, context, materiality, and the ethical conditions of participation.</p>`,
  }),
  createDocument({
    title: "Article idea",
    content: `<h2>Abstract</h2><p>This article explores how museum education can support dialogic learning through participatory art practices. It considers the relationship between interpretation, embodiment, and critical reflection.</p>`,
    updatedAt: Date.now() - 60000,
  }),
];

const referenceCorpus = [
  {
    id: "freire-1970",
    title: "Pedagogy of the Oppressed",
    authors: ["Paulo Freire"],
    year: 1970,
    source: "Foundational book",
    topics: ["critical pedagogy", "education", "participation", "dialogue"],
    abstract:
      "A foundational account of dialogic education, conscientization, and critique of banking models of learning.",
    url: "https://www.worldcat.org/search?q=Pedagogy+of+the+Oppressed+Paulo+Freire",
  },
  {
    id: "hooks-1994",
    title: "Teaching to Transgress: Education as the Practice of Freedom",
    authors: ["bell hooks"],
    year: 1994,
    source: "Foundational book",
    topics: ["critical pedagogy", "feminist pedagogy", "voice", "classroom"],
    abstract:
      "Connects liberatory pedagogy, lived experience, and the classroom as a space of critical possibility.",
    url: "https://www.worldcat.org/search?q=Teaching+to+Transgress+bell+hooks",
  },
  {
    id: "duncum-2002",
    title: "Visual Culture Art Education: Why, What and How",
    authors: ["Paul Duncum"],
    year: 2002,
    source: "International Journal of Art & Design Education",
    topics: ["visual culture", "art education", "curriculum", "media"],
    abstract:
      "Argues for art education that engages everyday visual culture and the social meanings of images.",
    url: "https://scholar.google.com/scholar?q=Visual+Culture+Art+Education+Why+What+and+How+Duncum",
  },
  {
    id: "irwin-2004",
    title: "A/r/tography: Rendering Self Through Arts-Based Living Inquiry",
    authors: ["Rita L. Irwin", "Alex de Cosson"],
    year: 2004,
    source: "Arts-based research",
    topics: ["a/r/tography", "arts-based research", "practice-led research", "identity"],
    abstract:
      "Frames artistic, research, and teaching practices as entangled modes of inquiry.",
    url: "https://scholar.google.com/scholar?q=A%2Fr%2Ftography+Rendering+Self+Through+Arts-Based+Living+Inquiry",
  },
  {
    id: "barone-eisner-2012",
    title: "Arts Based Research",
    authors: ["Tom Barone", "Elliot W. Eisner"],
    year: 2012,
    source: "Research methods book",
    topics: ["arts-based research", "methodology", "qualitative research", "representation"],
    abstract:
      "Explores arts-based research as a way of representing, interpreting, and communicating human experience.",
    url: "https://www.worldcat.org/search?q=Arts+Based+Research+Barone+Eisner",
  },
  {
    id: "bishop-2012",
    title: "Artificial Hells: Participatory Art and the Politics of Spectatorship",
    authors: ["Claire Bishop"],
    year: 2012,
    source: "Art theory book",
    topics: ["participatory art", "socially engaged art", "spectatorship", "community"],
    abstract:
      "Critically examines participation, authorship, and political claims in socially engaged art.",
    url: "https://www.worldcat.org/search?q=Artificial+Hells+Claire+Bishop",
  },
  {
    id: "kester-2004",
    title: "Conversation Pieces: Community and Communication in Modern Art",
    authors: ["Grant H. Kester"],
    year: 2004,
    source: "Art theory book",
    topics: ["dialogue", "socially engaged art", "community art", "participation"],
    abstract:
      "Develops dialogical aesthetics as a framework for socially engaged and community-based art practices.",
    url: "https://www.worldcat.org/search?q=Conversation+Pieces+Grant+Kester",
  },
  {
    id: "hein-1998",
    title: "Learning in the Museum",
    authors: ["George E. Hein"],
    year: 1998,
    source: "Museum education book",
    topics: ["museum education", "constructivism", "learning", "interpretation"],
    abstract:
      "Applies constructivist learning theory to museum education, interpretation, and visitor experience.",
    url: "https://www.worldcat.org/search?q=Learning+in+the+Museum+George+Hein",
  },
  {
    id: "dewey-1934",
    title: "Art as Experience",
    authors: ["John Dewey"],
    year: 1934,
    source: "Foundational book",
    topics: ["aesthetic experience", "experience", "education", "democracy"],
    abstract:
      "A foundational account of art, experience, perception, and the continuity between art and life.",
    url: "https://www.worldcat.org/search?q=Art+as+Experience+John+Dewey",
  },
  {
    id: "springgay-2008",
    title: "Being with A/r/tography",
    authors: ["Stephanie Springgay", "Rita L. Irwin", "Sylvia Wilson Kind"],
    year: 2008,
    source: "Arts-based research article",
    topics: ["a/r/tography", "embodiment", "relationality", "arts-based research"],
    abstract:
      "Discusses relational, embodied, and living inquiry dimensions of a/r/tographic research.",
    url: "https://scholar.google.com/scholar?q=Being+with+A%2Fr%2Ftography+Springgay+Irwin+Kind",
  },
];

const typoMap = {
  aslo: "also",
  det4cts: "detects",
  depdening: "depending",
  writeing: "writing",
  reuqest: "request",
  rephracser: "rephraser",
  incldued: "included",
  soruces: "sources",
  seperate: "separate",
  recieve: "receive",
  teh: "the",
  thier: "their",
  becuase: "because",
};

const topicKeywords = [
  "art education",
  "visual culture",
  "critical pedagogy",
  "museum education",
  "a/r/tography",
  "arts-based research",
  "practice-led research",
  "participatory art",
  "socially engaged art",
  "feminist pedagogy",
  "decolonial",
  "embodiment",
  "reflective practice",
  "teacher education",
  "aesthetic experience",
  "community art",
  "dialogue",
  "identity",
  "curriculum",
];

let state = loadState();
let activeId = state.activeId || state.documents[0].id;
let lastSelection = null;
let visibleReferences = [];
let liveCrosscheckReferences = [];
let zoteroReferences = [];
let liveSearchTimer = null;
let highlightTimer = null;
let githubSnapshotTimer = null;
let persistTimer = null;
let analysisTimer = null;
let lastLiveQuery = "";
let lastGithubPushSignature = "";
let contextCitationToken = null;
const referenceTokenCache = new Map();
const githubSyncEndpoint = "http://127.0.0.1:37110/api";

const els = {
  documentList: document.querySelector("#documentList"),
  outlineList: document.querySelector("#outlineList"),
  folderInlinePanel: document.querySelector("#folderInlinePanel"),
  folderNameInput: document.querySelector("#folderNameInput"),
  pageCanvas: document.querySelector("#pageCanvas"),
  editor: document.querySelector("#editor"),
  editorContextMenu: document.querySelector("#editorContextMenu"),
  commandPalette: document.querySelector("#commandPalette"),
  commandInput: document.querySelector("#commandInput"),
  commandResults: document.querySelector("#commandResults"),
  docTitle: document.querySelector("#docTitle"),
  workspaceMenuButton: document.querySelector("#workspaceMenuButton"),
  workspaceMenu: document.querySelector("#workspaceMenu"),
  themeToggleButton: document.querySelector("#themeToggleButton"),
  focusModeButton: document.querySelector("#focusModeButton"),
  openCommandButton: document.querySelector("#openCommandButton"),
  closeCommandButton: document.querySelector("#closeCommandButton"),
  projectMode: document.querySelector("#projectMode"),
  docStatus: document.querySelector("#docStatus"),
  citationStyleSelect: document.querySelector("#citationStyleSelect"),
  blockStyleSelect: document.querySelector("#blockStyleSelect"),
  fontFamilySelect: document.querySelector("#fontFamilySelect"),
  fontSizeSelect: document.querySelector("#fontSizeSelect"),
  lineHeightSelect: document.querySelector("#lineHeightSelect"),
  textAlignSelect: document.querySelector("#textAlignSelect"),
  textToolsButton: document.querySelector("#textToolsButton"),
  textToolsMenu: document.querySelector("#textToolsMenu"),
  zoomLevelLabel: document.querySelector("#zoomLevelLabel"),
  wordCount: document.querySelector("#wordCount"),
  charCount: document.querySelector("#charCount"),
  citationCount: document.querySelector("#citationCount"),
  topicLabel: document.querySelector("#topicLabel"),
  referenceTopic: document.querySelector("#referenceTopic"),
  focusOptions: document.querySelector("#focusOptions"),
  referenceList: document.querySelector("#referenceList"),
  sourceCheckList: document.querySelector("#sourceCheckList"),
  sourceCheckStatus: document.querySelector("#sourceCheckStatus"),
  readingList: document.querySelector("#readingList"),
  selectionPreview: document.querySelector("#selectionPreview"),
  selectionCitationList: document.querySelector("#selectionCitationList"),
  zoteroLibraryType: document.querySelector("#zoteroLibraryType"),
  zoteroLibraryId: document.querySelector("#zoteroLibraryId"),
  zoteroApiKey: document.querySelector("#zoteroApiKey"),
  zoteroSearchInput: document.querySelector("#zoteroSearchInput"),
  zoteroStatus: document.querySelector("#zoteroStatus"),
  zoteroResults: document.querySelector("#zoteroResults"),
  researchQuestionInput: document.querySelector("#researchQuestionInput"),
  subQuestionsInput: document.querySelector("#subQuestionsInput"),
  methodologyInput: document.querySelector("#methodologyInput"),
  contributionInput: document.querySelector("#contributionInput"),
  literatureMatrix: document.querySelector("#literatureMatrix"),
  checkList: document.querySelector("#checkList"),
  syncState: document.querySelector("#syncState"),
  githubInlinePanel: document.querySelector("#githubInlinePanel"),
  githubButton: document.querySelector("#githubButton"),
  githubRepoInput: document.querySelector("#githubRepoInput"),
  githubBranchInput: document.querySelector("#githubBranchInput"),
  githubTokenInput: document.querySelector("#githubTokenInput"),
  githubActionsButton: document.querySelector("#githubActionsButton"),
  githubActionsMenu: document.querySelector("#githubActionsMenu"),
  githubModeBadge: document.querySelector("#githubModeBadge"),
  githubDetail: document.querySelector("#githubDetail"),
  githubSyncMessage: document.querySelector("#githubSyncMessage"),
  rewriteModeSelect: document.querySelector("#rewriteModeSelect"),
  runRewriteButton: document.querySelector("#runRewriteButton"),
  rewriteOutput: document.querySelector("#rewriteOutput"),
};

function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) {
    return normalizeState({
      documents: starterDocuments,
      activeId: starterDocuments[0].id,
      customReferences: {},
    });
  }

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed.documents) || parsed.documents.length === 0) {
      throw new Error("Invalid document list");
    }
    parsed.customReferences = parsed.customReferences || {};
    return normalizeState(parsed);
  } catch {
    return normalizeState({
      documents: starterDocuments,
      activeId: starterDocuments[0].id,
      customReferences: {},
    });
  }
}

function normalizeState(value) {
  const folders = Array.isArray(value.folders) && value.folders.length
    ? value.folders
    : [{ id: defaultFolderId, name: "Unsorted", createdAt: Date.now() }];

  const folderIds = new Set(folders.map((folder) => folder.id));
  const documents = value.documents.map((doc) => ({
    ...createDocument(doc),
    ...(() => {
      const fontFamily = doc.fontFamily || defaultFontFamily;
      const fontSize = Number(doc.fontSize) || defaultFontSize;
      const lineHeight = Number(doc.lineHeight) || defaultLineHeight;
      const useAcademicDefaults =
        !doc.formattingPresetVersion &&
        fontFamily === "Georgia" &&
        fontSize === 14 &&
        lineHeight === 1.75;
      return {
        fontFamily: useAcademicDefaults ? defaultFontFamily : fontFamily,
        fontSize: useAcademicDefaults ? defaultFontSize : fontSize,
        lineHeight: useAcademicDefaults ? defaultLineHeight : lineHeight,
        formattingPresetVersion: 2,
      };
    })(),
    folderId: folderIds.has(doc.folderId) ? doc.folderId : defaultFolderId,
    status: doc.status || "Draft",
    manualReferences: Array.isArray(doc.manualReferences) ? doc.manualReferences : [],
    zoom: clampZoom(Number(doc.zoom) || defaultZoom),
  }));

  return {
    ...value,
    folders,
    documents,
    project: {
      mode: "thesis",
      researchQuestion: "",
      subQuestions: "",
      methodology: "",
      contribution: "",
      ...(value.project || {}),
    },
    theme: value.theme || "night",
    literatureMatrix: Array.isArray(value.literatureMatrix) ? value.literatureMatrix : [],
    githubRepoUrl: value.githubRepoUrl || "",
    githubBranch: value.githubBranch || defaultGithubBranch,
    githubToken: value.githubToken || "",
    githubLastSyncAt: value.githubLastSyncAt || "",
    githubLastAction: value.githubLastAction || "",
    ui: {
      focusMode: false,
      ...(value.ui || {}),
    },
    zotero: {
      libraryType: "users",
      libraryId: "",
      apiKey: "",
      searchQuery: "",
      ...(value.zotero || {}),
    },
    activeId: documents.some((doc) => doc.id === value.activeId)
      ? value.activeId
      : documents[0]?.id,
    customReferences: value.customReferences || {},
  };
}

function persist() {
  localStorage.setItem(storageKey, JSON.stringify({ ...state, activeId }));
  els.syncState.textContent = `Saved locally at ${new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

function schedulePersist() {
  if (els.syncState) {
    els.syncState.textContent = "Saving locally...";
  }
  clearTimeout(persistTimer);
  persistTimer = setTimeout(() => {
    persistTimer = null;
    persist();
  }, 220);
}

function flushPersist() {
  if (persistTimer) {
    clearTimeout(persistTimer);
    persistTimer = null;
  }
  persist();
}

function activeDocument() {
  return state.documents.find((doc) => doc.id === activeId) || state.documents[0];
}

function renderDocuments() {
  els.documentList.innerHTML = "";
  state.folders.forEach((folder) => {
    const folderEl = document.createElement("section");
    folderEl.className = "folder-block";
    folderEl.dataset.folderId = folder.id;
    folderEl.innerHTML = `
      <div class="folder-header">
        <button class="folder-name" type="button" data-folder-toggle="${escapeHtml(folder.id)}">${escapeHtml(folder.name)}</button>
        <span class="folder-count">${documentsInFolder(folder.id).length}</span>
        <button class="delete-button" type="button" data-delete-folder="${escapeHtml(folder.id)}" title="Delete folder">×</button>
      </div>
      <div class="folder-documents" ${folder.collapsed ? "hidden" : ""}></div>
    `;

    const list = folderEl.querySelector(".folder-documents");
    const docs = documentsInFolder(folder.id);
    if (!docs.length) {
      list.innerHTML = '<div class="drop-hint">Drag documents here</div>';
    } else {
      docs.forEach((doc) => list.appendChild(documentButton(doc)));
    }

    folderEl.addEventListener("dragover", (event) => {
      event.preventDefault();
      folderEl.classList.add("drag-over");
    });
    folderEl.addEventListener("dragleave", () => folderEl.classList.remove("drag-over"));
    folderEl.addEventListener("drop", (event) => {
      event.preventDefault();
      folderEl.classList.remove("drag-over");
      moveDocumentToFolder(event.dataTransfer.getData("text/plain"), folder.id);
    });

    els.documentList.appendChild(folderEl);
  });
}

function documentsInFolder(folderId) {
  return state.documents
    .filter((doc) => doc.folderId === folderId)
    .slice()
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

function documentButton(doc) {
  const row = document.createElement("div");
  row.className = `document-item ${doc.id === activeId ? "active" : ""}`;
  row.draggable = true;
  row.dataset.documentId = doc.id;
  row.innerHTML = `
    <button class="document-main" type="button" data-open-document="${escapeHtml(doc.id)}">
      <strong>${escapeHtml(doc.title || "Untitled")}</strong>
      <span>${countWords(stripHtml(doc.content))} words</span>
      <span class="status-badge">${escapeHtml(doc.status || "Draft")}</span>
    </button>
    <button class="delete-button" type="button" data-delete-document="${escapeHtml(doc.id)}" title="Delete document">×</button>
  `;
  row.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", doc.id);
    event.dataTransfer.effectAllowed = "move";
  });
  return row;
}

function moveDocumentToFolder(docId, folderId) {
  const doc = state.documents.find((item) => item.id === docId);
  if (!doc) return;
  doc.folderId = folderId;
  doc.updatedAt = Date.now();
  persist();
  renderDocuments();
}

function createFolder(nameFromInput = els.folderNameInput?.value) {
  const name = nameFromInput;
  if (!name?.trim()) return;
  state.folders.push({
    id: crypto.randomUUID(),
    name: name.trim(),
    collapsed: false,
    createdAt: Date.now(),
  });
  if (els.folderNameInput) els.folderNameInput.value = "";
  if (els.folderInlinePanel) els.folderInlinePanel.hidden = true;
  persist();
  renderDocuments();
}

function toggleFolder(folderId) {
  const folder = state.folders.find((item) => item.id === folderId);
  if (!folder) return;
  folder.collapsed = !folder.collapsed;
  persist();
  renderDocuments();
}

function deleteDocument(docId) {
  if (state.documents.length <= 1) {
    alert("Keep at least one document in the project.");
    return;
  }

  const doc = state.documents.find((item) => item.id === docId);
  if (!doc) return;
  if (!confirm(`Delete "${doc.title || "Untitled"}"?`)) return;

  state.documents = state.documents.filter((item) => item.id !== docId);
  if (activeId === docId) {
    activeId = state.documents[0].id;
  }
  persist();
  renderApp();
}

function deleteFolder(folderId) {
  if (folderId === defaultFolderId) {
    alert("The Unsorted folder cannot be deleted.");
    return;
  }

  const folder = state.folders.find((item) => item.id === folderId);
  if (!folder) return;
  if (!confirm(`Delete folder "${folder.name}"? Documents inside will move to Unsorted.`)) return;

  state.documents.forEach((doc) => {
    if (doc.folderId === folderId) doc.folderId = defaultFolderId;
  });
  state.folders = state.folders.filter((item) => item.id !== folderId);
  persist();
  renderDocuments();
}

function renderProjectPlan() {
  if (!els.researchQuestionInput) return;
  const project = state.project || {};
  if (els.projectMode) {
    els.projectMode.value = project.mode || "thesis";
  }
  els.researchQuestionInput.value = project.researchQuestion || "";
  els.subQuestionsInput.value = project.subQuestions || "";
  els.methodologyInput.value = project.methodology || "";
  els.contributionInput.value = project.contribution || "";
  renderLiteratureMatrix();
}

function saveProjectPlan() {
  state.project = {
    ...(state.project || {}),
    mode: els.projectMode?.value || state.project?.mode || "thesis",
    researchQuestion: els.researchQuestionInput.value,
    subQuestions: els.subQuestionsInput.value,
    methodology: els.methodologyInput.value,
    contribution: els.contributionInput.value,
  };
  schedulePersist();
}

function renderLiteratureMatrix() {
  if (!els.literatureMatrix) return;
  const rows = state.literatureMatrix || [];
  if (!rows.length) {
    els.literatureMatrix.innerHTML =
      '<div class="matrix-empty">Add sources here to build a literature review matrix.</div>';
    return;
  }

  els.literatureMatrix.innerHTML = rows
    .map(
      (row) => `
        <article class="matrix-row" data-matrix-id="${escapeHtml(row.id)}">
          <label>Source<input data-lit-field="source" value="${escapeAttribute(row.source || "")}" placeholder="Author, year, title" /></label>
          <label>Theory<input data-lit-field="theory" value="${escapeAttribute(row.theory || "")}" placeholder="Key concept" /></label>
          <label>Method<input data-lit-field="method" value="${escapeAttribute(row.method || "")}" placeholder="Methodology" /></label>
          <label>Finding<textarea data-lit-field="finding" placeholder="Main finding">${escapeHtml(row.finding || "")}</textarea></label>
          <label>Relevance<textarea data-lit-field="relevance" placeholder="Why it matters">${escapeHtml(row.relevance || "")}</textarea></label>
          <button class="delete-button" type="button" data-delete-lit="${escapeHtml(row.id)}">×</button>
        </article>
      `,
    )
    .join("");
}

function addLiteratureRow() {
  state.literatureMatrix = state.literatureMatrix || [];
  state.literatureMatrix.push({
    id: crypto.randomUUID(),
    source: "",
    theory: "",
    method: "",
    finding: "",
    relevance: "",
  });
  persist();
  renderLiteratureMatrix();
}

function updateLiteratureRow(rowId, field, value) {
  const row = state.literatureMatrix.find((item) => item.id === rowId);
  if (!row) return;
  row[field] = value;
  schedulePersist();
}

function deleteLiteratureRow(rowId) {
  state.literatureMatrix = state.literatureMatrix.filter((item) => item.id !== rowId);
  persist();
  renderLiteratureMatrix();
}

function clampZoom(value) {
  return Math.min(170, Math.max(70, Math.round(value || defaultZoom)));
}

function fontStack(value) {
  const map = {
    "Times New Roman": '"Times New Roman", Times, serif',
    Georgia: 'Georgia, "Times New Roman", serif',
    Cambria: 'Cambria, Georgia, serif',
    Garamond: 'Garamond, Baskerville, serif',
    Palatino: '"Palatino Linotype", Palatino, "Book Antiqua", serif',
    Arial: 'Arial, Helvetica, sans-serif',
    Calibri: 'Calibri, "Trebuchet MS", Arial, sans-serif',
  };
  return map[value] || map[defaultFontFamily];
}

function applyDocumentAppearance(doc = activeDocument()) {
  const zoom = clampZoom(doc.zoom);
  const zoomScale = zoom / 100;
  els.editor.style.setProperty("--doc-font-family", fontStack(doc.fontFamily));
  els.editor.style.setProperty("--doc-font-size", `${Number(doc.fontSize) * zoomScale}px`);
  els.editor.style.setProperty("--doc-line-height", String(doc.lineHeight || defaultLineHeight));
  els.editor.style.setProperty("--doc-page-width", `${Math.round(880 * zoomScale)}px`);
  els.editor.style.setProperty("--doc-page-padding", `${Math.round(56 * zoomScale)}px`);
  if (els.zoomLevelLabel) {
    els.zoomLevelLabel.textContent = `${zoom}%`;
  }
}

function renderFormattingToolbar(doc = activeDocument()) {
  if (els.fontFamilySelect) els.fontFamilySelect.value = doc.fontFamily || defaultFontFamily;
  if (els.fontSizeSelect) els.fontSizeSelect.value = String(doc.fontSize || defaultFontSize);
  if (els.lineHeightSelect) els.lineHeightSelect.value = String(doc.lineHeight || defaultLineHeight);
  if (els.textAlignSelect) els.textAlignSelect.value = "justifyLeft";
}

function ensureHeadingAnchors() {
  Array.from(els.editor.querySelectorAll("h2, h3, h4"))
    .filter((heading) => !heading.closest("[data-bibliography-section='true']"))
    .forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `section-${index + 1}-${slugify(heading.textContent || "section")}`;
    }
  });
}

function renderOutline() {
  if (!els.outlineList) return;
  ensureHeadingAnchors();
  const headings = Array.from(els.editor.querySelectorAll("h2, h3, h4")).filter(
    (heading) => !heading.closest("[data-bibliography-section='true']"),
  );
  if (!headings.length) {
    els.outlineList.innerHTML =
      '<div class="outline-empty">Use headings to build a navigable chapter outline.</div>';
    return;
  }

  els.outlineList.innerHTML = headings
    .map(
      (heading) => `
        <button
          class="outline-item depth-${heading.tagName === "H4" ? "4" : heading.tagName === "H3" ? "3" : "2"}"
          type="button"
          data-outline-target="${escapeAttribute(heading.id)}"
        >
          <span>${escapeHtml(heading.textContent.trim() || "Untitled section")}</span>
          <small>${heading.tagName}</small>
        </button>
      `,
    )
    .join("");
}

function renderFocusMode() {
  const focusMode = Boolean(state.ui?.focusMode);
  document.body.classList.toggle("focus-mode", focusMode);
  if (els.focusModeButton) {
    els.focusModeButton.textContent = focusMode ? "Show sidebars" : "Hide sidebars";
  }
}

function renderEditor() {
  const doc = activeDocument();
  els.docTitle.value = doc.title;
  els.docStatus.value = doc.status || "Draft";
  if (els.projectMode) {
    els.projectMode.value = state.project?.mode || "thesis";
  }
  if (els.citationStyleSelect) els.citationStyleSelect.value = doc.style || "apa";
  els.editor.innerHTML = doc.content;
  ensureHeadingAnchors();
  applyDocumentAppearance(doc);
  renderFormattingToolbar(doc);
  syncCitationTokens();
  syncBibliographySection();
}

function renderApp() {
  renderFocusMode();
  renderDocuments();
  renderEditor();
  renderOutline();
  renderGithubState();
  renderZoteroState();
  renderZoteroResults();
  renderProjectPlan();
  updateMetrics();
  renderSelectionCitations();
  scheduleFocusHighlights();
  renderReferences();
  renderSourceChecks();
  runChecks();
}

function captureCurrentDocument() {
  const doc = activeDocument();
  doc.title = els.docTitle.value.trim() || "Untitled";
  doc.status = els.docStatus.value || "Draft";
  syncReferencesFromDocument();
  doc.content = htmlWithoutFocusMarks();
  doc.fontFamily = els.fontFamilySelect?.value || doc.fontFamily || defaultFontFamily;
  doc.fontSize = Number(els.fontSizeSelect?.value) || doc.fontSize || defaultFontSize;
  doc.lineHeight = Number(els.lineHeightSelect?.value) || doc.lineHeight || defaultLineHeight;
  doc.zoom = clampZoom(doc.zoom);
  doc.updatedAt = Date.now();
  return doc;
}

function saveCurrentDocument() {
  captureCurrentDocument();
  persist();
}

function renderGithubState() {
  if (!els.githubRepoInput || !els.githubSyncMessage) return;
  els.githubRepoInput.value = state.githubRepoUrl || "";
  if (els.githubBranchInput) {
    els.githubBranchInput.value = state.githubBranch || defaultGithubBranch;
  }
  if (els.githubTokenInput) {
    els.githubTokenInput.value = state.githubToken || "";
  }
  const syncMode = state.githubToken ? "Browser sync" : "Local helper";
  const linked = Boolean(state.githubRepoUrl);
  if (els.githubModeBadge) {
    els.githubModeBadge.textContent = linked ? syncMode : "Not linked";
    els.githubModeBadge.classList.toggle("connected", linked);
  }
  if (els.githubDetail) {
    const lastNote = state.githubLastSyncAt
      ? `Last ${state.githubLastAction || "sync"} at ${new Date(state.githubLastSyncAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}.`
      : "No sync run yet.";
    els.githubDetail.textContent = linked
      ? `${syncMode} on branch ${state.githubBranch || defaultGithubBranch}. ${lastNote}`
      : "Connect a repository to keep this project in sync.";
  }
  els.githubSyncMessage.textContent = linked
    ? state.githubToken
      ? "This draft can now push and pull through GitHub directly in the browser."
      : "This draft can use the optional local helper for automatic pushes every 110 seconds."
    : "Link a private repository. Add a token for browser sync across devices, or use the optional local sync helper.";
  if (els.githubButton) {
    els.githubButton.textContent = linked ? "GitHub settings" : "Connect GitHub";
  }
}

function renderZoteroState() {
  if (!els.zoteroLibraryType) return;
  const zotero = state.zotero || {};
  els.zoteroLibraryType.value = zotero.libraryType || "users";
  els.zoteroLibraryId.value = zotero.libraryId || "";
  els.zoteroApiKey.value = zotero.apiKey || "";
  els.zoteroSearchInput.value = zotero.searchQuery || "";
  els.zoteroStatus.textContent = zotero.libraryId
    ? zotero.apiKey
      ? "Connected to a private Zotero library."
      : "Connected to a public Zotero library."
    : "Connect a public library with its user or group ID, or add an API key for a private library.";
}

function renderTheme() {
  document.body.dataset.theme = state.theme === "day" ? "day" : "night";
  if (els.themeToggleButton) {
    els.themeToggleButton.textContent =
      state.theme === "day" ? "Dark mode off" : "Dark mode on";
  }
}

function closeMenu(menu, button) {
  if (!menu || !button) return;
  menu.hidden = true;
  button.setAttribute("aria-expanded", "false");
}

function openMenu(menu, button) {
  if (!menu || !button) return;
  menu.hidden = false;
  button.setAttribute("aria-expanded", "true");
}

function toggleMenu(menu, button) {
  if (!menu || !button) return;
  const willOpen = menu.hidden;
  closeFloatingMenus();
  if (willOpen) openMenu(menu, button);
}

function closeFloatingMenus() {
  closeMenu(els.workspaceMenu, els.workspaceMenuButton);
  closeMenu(els.textToolsMenu, els.textToolsButton);
  closeMenu(els.githubActionsMenu, els.githubActionsButton);
}

function toggleTheme() {
  state.theme = state.theme === "day" ? "night" : "day";
  renderTheme();
  persist();
}

function setGithubStatus(message) {
  if (els.githubSyncMessage) {
    els.githubSyncMessage.textContent = message;
  }
}

function noteGithubSync(action) {
  state.githubLastAction = action;
  state.githubLastSyncAt = new Date().toISOString();
  persist();
  renderGithubState();
}

async function saveGithubRepo() {
  const repoUrl = els.githubRepoInput.value.trim();
  const branch = els.githubBranchInput?.value.trim() || defaultGithubBranch;
  const token = els.githubTokenInput?.value.trim() || "";
  if (!repoUrl) {
    state.githubRepoUrl = "";
    state.githubBranch = defaultGithubBranch;
    state.githubToken = "";
    state.githubLastSyncAt = "";
    state.githubLastAction = "";
    persist();
    renderGithubState();
    return;
  }

  state.githubRepoUrl = repoUrl;
  state.githubBranch = branch;
  state.githubToken = token;
  persist();
  renderGithubState();
  await sendGithubConfig();
  await sendGithubSnapshot("manual");
  scheduleGithubSnapshots();
}

function clearGithubRepo() {
  state.githubRepoUrl = "";
  state.githubBranch = defaultGithubBranch;
  state.githubToken = "";
  state.githubLastSyncAt = "";
  state.githubLastAction = "";
  clearInterval(githubSnapshotTimer);
  persist();
  renderGithubState();
  setGithubStatus("GitHub connection removed from this browser.");
}

function toggleFocusMode() {
  state.ui.focusMode = !state.ui.focusMode;
  renderFocusMode();
  persist();
}

function scheduleEditorAnalysis() {
  clearTimeout(analysisTimer);
  analysisTimer = setTimeout(() => {
    analysisTimer = null;
    renderDocuments();
    renderOutline();
    renderReferences();
    renderSourceChecks();
    runChecks();
    renderSelectionCitations();
    scheduleFocusHighlights();
    scheduleLiveAcademicSearch();
  }, 180);
}

function createNewDocument() {
  flushPersist();
  const doc = createDocument();
  state.documents.push(doc);
  activeId = doc.id;
  renderApp();
  persist();
  els.editor.focus();
}

function openFolderPanel() {
  els.folderInlinePanel.hidden = false;
  els.folderNameInput?.focus();
}

function commandItems() {
  return [
    {
      id: "new-draft",
      label: "New draft",
      hint: "Create a blank academic document",
      run: createNewDocument,
    },
    {
      id: "new-folder",
      label: "New folder",
      hint: "Create a folder for chapters or articles",
      run: openFolderPanel,
    },
    {
      id: "focus-mode",
      label: state.ui?.focusMode ? "Show sidebars" : "Hide sidebars",
      hint: "Toggle the library and research panels while you write",
      run: toggleFocusMode,
    },
    {
      id: "toggle-theme",
      label: state.theme === "day" ? "Turn dark mode on" : "Turn dark mode off",
      hint: "Switch the writing surface theme",
      run: toggleTheme,
    },
    {
      id: "insert-citation",
      label: "Insert citation",
      hint: "Use the best current source suggestion",
      run: quickInsertCitation,
    },
    {
      id: "search-sources",
      label: "Search sources",
      hint: "Jump to source search for the current topic",
      run: () => {
        activateTab("references");
        document.querySelector("#referenceSearch")?.focus();
      },
    },
    {
      id: "search-zotero",
      label: "Search Zotero",
      hint: "Search your Zotero library from the current text",
      run: () => {
        activateTab("sources");
        els.zoteroSearchInput?.focus();
      },
    },
    {
      id: "export-doc",
      label: "Export Word",
      hint: "Download the current draft as a Word-compatible document",
      run: exportDoc,
    },
    {
      id: "push-github",
      label: "Push project now",
      hint: "Send the latest project snapshot to GitHub",
      run: () => sendGithubSnapshot("manual"),
    },
    {
      id: "pull-github",
      label: "Pull latest project",
      hint: "Load the newest project snapshot from GitHub",
      run: pullGithubSnapshot,
    },
  ];
}

function renderCommandResults(filter = "") {
  if (!els.commandResults) return;
  const query = filter.trim().toLowerCase();
  const items = commandItems().filter((item) =>
    !query ||
    item.label.toLowerCase().includes(query) ||
    item.hint.toLowerCase().includes(query) ||
    item.id.includes(query.replace(/\s+/g, "-")),
  );

  els.commandResults.innerHTML = items
    .map(
      (item) => `
        <button class="command-item" type="button" data-command-id="${escapeAttribute(item.id)}">
          <span>${escapeHtml(item.label)}</span>
          <small>${escapeHtml(item.hint)}</small>
        </button>
      `,
    )
    .join("") || '<div class="outline-empty">No actions matched that search.</div>';
}

function openCommandPalette() {
  if (!els.commandPalette) return;
  closeFloatingMenus();
  els.commandPalette.hidden = false;
  renderCommandResults("");
  if (els.commandInput) {
    els.commandInput.value = "";
    els.commandInput.focus();
  }
}

function closeCommandPalette() {
  if (!els.commandPalette) return;
  els.commandPalette.hidden = true;
}

function runCommand(commandId) {
  const item = commandItems().find((entry) => entry.id === commandId);
  if (!item) return;
  closeCommandPalette();
  item.run();
}

function scheduleGithubSnapshots() {
  clearInterval(githubSnapshotTimer);
  if (!state.githubRepoUrl) return;
  githubSnapshotTimer = setInterval(() => {
    sendGithubSnapshot("auto");
  }, 110000);
}

function githubPayload(reason = "auto") {
  saveCurrentDocument();
  return {
    reason,
    repoUrl: state.githubRepoUrl,
    branch: state.githubBranch || defaultGithubBranch,
    activeId,
    folders: state.folders,
    project: state.project,
    literatureMatrix: state.literatureMatrix,
    theme: state.theme,
    zotero: state.zotero,
    documents: state.documents.map((doc) => ({
      ...doc,
      plainText: stripHtml(doc.content),
    })),
    exportedAt: new Date().toISOString(),
  };
}

function githubSnapshotSignature(payload) {
  return JSON.stringify({
    activeId: payload.activeId,
    theme: payload.theme,
    folders: payload.folders,
    project: payload.project,
    literatureMatrix: payload.literatureMatrix,
    documents: payload.documents.map((doc) => ({
      id: doc.id,
      title: doc.title,
      style: doc.style,
      status: doc.status,
      content: doc.content,
      references: doc.references,
      manualReferences: doc.manualReferences,
      folderId: doc.folderId,
      fontFamily: doc.fontFamily,
      fontSize: doc.fontSize,
      lineHeight: doc.lineHeight,
      zoom: doc.zoom,
    })),
  });
}

function parseGithubRepo(value) {
  const text = String(value || "").trim();
  const httpsMatch = text.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?$/i);
  if (httpsMatch) {
    return { owner: httpsMatch[1], repo: httpsMatch[2] };
  }
  const sshMatch = text.match(/^git@github\.com:([^/]+)\/([^/]+?)(?:\.git)?$/i);
  if (sshMatch) {
    return { owner: sshMatch[1], repo: sshMatch[2] };
  }
  return null;
}

function encodeBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function decodeBase64(text) {
  const binary = atob(text);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function githubFilePath() {
  return "github-export/project-state.json";
}

function githubApiHeaders() {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${state.githubToken}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function githubApiUrl(pathName) {
  const repo = parseGithubRepo(state.githubRepoUrl);
  if (!repo) return "";
  const safePath = String(pathName).split("/").map(encodeURIComponent).join("/");
  return `https://api.github.com/repos/${repo.owner}/${repo.repo}/contents/${safePath}`;
}

async function sendGithubConfig() {
  if (!state.githubRepoUrl) return;
  if (state.githubToken) return;
  try {
    const response = await fetch(`${githubSyncEndpoint}/config`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        repoUrl: state.githubRepoUrl,
        branch: state.githubBranch || defaultGithubBranch,
      }),
    });
    const result = await response.json();
    setGithubStatus(result.message || "GitHub repository linked.");
  } catch {
    setGithubStatus("GitHub helper is not running. Start it with: node sync-server.js");
  }
}

async function sendGithubSnapshot(reason = "auto") {
  if (!state.githubRepoUrl) return;
  const payload = githubPayload(reason);
  const signature = githubSnapshotSignature(payload);
  if (reason === "auto" && signature === lastGithubPushSignature) return;

  try {
    if (state.githubToken) {
      setGithubStatus("Pushing project snapshot to GitHub...");
      const message = await sendGithubSnapshotViaApi(payload);
      lastGithubPushSignature = signature;
      noteGithubSync("push");
      setGithubStatus(message);
      return;
    }

    setGithubStatus("Sending snapshot to the local sync helper...");
    const response = await fetch(`${githubSyncEndpoint}/snapshot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    lastGithubPushSignature = signature;
    noteGithubSync("push");
    setGithubStatus(
      result.message ||
      `Snapshot handled at ${new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}.`,
    );
  } catch (error) {
    setGithubStatus(githubSyncFailureMessage(error));
  }
}

async function pullGithubSnapshot() {
  if (!state.githubRepoUrl) return;
  try {
    if (state.githubToken) {
      setGithubStatus("Pulling latest GitHub snapshot...");
      const snapshot = await pullGithubSnapshotViaApi();
      applyGithubSnapshot(snapshot);
      noteGithubSync("pull");
      setGithubStatus("Pulled latest GitHub snapshot.");
      return;
    }

    setGithubStatus("Pulling latest GitHub snapshot...");
    const response = await fetch(`${githubSyncEndpoint}/pull`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        repoUrl: state.githubRepoUrl,
        branch: state.githubBranch || defaultGithubBranch,
      }),
    });
    const result = await response.json();
    if (!result.ok) throw new Error(result.message || "Pull failed");
    if (result.snapshot) {
      applyGithubSnapshot(result.snapshot);
    }
    noteGithubSync("pull");
    setGithubStatus(result.message || "Pulled latest GitHub snapshot.");
  } catch (error) {
    setGithubStatus(githubSyncFailureMessage(error));
  }
}

async function sendGithubSnapshotViaApi(payload) {
  const repo = parseGithubRepo(state.githubRepoUrl);
  if (!repo) throw new Error("Use a valid GitHub repository URL.");

  const pathName = githubFilePath();
  const url = `${githubApiUrl(pathName)}?ref=${encodeURIComponent(state.githubBranch || defaultGithubBranch)}`;
  let sha = "";

  const existingResponse = await fetch(url, {
    headers: githubApiHeaders(),
  });
  if (existingResponse.ok) {
    const existing = await existingResponse.json();
    sha = existing.sha || "";
  } else if (existingResponse.status !== 404) {
    const errorPayload = await existingResponse.json().catch(() => ({}));
    throw new Error(errorPayload.message || "GitHub could not read the current project snapshot.");
  }

  const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
  const body = {
    message: `Sync Vellum Atelier project (${payload.reason}, ${timestamp})`,
    content: encodeBase64(JSON.stringify(payload, null, 2)),
    branch: state.githubBranch || defaultGithubBranch,
    committer: {
      name: "Vellum Atelier",
      email: "phd-writer@example.local",
    },
  };
  if (sha) body.sha = sha;

  const response = await fetch(githubApiUrl(pathName), {
    method: "PUT",
    headers: {
      ...githubApiHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message || "GitHub rejected the snapshot write.");
  }
  return "Pushed project snapshot to GitHub.";
}

async function pullGithubSnapshotViaApi() {
  const response = await fetch(
    `${githubApiUrl(githubFilePath())}?ref=${encodeURIComponent(state.githubBranch || defaultGithubBranch)}`,
    {
      headers: githubApiHeaders(),
    },
  );
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message || "GitHub could not load the project snapshot.");
  }
  if (!result.content) {
    throw new Error("The repository does not have a saved project snapshot yet.");
  }
  return JSON.parse(decodeBase64(String(result.content).replace(/\n/g, "")));
}

function githubSyncFailureMessage(error) {
  const message = String(error?.message || error || "").trim();
  if (message.includes("Bad credentials")) {
    return "GitHub rejected the token. Use a fine-grained token with Contents access to this repository.";
  }
  if (message.includes("Resource not accessible by personal access token")) {
    return "That GitHub token cannot write to this repository. Check its repository access and Contents permission.";
  }
  if (message.includes("Could not reach")) {
    return message;
  }
  return message || "GitHub sync failed.";
}

function applyGithubSnapshot(snapshot) {
  if (!snapshot.documents?.length) return;
  state.folders = snapshot.folders || state.folders;
  state.documents = snapshot.documents.map((doc) => createDocument(doc));
  state.project = snapshot.project || state.project;
  state.literatureMatrix = snapshot.literatureMatrix || state.literatureMatrix;
  state.theme = snapshot.theme || state.theme;
  state.zotero = snapshot.zotero || state.zotero;
  activeId = snapshot.activeId && state.documents.some((doc) => doc.id === snapshot.activeId)
    ? snapshot.activeId
    : state.documents[0].id;
  lastGithubPushSignature = githubSnapshotSignature(snapshot);
  persist();
  renderApp();
  renderTheme();
}

function textFromEditor() {
  return els.editor.innerText.replace(/\u00a0/g, " ").trim();
}

function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.innerText || "";
}

function countWords(text) {
  return (text.match(/\b[\w'-]+\b/g) || []).length;
}

function updateMetrics() {
  const text = textFromEditor();
  const words = countWords(text);
  const citations = els.editor.querySelectorAll(".citation-token").length
    ? Array.from(els.editor.querySelectorAll(".citation-token"))
    : text.match(/\([A-Z][A-Za-z-]+(?: et al\.)?, \d{4}\)/g) || [];
  const topic = detectTopic(text);

  els.wordCount.textContent = String(words);
  els.charCount.textContent = String(text.length);
  els.citationCount.textContent = String(citations.length);
  els.topicLabel.textContent = topic ? `Topic: ${topic}` : "Topic: waiting for text";
  els.referenceTopic.textContent = topic || "Start writing";
  renderFocusOptions(text);
}

function currentParagraphText() {
  const selection = window.getSelection();
  const node = selection?.anchorNode;
  const element = node?.nodeType === Node.TEXT_NODE ? node.parentElement : node;
  const block = element?.closest?.("p, li, blockquote, h1, h2, h3, h4, h5");

  if (block && els.editor.contains(block)) {
    return block.innerText.replace(/\s+/g, " ").trim();
  }

  const paragraphs = textFromEditor()
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
  return paragraphs.at(-1) || "";
}

function detectTopic(text) {
  const scored = focusScores(text);

  return scored[0]?.score > 0 ? scored[0].topic : "";
}

function focusScores(text) {
  const lower = text.toLowerCase();
  const rawScores = topicKeywords
    .map((topic) => {
      const words = topic.split(/\s+/);
      const triggers = [];
      let score = 0;

      if (lower.includes(topic)) {
        score += 7;
        triggers.push(topic);
      }

      words.forEach((word) => {
        if (word.length > 3 && lower.includes(word)) {
          score += word.length > 6 ? 3 : 1;
          triggers.push(word);
        }
      });

      referenceCorpus.forEach((ref) => {
        if (ref.topics.includes(topic)) {
          ref.topics.forEach((refTopic) => {
            if (lower.includes(refTopic)) {
              score += 2;
              triggers.push(refTopic);
            }
          });
        }
      });

      return {
        topic,
        score,
        triggers: Array.from(new Set(triggers)).slice(0, 5),
      };
    })
    .sort((a, b) => b.score - a.score);

  const total = rawScores.reduce((sum, item) => sum + item.score, 0);
  return rawScores.slice(0, 5).map((item) => ({
    ...item,
    percentage: total ? Math.round((item.score / total) * 100) : 0,
  }));
}

function renderFocusOptions(text) {
  const options = focusScores(text);
  els.focusOptions.innerHTML = options
    .map((option) => {
      const triggerText = option.triggers.length
        ? `Triggered by: ${option.triggers.join(", ")}`
        : "No direct trigger yet";
      return `
        <article class="focus-option">
          <div class="focus-option-title">
            <span>${escapeHtml(option.topic)}</span>
            <span>${option.percentage}%</span>
          </div>
          <div class="focus-bar" aria-hidden="true">
            <span style="width: ${option.percentage}%"></span>
          </div>
          <div class="focus-triggers">${escapeHtml(triggerText)}</div>
        </article>
      `;
    })
    .join("");
}

function scheduleFocusHighlights() {
  clearTimeout(highlightTimer);
  highlightTimer = setTimeout(applyFocusHighlights, 250);
}

function applyFocusHighlights() {
  const text = textFromEditor();
  const terms = focusScores(text)
    .filter((option) => option.score > 0)
    .flatMap((option) => option.triggers)
    .filter((term) => term.length > 4)
    .sort((a, b) => b.length - a.length);

  const uniqueTerms = Array.from(new Set(terms)).slice(0, 12);
  const caretOffset = getCaretOffset();
  clearFocusHighlights();

  if (uniqueTerms.length) {
    highlightTerms(uniqueTerms);
  }

  restoreCaretOffset(caretOffset);
}

function htmlWithoutFocusMarks() {
  const clone = els.editor.cloneNode(true);
  clone.querySelectorAll("mark.topic-trigger").forEach((mark) => {
    mark.replaceWith(document.createTextNode(mark.textContent));
  });
  return clone.innerHTML;
}

function clearFocusHighlights() {
  els.editor.querySelectorAll("mark.topic-trigger").forEach((mark) => {
    mark.replaceWith(document.createTextNode(mark.textContent));
  });
  els.editor.normalize();
}

function highlightTerms(terms) {
  const pattern = new RegExp(`\\b(${terms.map(escapeRegExp).join("|")})\\b`, "gi");
  const walker = document.createTreeWalker(els.editor, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (node.parentElement?.closest("mark.topic-trigger")) return NodeFilter.FILTER_REJECT;
      if (node.parentElement?.closest(".citation-token,[data-bibliography-section='true']")) {
        return NodeFilter.FILTER_REJECT;
      }
      pattern.lastIndex = 0;
      return pattern.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    pattern.lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    node.nodeValue.replace(pattern, (match, _term, index) => {
      if (index > lastIndex) {
        fragment.append(document.createTextNode(node.nodeValue.slice(lastIndex, index)));
      }
      const mark = document.createElement("mark");
      mark.className = "topic-trigger";
      mark.textContent = match;
      fragment.append(mark);
      lastIndex = index + match.length;
      return match;
    });
    if (lastIndex < node.nodeValue.length) {
      fragment.append(document.createTextNode(node.nodeValue.slice(lastIndex)));
    }
    node.replaceWith(fragment);
  });
}

function getCaretOffset() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || !els.editor.contains(selection.anchorNode)) {
    return null;
  }

  const range = selection.getRangeAt(0).cloneRange();
  range.selectNodeContents(els.editor);
  range.setEnd(selection.anchorNode, selection.anchorOffset);
  return range.toString().length;
}

function restoreCaretOffset(offset) {
  if (offset === null) return;

  const walker = document.createTreeWalker(els.editor, NodeFilter.SHOW_TEXT);
  let remaining = offset;
  let node = null;

  while (walker.nextNode()) {
    node = walker.currentNode;
    if (remaining <= node.nodeValue.length) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.setStart(node, remaining);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
      return;
    }
    remaining -= node.nodeValue.length;
  }

  if (node) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(node, node.nodeValue.length);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function slugify(value) {
  return String(value || "section")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "section";
}

function suggestedReferences() {
  const text = textFromEditor().toLowerCase();
  const topic = detectTopic(text);
  return referenceCorpus
    .map((ref) => {
      const topicScore = ref.topics.reduce((sum, item) => {
        if (topic && item.includes(topic)) return sum + 8;
        if (text.includes(item)) return sum + 5;
        return sum + item.split(/\s+/).filter((word) => word.length > 3 && text.includes(word)).length;
      }, 0);
      return { ref, score: topicScore };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((item) => item.ref);
}

function allKnownReferences() {
  const refs = [
    ...referenceCorpus,
    ...Object.values(state.customReferences || {}),
    ...visibleReferences,
    ...liveCrosscheckReferences,
    ...zoteroReferences,
  ];
  return Array.from(new Map(refs.map((ref) => [ref.id, ref])).values());
}

function renderReferences(list = suggestedReferences()) {
  visibleReferences = list;
  els.referenceList.innerHTML = "";
  if (list.length === 0) {
    els.referenceList.innerHTML =
      '<div class="reference-card"><h3>No suggestions yet</h3><p>Write a few sentences about your topic and I will suggest art education references.</p></div>';
    return;
  }

  list.forEach((ref) => {
    const card = document.createElement("article");
    card.className = "reference-card";
    card.innerHTML = `
      <p class="reference-meta">${escapeHtml(ref.source)} · ${ref.year}</p>
      <h3>${escapeHtml(ref.title)}</h3>
      <p>${escapeHtml(referenceAuthors(ref).join(", "))}</p>
      <p>${escapeHtml(ref.abstract || "Metadata result from an academic source.")}</p>
      <div class="reference-actions">
        <button type="button" data-cite="${escapeHtml(ref.id)}">Cite</button>
        <button type="button" data-add="${escapeHtml(ref.id)}">Add bibliography</button>
        <a href="${escapeAttribute(ref.url)}" target="_blank" rel="noreferrer">Open</a>
      </div>
    `;
    els.referenceList.appendChild(card);
  });
}

function referenceAuthors(ref) {
  if (Array.isArray(ref.authors) && ref.authors.length) return ref.authors;
  if (Array.isArray(ref.creators) && ref.creators.length) {
    return ref.creators
      .map((creator) => {
        if (creator.name) return creator.name;
        return [creator.firstName, creator.lastName].filter(Boolean).join(" ").trim();
      })
      .filter(Boolean);
  }
  return ["Unknown"];
}

function surnameFromAuthor(author) {
  const text = String(author || "").trim();
  if (!text) return "Unknown";
  if (text.includes(",")) return text.split(",")[0].trim();
  return text.split(/\s+/).at(-1) || text;
}

function initialsFromAuthor(author) {
  const text = String(author || "").trim();
  const [firstPart, secondPart] = text.includes(",")
    ? text.split(",").map((part) => part.trim())
    : [surnameFromAuthor(text), text.split(/\s+/).slice(0, -1).join(" ")];
  const initials = String(secondPart || "")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}.`)
    .join(" ");
  return initials ? `${firstPart}, ${initials}` : firstPart;
}

function referenceYear(ref) {
  return String(ref.year || ref.date || "n.d.");
}

function usesNumericCitations(style = activeDocument().style) {
  return style === "ieee" || style === "vancouver";
}

function referenceNumber(ref, doc = activeDocument()) {
  const order = Array.from(new Set([...(doc.references || []), ...(doc.manualReferences || [])]));
  const index = order.indexOf(ref.id);
  return index >= 0 ? index + 1 : order.length + 1;
}

function citationText(ref, style = activeDocument().style) {
  if (!usesNumericCitations(style) && ref.formattedCitationByStyle?.[style]) {
    return stripTags(ref.formattedCitationByStyle[style]).trim();
  }
  const authorList = referenceAuthors(ref);
  const first = surnameFromAuthor(authorList[0]);
  const year = referenceYear(ref);
  const authorLabel = authorList.length > 2 ? `${first} et al.` : first;
  if (usesNumericCitations(style)) return `[${referenceNumber(ref)}]`;
  if (style === "mla") return `(${authorLabel})`;
  if (style === "chicago") return `(${authorLabel} ${year})`;
  if (style === "harvard") return `(${authorLabel} ${year})`;
  return `(${authorLabel}, ${year})`;
}

function referenceLink(ref) {
  return ref.doi
    ? `https://doi.org/${String(ref.doi).replace(/^https?:\/\/doi\.org\//i, "")}`
    : ref.url || "";
}

function bibliographyText(ref, style = activeDocument().style) {
  if (ref.formattedByStyle?.[style]) {
    return ref.formattedByStyle[style];
  }

  const authors = referenceAuthors(ref);
  const year = referenceYear(ref);
  const title = escapeHtml(ref.title || "Untitled");
  const journal = escapeHtml(ref.journal || ref.publicationTitle || ref.source || "");
  const volumeIssue = [ref.volume, ref.issue ? `(${ref.issue})` : ""].filter(Boolean).join("");
  const pages = ref.pages ? `, ${escapeHtml(ref.pages)}` : "";
  const link = referenceLink(ref);
  const suffix = link ? ` ${escapeHtml(link)}.` : journal ? "." : "";

  if (style === "mla") {
    const authorText = authors.map(initialsFromAuthor).join(", ");
    return `${authorText}. <em>${title}</em>${publisher ? `. ${publisher}` : ""}, ${year}${link ? `. ${escapeHtml(link)}` : ""}.`;
  }

  if (style === "ieee") {
    const authorText = authors.join(", ");
    return `${authorText}, "${title}," ${journal ? `<em>${journal}</em>, ` : ""}${year}${link ? `. ${escapeHtml(link)}` : ""}.`;
  }

  if (style === "vancouver") {
    const authorText = authors.join(", ");
    return `${authorText}. ${title}. ${journal || publisher}${year ? `. ${year}` : ""}${link ? `. ${escapeHtml(link)}` : ""}.`;
  }

  if (ref.itemType === "journalArticle" || journal) {
    const authorText = style === "harvard"
      ? authors.map(initialsFromAuthor).join(" and ")
      : authors.map(initialsFromAuthor).join(", ");
    if (style === "harvard" || style === "chicago") {
      return `${authorText} ${year}, "${title}," <em>${journal}</em>${volumeIssue ? `, ${escapeHtml(volumeIssue)}` : ""}${pages}${suffix}`;
    }
    return `${authorText} (${year}). ${title}. <em>${journal}</em>${volumeIssue ? `, ${escapeHtml(volumeIssue)}` : ""}${pages}${suffix}`;
  }

  const authorText = style === "harvard"
    ? authors.map(initialsFromAuthor).join(" and ")
    : authors.map(initialsFromAuthor).join(", ");
  const publisher = escapeHtml(ref.publisher || ref.source || "");

  if (style === "harvard" || style === "chicago") {
    return `${authorText} ${year}, <em>${title}</em>${publisher ? `. ${publisher}` : ""}${suffix}`;
  }
  return `${authorText}. (${year}). <em>${title}</em>${publisher ? `. ${publisher}` : ""}${suffix}`;
}

function formatCitation(ref, style = activeDocument().style) {
  return citationText(ref, style);
}

function formatBibliography(ref, style = activeDocument().style) {
  const text = bibliographyText(ref, style);
  if (style === "ieee") {
    return `[${referenceNumber(ref)}] ${text}`;
  }
  if (style === "vancouver") {
    return `${referenceNumber(ref)}. ${text}`;
  }
  return text;
}

function bibliographyHeading(style = activeDocument().style) {
  if (style === "mla") return "Works Cited";
  if (style === "chicago") return "Bibliography";
  return "References";
}

function insertAtCaret(html) {
  els.editor.focus();
  const selection = window.getSelection();
  if (!selection.rangeCount) {
    els.editor.insertAdjacentHTML("beforeend", html);
    return;
  }
  const range = selection.getRangeAt(0);
  range.deleteContents();
  const fragment = range.createContextualFragment(html);
  range.insertNode(fragment);
  selection.collapseToEnd();
}

function restoreSavedSelection() {
  if (!lastSelection) return;
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(lastSelection);
}

function citationTokenMarkup(ref) {
  return `<span class="citation-token" contenteditable="false" data-ref-id="${escapeAttribute(ref.id)}">${escapeHtml(formatCitation(ref))}</span>`;
}

function syncReferencesFromDocument() {
  const doc = activeDocument();
  const tokenRefs = Array.from(
    new Set(
      Array.from(els.editor.querySelectorAll(".citation-token"))
        .map((token) => token.dataset.refId)
        .filter(Boolean),
    ),
  );
  doc.references = Array.from(new Set([...tokenRefs, ...(doc.manualReferences || [])]));
}

function syncCitationTokens() {
  els.editor.querySelectorAll(".citation-token").forEach((token) => {
    const ref = lookupReference(token.dataset.refId);
    if (!ref) return;
    token.textContent = formatCitation(ref);
  });
}

function syncBibliographySection() {
  const caretOffset = getCaretOffset();
  syncReferencesFromDocument();
  const doc = activeDocument();
  els.editor.querySelectorAll("[data-bibliography-break='true'], [data-bibliography-section='true']").forEach((node) => node.remove());

  if (!doc.references?.length) {
    restoreCaretOffset(caretOffset);
    return;
  }

  const breakEl = document.createElement("div");
  breakEl.className = "page-break";
  breakEl.dataset.bibliographyBreak = "true";
  breakEl.contentEditable = "false";
  breakEl.textContent = bibliographyHeading(doc.style);

  const section = document.createElement("section");
  section.className = "bibliography-page";
  section.dataset.bibliographySection = "true";
  section.contentEditable = "false";
  section.innerHTML = `
    <h2>${bibliographyHeading(doc.style)}</h2>
    <div class="bibliography-list">
      ${doc.references
        .map((id) => lookupReference(id))
        .filter(Boolean)
        .map((item) => `<p class="bibliography-entry">${formatBibliography(item, doc.style)}</p>`)
        .join("")}
    </div>
  `;

  els.editor.append(breakEl, section);
  restoreCaretOffset(caretOffset);
}

function insertCitationForReference(ref) {
  if (!ref) return;
  state.customReferences[ref.id] = ref;
  restoreSavedSelection();
  insertAtCaret(`${citationTokenMarkup(ref)} `);
  syncCitationTokens();
  syncBibliographySection();
  saveCurrentDocument();
  updateMetrics();
  renderSelectionCitations();
  renderSourceChecks();
}

function addBibliography(ref) {
  if (!ref) return;
  state.customReferences[ref.id] = ref;
  const doc = activeDocument();
  doc.manualReferences = Array.from(new Set([...(doc.manualReferences || []), ref.id]));
  doc.references = Array.from(new Set([...(doc.references || []), ref.id]));
  syncBibliographySection();
  saveCurrentDocument();
  updateMetrics();
}

function lookupReference(id) {
  return (
    referenceCorpus.find((item) => item.id === id) ||
    visibleReferences.find((item) => item.id === id) ||
    liveCrosscheckReferences.find((item) => item.id === id) ||
    zoteroReferences.find((item) => item.id === id) ||
    state.customReferences[id]
  );
}

function bestReferencesForSelection(text) {
  if (!text || countWords(text) < 2) return [];
  return sourceMatchesForText(text).slice(0, 4).map((item) => item.ref);
}

function renderSelectionCitations(text = getSelectedText()) {
  if (!els.selectionPreview || !els.selectionCitationList) return;
  if (!text) {
    els.selectionPreview.textContent =
      "Select a sentence or phrase in the editor. Right-click to cite it, or use the suggestions here.";
    els.selectionCitationList.innerHTML = "";
    return;
  }

  els.selectionPreview.textContent = text;
  const refs = bestReferencesForSelection(text);
  if (!refs.length) {
    els.selectionCitationList.innerHTML =
      '<button class="ghost-button" type="button" data-search-selection="true">Search sources for this selection</button>';
    return;
  }

  els.selectionCitationList.innerHTML = refs
    .map(
      (ref) => `
        <button class="ghost-button" type="button" data-selection-cite="${escapeHtml(ref.id)}">
          Cite ${escapeHtml(ref.title)} ${escapeHtml(formatCitation(ref))}
        </button>
      `,
    )
    .join("");
}

function renderSourceChecks() {
  const paragraph = currentParagraphText();
  if (!paragraph || countWords(paragraph) < 8) {
    els.sourceCheckStatus.textContent = "Waiting";
    els.sourceCheckList.innerHTML =
      '<article class="check-card"><h3>Write a little more</h3><p>Once a paragraph has enough substance, this panel will suggest citations and flag possible source overlap.</p></article>';
    renderReadingSuggestions([]);
    return;
  }

  const matches = sourceMatchesForText(paragraph).slice(0, 4);
  const hasCitation = hasInTextCitation(paragraph);
  els.sourceCheckStatus.textContent = liveCrosscheckReferences.length ? "Live" : "Offline";

  const cards = [];
  if (!hasCitation && matches.length) {
    cards.push(`
      <article class="check-card warning">
        <h3>Citation suggested for this paragraph</h3>
        <p>This paragraph discusses ${escapeHtml(detectTopic(paragraph) || "an academic topic")} without an in-text citation. The strongest match is ${escapeHtml(matches[0].ref.title)}.</p>
        <div class="reference-actions">
          <button type="button" data-source-cite="${escapeHtml(matches[0].ref.id)}">Insert ${escapeHtml(formatCitation(matches[0].ref))}</button>
          <button type="button" data-source-add="${escapeHtml(matches[0].ref.id)}">Add bibliography</button>
        </div>
      </article>
    `);
  }

  matches.forEach(({ ref, score }) => {
    const risk = score >= 0.28 ? "Possible plagiarism or close paraphrase risk" : "Possible supporting source";
    const warningClass = score >= 0.28 ? " warning" : "";
    cards.push(`
      <article class="check-card${warningClass}">
        <span class="match-score">${Math.round(score * 100)}% conceptual overlap</span>
        <h3>${escapeHtml(risk)}</h3>
        <p>${escapeHtml(ref.title)} by ${escapeHtml(referenceAuthors(ref).join(", "))} may be relevant. If this source shaped the idea, cite it; if wording is close, paraphrase more clearly and cite it.</p>
        <div class="reference-actions">
          <button type="button" data-source-cite="${escapeHtml(ref.id)}">Insert ${escapeHtml(formatCitation(ref))}</button>
          <button type="button" data-source-add="${escapeHtml(ref.id)}">Add bibliography</button>
          <a href="${escapeAttribute(ref.url)}" target="_blank" rel="noreferrer">Open</a>
        </div>
      </article>
    `);
  });

  els.sourceCheckList.innerHTML =
    cards.join("") ||
    '<article class="check-card"><h3>No source overlap found yet</h3><p>This paragraph does not strongly match the current reference set. Live academic search will keep checking as you write.</p></article>';
  renderReadingSuggestions(matches.map((item) => item.ref));
}

function renderReadingSuggestions(priorityRefs = []) {
  const paragraph = currentParagraphText();
  if (!paragraph || countWords(paragraph) < 8) {
    els.readingList.innerHTML =
      '<article class="reading-card"><h3>No reading suggestions yet</h3><p>Keep writing. Suggested articles will appear here with short previews.</p></article>';
    return;
  }

  const priorityIds = new Set(priorityRefs.map((ref) => ref.id));
  const readings = [
    ...priorityRefs,
    ...sourceMatchesForText(paragraph)
      .map((item) => item.ref)
      .filter((ref) => !priorityIds.has(ref.id)),
    ...suggestedReferences().filter((ref) => !priorityIds.has(ref.id)),
  ].slice(0, 5);

  if (!readings.length) {
    els.readingList.innerHTML =
      '<article class="reading-card"><h3>No reading suggestions yet</h3><p>Keep writing. Suggested articles will appear here with short previews.</p></article>';
    return;
  }

  els.readingList.innerHTML = readings
    .map(
      (ref) => `
        <article class="reading-card">
          <p class="reference-meta">${escapeHtml(ref.source)} · ${escapeHtml(ref.year)}</p>
          <h3>${escapeHtml(ref.title)}</h3>
          <p>${escapeHtml(referenceAuthors(ref).join(", "))}</p>
          <span class="preview-text">${escapeHtml(referencePreview(ref))}</span>
          <div class="reference-actions">
            <button type="button" data-source-cite="${escapeHtml(ref.id)}">Cite ${escapeHtml(formatCitation(ref))}</button>
            <button type="button" data-source-add="${escapeHtml(ref.id)}">Add bibliography</button>
            <a href="${escapeAttribute(ref.url)}" target="_blank" rel="noreferrer">Read</a>
          </div>
        </article>
      `,
    )
    .join("");
}

function referencePreview(ref) {
  if (ref.preview) return ref.preview;
  if (ref.abstract) return ref.abstract;
  const topics = ref.topics?.length ? `Relevant to ${ref.topics.slice(0, 3).join(", ")}.` : "";
  return `${topics} Open the source to check the full abstract, argument, and citation details.`;
}

function sourceMatchesForText(text) {
  const sourceTokens = tokenize(text);
  if (sourceTokens.length === 0) return [];

  return allKnownReferences()
    .map((ref) => {
      const refTokens = cachedReferenceTokens(ref);
      const score = weightedOverlap(sourceTokens, refTokens);
      return { ref, score };
    })
    .filter((item) => item.score >= 0.08)
    .sort((a, b) => b.score - a.score);
}

function hasInTextCitation(text) {
  return /\([A-Z][A-Za-z-]+(?: et al\.)?,? \d{4}\)|\([A-Z][A-Za-z-]+ \d{4}\)|\([A-Z][A-Za-z-]+\)|\[\d+\]/.test(text);
}

const stopWords = new Set([
  "about",
  "after",
  "also",
  "among",
  "because",
  "between",
  "could",
  "from",
  "have",
  "into",
  "more",
  "such",
  "that",
  "their",
  "there",
  "this",
  "through",
  "with",
  "within",
  "would",
  "where",
  "which",
  "while",
]);

function tokenize(text) {
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9/ -]/g, " ")
        .split(/\s+/)
        .map((word) => word.trim())
        .filter((word) => word.length > 3 && !stopWords.has(word)),
    ),
  );
}

function cachedReferenceTokens(ref) {
  const signature = [
    ref.id,
    ref.title,
    ref.abstract,
    ref.topics?.join("|"),
    ref.source,
  ].join("::");
  const cached = referenceTokenCache.get(ref.id);
  if (cached?.signature === signature) {
    return cached.tokens;
  }

  const tokens = tokenize(`${ref.title} ${ref.abstract || ""} ${ref.topics?.join(" ") || ""}`);
  referenceTokenCache.set(ref.id, { signature, tokens });
  return tokens;
}

function weightedOverlap(sourceTokens, refTokens) {
  const refSet = new Set(refTokens);
  const shared = sourceTokens.filter((token) => refSet.has(token));
  const denominator = Math.max(6, Math.min(sourceTokens.length, refTokens.length));
  return shared.length / denominator;
}

function runChecks() {
  const text = textFromEditor();
  const checks = [];
  const lowerWords = text.toLowerCase().match(/\b[\w'-]+\b/g) || [];
  const sourceMatches = sourceMatchesForText(currentParagraphText());

  Object.entries(typoMap).forEach(([bad, good]) => {
    if (lowerWords.includes(bad)) {
      checks.push({
        level: "warning",
        title: `Possible typo: ${bad}`,
        body: `Consider "${good}".`,
      });
    }
  });

  text
    .split(/[.!?]\s+/)
    .filter((sentence) => countWords(sentence) > 36)
    .slice(0, 3)
    .forEach((sentence) => {
      checks.push({
        level: "warning",
        title: "Long academic sentence",
        body: `${sentence.slice(0, 160)}...`,
      });
    });

  const aiLikePhrases = [
    "delves into",
    "it is important to note",
    "in today's world",
    "a rich tapestry",
    "plays a crucial role",
    "multifaceted",
  ];
  aiLikePhrases.forEach((phrase) => {
    if (text.toLowerCase().includes(phrase)) {
      checks.push({
        level: "warning",
        title: "Generic phrasing",
        body: `"${phrase}" may read as generic. Replace it with a more specific academic claim.`,
      });
    }
  });

  const claimWords = ["shows", "proves", "demonstrates", "argues", "suggests"];
  const hasClaim = claimWords.some((word) => lowerWords.includes(word));
  const hasCitation = hasInTextCitation(text);
  if (hasClaim && !hasCitation) {
    checks.push({
      level: "warning",
      title: "Claim may need a citation",
      body: "This draft makes an academic claim but does not yet include an in-text citation.",
    });
  }

  if (sourceMatches[0]?.score >= 0.28) {
    checks.push({
      level: "warning",
      title: "Possible source overlap",
      body: `The active paragraph is close to ${sourceMatches[0].ref.title}. Add a citation and revise if the wording follows the source too closely.`,
    });
  }

  if (checks.length === 0) {
    checks.push({
      level: "ok",
      title: "No urgent issues",
      body: "Spelling, citation, and generic-phrasing checks look clear for this pass.",
    });
  }

  els.checkList.innerHTML = checks
    .map(
      (check) => `
        <article class="check-card ${check.level === "warning" ? "warning" : ""}">
          <h3>${escapeHtml(check.title)}</h3>
          <p>${escapeHtml(check.body)}</p>
        </article>
      `,
    )
    .join("");
}

function getSelectedText() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return "";
  if (!els.editor.contains(selection.anchorNode)) return "";
  lastSelection = selection.getRangeAt(0).cloneRange();
  return selection.toString().trim();
}

function rewriteText(text, mode) {
  if (!text) return "";
  const cleaned = text.replace(/\s+/g, " ").trim();
  const swaps = [
    ["very important", "significant"],
    ["big", "substantial"],
    ["a lot of", "many"],
    ["things", "elements"],
    ["good", "valuable"],
    ["bad", "problematic"],
  ];
  let revised = cleaned;
  swaps.forEach(([from, to]) => {
    revised = revised.replace(new RegExp(`\\b${from}\\b`, "gi"), to);
  });

  if (mode === "clarity") {
    return `In clearer terms, ${lowercaseFirst(revised)}`;
  }
  if (mode === "academic") {
    return `This suggests that ${lowercaseFirst(revised)} The point should be situated in relation to the relevant literature and the specific educational context.`;
  }
  if (mode === "concise") {
    return revised
      .replace(/\b(in order to)\b/gi, "to")
      .replace(/\b(due to the fact that)\b/gi, "because")
      .replace(/\b(it is important to note that)\b/gi, "")
      .split(/(?<=[.!?])\s+/)
      .slice(0, 2)
      .join(" ");
  }
  if (mode === "reflective") {
    return `I understand this as ${lowercaseFirst(revised)} This matters because it connects the writing to practice, interpretation, and the conditions of learning.`;
  }
  return revised;
}

function lowercaseFirst(text) {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function saveZoteroSettings() {
  state.zotero = {
    libraryType: els.zoteroLibraryType.value,
    libraryId: els.zoteroLibraryId.value.trim(),
    apiKey: els.zoteroApiKey.value.trim(),
    searchQuery: els.zoteroSearchInput.value.trim(),
  };
  schedulePersist();
}

function zoteroStyleId(style = activeDocument().style) {
  const map = {
    apa: "apa",
    harvard: "harvard-cite-them-right",
    chicago: "chicago-author-date",
    mla: "modern-language-association",
    ieee: "ieee",
    vancouver: "vancouver",
  };
  return map[style] || "apa";
}

function zoteroLibraryPrefix() {
  const zotero = state.zotero || {};
  if (!zotero.libraryId) return "";
  return `https://api.zotero.org/${zotero.libraryType || "users"}/${encodeURIComponent(zotero.libraryId)}`;
}

function zoteroHeaders() {
  const headers = {
    "Zotero-API-Version": "3",
  };
  if (state.zotero?.apiKey) {
    headers["Zotero-API-Key"] = state.zotero.apiKey;
  }
  return headers;
}

function yearFromDate(value) {
  const match = String(value || "").match(/\b(19|20)\d{2}\b/);
  return match ? match[0] : String(value || "n.d.").slice(0, 4) || "n.d.";
}

function stripTags(value) {
  const div = document.createElement("div");
  div.innerHTML = String(value || "");
  return div.textContent || "";
}

function cleanZoteroMarkup(value) {
  return String(value || "")
    .replace(/^<div class="csl-entry">/i, "")
    .replace(/<\/div>$/i, "")
    .trim();
}

function normalizeZoteroItem(item) {
  const data = item.data || item;
  const style = activeDocument().style;
  const creators = Array.isArray(data.creators) ? data.creators : [];
  const authors = creators
    .filter((creator) => creator.creatorType !== "editor")
    .map((creator) => {
      if (creator.name) return creator.name;
      return [creator.firstName, creator.lastName].filter(Boolean).join(" ").trim();
    })
    .filter(Boolean);

  return {
    id: `zotero-${item.key || data.key || crypto.randomUUID()}`,
    zoteroKey: item.key || data.key || "",
    title: data.title || "Untitled item",
    authors,
    creators,
    year: yearFromDate(data.date),
    date: data.date || "",
    source: data.publicationTitle || data.publisher || data.bookTitle || "Zotero",
    journal: data.publicationTitle || "",
    volume: data.volume || "",
    issue: data.issue || "",
    pages: data.pages || "",
    publisher: data.publisher || "",
    itemType: data.itemType || "",
    doi: data.DOI || data.doi || "",
    url: data.url || "",
    abstract: data.abstractNote || "",
    preview: data.abstractNote || "",
    topics: Array.isArray(data.tags)
      ? data.tags.map((tag) => tag.tag).filter(Boolean)
      : [],
    formattedByStyle: {
      [style]: cleanZoteroMarkup(item.bib),
    },
    formattedCitationByStyle: {
      [style]: stripTags(item.citation),
    },
  };
}

function renderZoteroResults(results = zoteroReferences) {
  if (!els.zoteroResults) return;
  if (!results.length) {
    els.zoteroResults.innerHTML =
      '<article class="reference-card zotero-card"><h3>No Zotero results yet</h3><p>Search your library to pull in references you already trust.</p></article>';
    return;
  }

  els.zoteroResults.innerHTML = results
    .map(
      (ref) => `
        <article class="reference-card zotero-card">
          <p class="reference-meta">${escapeHtml(ref.source)} · ${escapeHtml(referenceYear(ref))}</p>
          <h3>${escapeHtml(ref.title)}</h3>
          <p>${escapeHtml(referenceAuthors(ref).join(", "))}</p>
          <p>${escapeHtml(ref.abstract || "Imported from your Zotero library.")}</p>
          <div class="reference-actions">
            <button type="button" data-zotero-cite="${escapeHtml(ref.id)}">Cite</button>
            <button type="button" data-zotero-add="${escapeHtml(ref.id)}">Add bibliography</button>
            ${ref.url ? `<a href="${escapeAttribute(ref.url)}" target="_blank" rel="noreferrer">Open</a>` : ""}
          </div>
        </article>
      `,
    )
    .join("");
}

async function searchZotero(query = els.zoteroSearchInput.value.trim() || getSelectedText() || currentParagraphText()) {
  saveZoteroSettings();
  if (!state.zotero?.libraryId) {
    els.zoteroStatus.textContent = "Add a Zotero user or group library ID first.";
    return;
  }
  if (!query) {
    els.zoteroStatus.textContent = "Enter a Zotero search query or select text in the editor first.";
    return;
  }

  els.zoteroStatus.textContent = "Searching Zotero...";
  state.zotero.searchQuery = query;
  persist();

  const params = new URLSearchParams({
    q: query,
    qmode: "everything",
    limit: "8",
    format: "json",
    include: "data,bib,citation",
    style: zoteroStyleId(),
  });

  try {
    const response = await fetch(`${zoteroLibraryPrefix()}/items?${params.toString()}`, {
      headers: zoteroHeaders(),
    });
    if (!response.ok) {
      const detail = await response.text();
      throw new Error(detail || "Zotero search failed");
    }
    const data = await response.json();
    zoteroReferences = (data || []).map(normalizeZoteroItem);
    zoteroReferences.forEach((ref) => {
      state.customReferences[ref.id] = ref;
    });
    persist();
    els.zoteroStatus.textContent = `Found ${zoteroReferences.length} Zotero item${zoteroReferences.length === 1 ? "" : "s"}.`;
    renderZoteroResults(zoteroReferences);
    renderSelectionCitations();
  } catch (error) {
    els.zoteroStatus.textContent =
      error.message.includes("403") || error.message.includes("Forbidden")
        ? "Zotero blocked the request. Add an API key if this library is private."
        : "Zotero search failed. Check the library ID, API key, or network connection.";
    zoteroReferences = [];
    renderZoteroResults([]);
  }
}

async function onlineSearch() {
  const query = document.querySelector("#referenceSearch").value.trim() || detectTopic(textFromEditor());
  if (!query) return;

  els.referenceList.innerHTML =
    '<div class="reference-card"><h3>Searching academic metadata...</h3><p>Trying OpenAlex first, then keeping local suggestions available.</p></div>';

  try {
    const response = await fetch(
      `https://api.openalex.org/works?search=${encodeURIComponent(query)}&filter=type:article&per-page=5`,
    );
    if (!response.ok) throw new Error("OpenAlex request failed");
    const data = await response.json();
    const results = (data.results || []).map((work) => ({
      id: work.id || work.doi || crypto.randomUUID(),
      title: work.display_name || "Untitled work",
      authors: (work.authorships || [])
        .map((author) => author.author?.display_name)
        .filter(Boolean)
        .slice(0, 4),
      year: work.publication_year || "n.d.",
      source: work.primary_location?.source?.display_name || "OpenAlex",
      journal: work.primary_location?.source?.display_name || "",
      doi: work.doi || "",
      url: work.doi || work.id || "https://openalex.org",
      itemType: "journalArticle",
      topics: [query],
      abstract: abstractFromOpenAlex(work) || (work.cited_by_count
        ? `Cited by ${work.cited_by_count} works.`
        : "Academic metadata result."),
      preview: abstractFromOpenAlex(work) || previewFromWork(work),
    }));
    renderReferences(results.length ? results : suggestedReferences());
  } catch {
    els.referenceList.innerHTML =
      '<div class="reference-card"><h3>Online search unavailable</h3><p>Your local reference suggestions are still available offline.</p></div>';
    setTimeout(() => renderReferences(), 1200);
  }
}

function scheduleLiveAcademicSearch() {
  clearTimeout(liveSearchTimer);
  liveSearchTimer = setTimeout(liveAcademicSearch, 1500);
}

async function liveAcademicSearch() {
  const paragraph = currentParagraphText();
  const query = buildLiveSearchQuery(paragraph);
  if (!query || query === lastLiveQuery) return;

  lastLiveQuery = query;
  els.sourceCheckStatus.textContent = "Searching";

  try {
    const response = await fetch(
      `https://api.openalex.org/works?search=${encodeURIComponent(query)}&filter=type:article&per-page=4`,
    );
    if (!response.ok) throw new Error("OpenAlex request failed");
    const data = await response.json();
    liveCrosscheckReferences = (data.results || []).map((work) => ({
      id: work.id || work.doi || crypto.randomUUID(),
      title: work.display_name || "Untitled work",
      authors: (work.authorships || [])
        .map((author) => author.author?.display_name)
        .filter(Boolean)
        .slice(0, 4),
      year: work.publication_year || "n.d.",
      source: work.primary_location?.source?.display_name || "OpenAlex live check",
      journal: work.primary_location?.source?.display_name || "",
      doi: work.doi || "",
      url: work.doi || work.id || "https://openalex.org",
      itemType: "journalArticle",
      topics: [query, detectTopic(paragraph)].filter(Boolean),
      abstract: abstractFromOpenAlex(work) || (work.cited_by_count
        ? `Live academic metadata match. Cited by ${work.cited_by_count} works.`
        : "Live academic metadata match."),
      preview: abstractFromOpenAlex(work) || previewFromWork(work),
    }));
    liveCrosscheckReferences.forEach((ref) => {
      state.customReferences[ref.id] = ref;
    });
    persist();
    renderSourceChecks();
  } catch {
    els.sourceCheckStatus.textContent = "Offline";
    renderSourceChecks();
  }
}

function abstractFromOpenAlex(work) {
  const index = work.abstract_inverted_index;
  if (!index || typeof index !== "object") return "";

  const words = [];
  Object.entries(index).forEach(([word, positions]) => {
    positions.forEach((position) => {
      words[position] = word;
    });
  });

  return words
    .filter(Boolean)
    .join(" ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .slice(0, 420);
}

function previewFromWork(work) {
  const bits = [];
  if (work.publication_year) bits.push(`Published in ${work.publication_year}.`);
  if (work.cited_by_count) bits.push(`Cited by ${work.cited_by_count} works.`);
  const concepts = (work.concepts || [])
    .map((concept) => concept.display_name)
    .filter(Boolean)
    .slice(0, 3);
  if (concepts.length) bits.push(`Useful for ${concepts.join(", ")}.`);
  return bits.join(" ") || "Open the article record to inspect the abstract and source details.";
}

function buildLiveSearchQuery(text) {
  if (countWords(text) < 8) return "";
  const topic = detectTopic(text);
  if (topic) return `${topic} art education`;
  return tokenize(text).slice(0, 7).join(" ");
}

function exportDoc() {
  saveCurrentDocument();
  const doc = activeDocument();
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(doc.title)}</title></head><body><h1>${escapeHtml(doc.title)}</h1>${doc.content}</body></html>`;
  const blob = new Blob([html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${doc.title.replace(/[^\w-]+/g, "-").toLowerCase() || "document"}.doc`;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

function activateTab(tabName) {
  document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
  document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("active-panel"));
  document.querySelector(`.tab[data-tab="${tabName}"]`)?.classList.add("active");
  document.querySelector(`#${tabName}Panel`)?.classList.add("active-panel");
}

function removeCitationToken(token) {
  token?.remove();
  syncBibliographySection();
  saveCurrentDocument();
  updateMetrics();
  renderSelectionCitations();
  renderSourceChecks();
}

function hideEditorContextMenu() {
  if (els.editorContextMenu) {
    els.editorContextMenu.hidden = true;
    els.editorContextMenu.innerHTML = "";
  }
  contextCitationToken = null;
}

function showEditorContextMenu(x, y, eventTarget) {
  if (!els.editorContextMenu) return;

  const selectedText = getSelectedText();
  const citationTarget = eventTarget?.closest?.(".citation-token");
  contextCitationToken = citationTarget || null;
  const refs = selectedText ? bestReferencesForSelection(selectedText) : [];
  const parts = [];

  if (selectedText) {
    parts.push(`<div class="context-menu-title">${escapeHtml(selectedText.slice(0, 72))}</div>`);
    refs.forEach((ref) => {
      parts.push(
        `<button type="button" data-context-cite="${escapeHtml(ref.id)}">Cite ${escapeHtml(ref.title)} ${escapeHtml(formatCitation(ref))}</button>`,
      );
    });
    parts.push('<button type="button" data-context-search="true">Search sources for this text</button>');
    if (state.zotero?.libraryId) {
      parts.push('<button type="button" data-context-zotero="true">Search Zotero for this text</button>');
    }
  } else if (citationTarget?.dataset.refId) {
    const ref = lookupReference(citationTarget.dataset.refId);
    parts.push(`<div class="context-menu-title">${escapeHtml(ref?.title || "Citation")}</div>`);
    parts.push('<button type="button" data-context-remove="true">Remove citation</button>');
  }

  if (!parts.length) return;

  els.editorContextMenu.innerHTML = parts.join("");
  els.editorContextMenu.hidden = false;
  const menuWidth = Math.min(320, window.innerWidth - 24);
  const left = Math.min(x, window.innerWidth - menuWidth - 12);
  const top = Math.min(y, window.innerHeight - 220);
  els.editorContextMenu.style.left = `${Math.max(12, left)}px`;
  els.editorContextMenu.style.top = `${Math.max(12, top)}px`;
}

function applyFormattingSelection(command, value = null) {
  els.editor.focus();
  restoreSavedSelection();
  const execValue = command === "formatBlock" && value ? `<${String(value).toLowerCase()}>` : value;
  document.execCommand(command, false, execValue);
  saveCurrentDocument();
  updateMetrics();
  renderOutline();
}

function updateDocumentFormatting(partial) {
  Object.assign(activeDocument(), partial);
  applyDocumentAppearance();
  saveCurrentDocument();
  renderDocuments();
}

function adjustZoom(delta) {
  const doc = activeDocument();
  doc.zoom = clampZoom((doc.zoom || defaultZoom) + delta);
  applyDocumentAppearance(doc);
  saveCurrentDocument();
}

function quickInsertCitation() {
  const selectedText = getSelectedText();
  const ref = bestReferencesForSelection(selectedText)[0] || suggestedReferences()[0];
  if (!ref) {
    activateTab("sources");
    return;
  }
  insertCitationForReference(ref);
}

document.querySelector("#newDocumentButton").addEventListener("click", createNewDocument);

document.querySelector("#newFolderButton").addEventListener("click", () => {
  els.folderInlinePanel.hidden = !els.folderInlinePanel.hidden;
  if (!els.folderInlinePanel.hidden) els.folderNameInput.focus();
});

document.querySelector("#saveFolderButton").addEventListener("click", () => createFolder());

els.folderNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    createFolder();
  }
});

els.documentList.addEventListener("click", (event) => {
  const openId = event.target.closest("[data-open-document]")?.dataset.openDocument;
  const deleteDocId = event.target.closest("[data-delete-document]")?.dataset.deleteDocument;
  const deleteFolderId = event.target.closest("[data-delete-folder]")?.dataset.deleteFolder;
  const toggleFolderId = event.target.closest("[data-folder-toggle]")?.dataset.folderToggle;

  if (openId) {
    saveCurrentDocument();
    activeId = openId;
    renderApp();
  }
  if (deleteDocId) {
    deleteDocument(deleteDocId);
  }
  if (deleteFolderId) {
    deleteFolder(deleteFolderId);
  }
  if (toggleFolderId) {
    toggleFolder(toggleFolderId);
  }
});

els.outlineList?.addEventListener("click", (event) => {
  const targetId = event.target.closest("[data-outline-target]")?.dataset.outlineTarget;
  if (!targetId) return;
  document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
});

els.docTitle.addEventListener("input", () => {
  captureCurrentDocument();
  schedulePersist();
  renderDocuments();
  renderOutline();
});

els.docStatus.addEventListener("change", () => {
  captureCurrentDocument();
  persist();
  renderDocuments();
});

els.projectMode?.addEventListener("change", () => {
  state.project.mode = els.projectMode.value;
  persist();
});

[els.researchQuestionInput, els.subQuestionsInput, els.methodologyInput, els.contributionInput].forEach(
  (input) => {
    input.addEventListener("input", saveProjectPlan);
  },
);

document.querySelector("#addLiteratureRowButton").addEventListener("click", addLiteratureRow);

els.literatureMatrix.addEventListener("input", (event) => {
  const field = event.target.dataset?.litField;
  const rowId = event.target.closest("[data-matrix-id]")?.dataset.matrixId;
  if (field && rowId) updateLiteratureRow(rowId, field, event.target.value);
});

els.literatureMatrix.addEventListener("click", (event) => {
  const rowId = event.target.dataset?.deleteLit;
  if (rowId) deleteLiteratureRow(rowId);
});

els.editor.addEventListener("input", () => {
  hideEditorContextMenu();
  captureCurrentDocument();
  updateMetrics();
  schedulePersist();
  scheduleEditorAnalysis();
});

els.editor.addEventListener("mouseup", () => {
  getSelectedText();
  renderSelectionCitations();
});

els.editor.addEventListener("keyup", () => {
  getSelectedText();
  renderSelectionCitations();
});

els.editor.addEventListener("contextmenu", (event) => {
  const selectedText = getSelectedText();
  const citationTarget = event.target.closest(".citation-token");
  if (!selectedText && !citationTarget) return;
  event.preventDefault();
  showEditorContextMenu(event.clientX, event.clientY, event.target);
});

document.addEventListener("selectionchange", () => {
  const selection = window.getSelection();
  if (!selection?.anchorNode || !els.editor.contains(selection.anchorNode)) return;
  getSelectedText();
  renderSelectionCitations();
});

els.citationStyleSelect?.addEventListener("change", () => {
  activeDocument().style = els.citationStyleSelect.value;
  syncCitationTokens();
  syncBibliographySection();
  saveCurrentDocument();
  renderApp();
});

document.querySelectorAll("[data-command]").forEach((button) => {
  button.addEventListener("click", () => {
    applyFormattingSelection(button.dataset.command);
    closeMenu(els.textToolsMenu, els.textToolsButton);
  });
});

els.blockStyleSelect?.addEventListener("change", () => {
  applyFormattingSelection("formatBlock", els.blockStyleSelect.value);
});

els.fontFamilySelect?.addEventListener("change", () => {
  updateDocumentFormatting({ fontFamily: els.fontFamilySelect.value });
});

els.fontSizeSelect?.addEventListener("change", () => {
  updateDocumentFormatting({ fontSize: Number(els.fontSizeSelect.value) || defaultFontSize });
});

els.lineHeightSelect?.addEventListener("change", () => {
  updateDocumentFormatting({ lineHeight: Number(els.lineHeightSelect.value) || defaultLineHeight });
});

els.textAlignSelect?.addEventListener("change", () => {
  applyFormattingSelection(els.textAlignSelect.value);
});

document.querySelector("#zoomOutButton")?.addEventListener("click", () => adjustZoom(-10));
document.querySelector("#zoomInButton")?.addEventListener("click", () => adjustZoom(10));
document.querySelector("#insertCitationButton")?.addEventListener("click", quickInsertCitation);

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    activateTab(tab.dataset.tab);
  });
});

els.referenceList.addEventListener("click", (event) => {
  const citeId = event.target.dataset?.cite;
  const addId = event.target.dataset?.add;
  const ref = lookupReference(citeId || addId);
  if (!ref) return;

  if (citeId) insertCitationForReference(ref);
  if (addId) addBibliography(ref);
});

els.sourceCheckList.addEventListener("click", (event) => {
  const citeId = event.target.dataset?.sourceCite;
  const addId = event.target.dataset?.sourceAdd;
  const ref = lookupReference(citeId || addId);
  if (!ref) return;

  if (citeId) insertCitationForReference(ref);
  if (addId) addBibliography(ref);
});

els.readingList.addEventListener("click", (event) => {
  const citeId = event.target.dataset?.sourceCite;
  const addId = event.target.dataset?.sourceAdd;
  const ref = lookupReference(citeId || addId);
  if (!ref) return;

  if (citeId) insertCitationForReference(ref);
  if (addId) addBibliography(ref);
});

els.selectionCitationList?.addEventListener("click", (event) => {
  const citeId = event.target.dataset?.selectionCite;
  if (citeId) {
    insertCitationForReference(lookupReference(citeId));
    return;
  }
  if (event.target.dataset?.searchSelection) {
    const selectedText = getSelectedText();
    if (!selectedText) return;
    document.querySelector("#referenceSearch").value = selectedText;
    activateTab("references");
    onlineSearch();
  }
});

els.zoteroResults?.addEventListener("click", (event) => {
  const citeId = event.target.dataset?.zoteroCite;
  const addId = event.target.dataset?.zoteroAdd;
  const ref = lookupReference(citeId || addId);
  if (!ref) return;
  if (citeId) insertCitationForReference(ref);
  if (addId) addBibliography(ref);
});

document.querySelector("#refreshReferencesButton").addEventListener("click", () => {
  updateMetrics();
  renderReferences();
  renderSourceChecks();
  renderOutline();
  scheduleFocusHighlights();
  scheduleLiveAcademicSearch();
});

document.querySelector("#runChecksButton").addEventListener("click", runChecks);
document.querySelector("#onlineSearchButton").addEventListener("click", onlineSearch);
document.querySelector("#exportButton").addEventListener("click", exportDoc);
document.querySelector("#searchZoteroButton")?.addEventListener("click", () => searchZotero());
document.querySelector("#useSelectionForSearchButton")?.addEventListener("click", () => {
  const selectedText = getSelectedText();
  if (!selectedText) return;
  document.querySelector("#referenceSearch").value = selectedText;
  els.zoteroSearchInput.value = selectedText;
  activateTab("references");
  onlineSearch();
  if (state.zotero?.libraryId) searchZotero(selectedText);
});

document.querySelector("#referenceSearch")?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    onlineSearch();
  }
});

els.zoteroSearchInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchZotero();
  }
});

[els.zoteroLibraryType, els.zoteroLibraryId, els.zoteroApiKey, els.zoteroSearchInput].forEach((input) => {
  input?.addEventListener("input", saveZoteroSettings);
});

document.querySelector("#githubButton").addEventListener("click", () => {
  closeFloatingMenus();
  els.githubInlinePanel.hidden = !els.githubInlinePanel.hidden;
  renderGithubState();
  if (!els.githubInlinePanel.hidden) els.githubRepoInput.focus();
});

document.querySelector("#saveGithubRepoButton").addEventListener("click", saveGithubRepo);
document.querySelector("#pushGithubRepoButton").addEventListener("click", () => sendGithubSnapshot("manual"));
document.querySelector("#pullGithubRepoButton").addEventListener("click", pullGithubSnapshot);
document.querySelector("#clearGithubRepoButton").addEventListener("click", clearGithubRepo);
els.themeToggleButton.addEventListener("click", toggleTheme);
els.focusModeButton?.addEventListener("click", toggleFocusMode);
els.openCommandButton?.addEventListener("click", openCommandPalette);
els.closeCommandButton?.addEventListener("click", closeCommandPalette);
els.workspaceMenuButton?.addEventListener("click", () => {
  toggleMenu(els.workspaceMenu, els.workspaceMenuButton);
});
els.textToolsButton?.addEventListener("click", () => {
  toggleMenu(els.textToolsMenu, els.textToolsButton);
});
els.githubActionsButton?.addEventListener("click", () => {
  toggleMenu(els.githubActionsMenu, els.githubActionsButton);
});

[els.themeToggleButton, els.focusModeButton, els.openCommandButton].forEach((button) => {
  button?.addEventListener("click", () => {
    closeMenu(els.workspaceMenu, els.workspaceMenuButton);
  });
});

[
  document.querySelector("#pushGithubRepoButton"),
  document.querySelector("#pullGithubRepoButton"),
  document.querySelector("#clearGithubRepoButton"),
].forEach((button) => {
  button?.addEventListener("click", () => {
    closeMenu(els.githubActionsMenu, els.githubActionsButton);
  });
});

[els.githubRepoInput, els.githubBranchInput, els.githubTokenInput].forEach((input) => {
  input?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveGithubRepo();
    }
  });
});

els.commandInput?.addEventListener("input", () => {
  renderCommandResults(els.commandInput.value);
});

els.commandInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const firstCommandId = els.commandResults?.querySelector("[data-command-id]")?.dataset.commandId;
    if (firstCommandId) runCommand(firstCommandId);
  }
});

els.commandResults?.addEventListener("click", (event) => {
  const commandId = event.target.closest("[data-command-id]")?.dataset.commandId;
  if (commandId) runCommand(commandId);
});

els.commandPalette?.addEventListener("click", (event) => {
  if (event.target.dataset?.closeCommand) {
    closeCommandPalette();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".menu-anchor")) {
    closeFloatingMenus();
  }
});

els.runRewriteButton?.addEventListener("click", () => {
  const selected = getSelectedText();
  const mode = els.rewriteModeSelect?.value || "clarity";
  els.rewriteOutput.value = rewriteText(selected, mode);
});

document.querySelector("#replaceSelectionButton").addEventListener("click", () => {
  if (!lastSelection || !els.rewriteOutput.value.trim()) return;
  restoreSavedSelection();
  insertAtCaret(escapeHtml(els.rewriteOutput.value));
  syncBibliographySection();
  saveCurrentDocument();
  updateMetrics();
  runChecks();
});

els.editorContextMenu?.addEventListener("click", (event) => {
  const citeId = event.target.dataset?.contextCite;
  if (citeId) {
    insertCitationForReference(lookupReference(citeId));
    hideEditorContextMenu();
    return;
  }
  if (event.target.dataset?.contextSearch) {
    const selectedText = getSelectedText();
    if (selectedText) {
      document.querySelector("#referenceSearch").value = selectedText;
      activateTab("references");
      onlineSearch();
    }
    hideEditorContextMenu();
    return;
  }
  if (event.target.dataset?.contextZotero) {
    const selectedText = getSelectedText();
    if (selectedText) {
      els.zoteroSearchInput.value = selectedText;
      activateTab("sources");
      searchZotero(selectedText);
    }
    hideEditorContextMenu();
    return;
  }
  if (event.target.dataset?.contextRemove) {
    removeCitationToken(contextCitationToken);
    hideEditorContextMenu();
  }
});

document.addEventListener("click", (event) => {
  if (!els.editorContextMenu?.hidden && !els.editorContextMenu.contains(event.target)) {
    hideEditorContextMenu();
  }
});

window.addEventListener("scroll", hideEditorContextMenu, { passive: true });
window.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (els.commandPalette?.hidden) {
      openCommandPalette();
    } else {
      closeCommandPalette();
    }
    return;
  }

  if (event.key === "Escape") {
    hideEditorContextMenu();
    closeCommandPalette();
    closeFloatingMenus();
  }
});

window.addEventListener("beforeunload", () => {
  captureCurrentDocument();
  flushPersist();
});

renderApp();
renderTheme();
persist();
scheduleGithubSnapshots();
