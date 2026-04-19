const storageKey = "arted-phd-writer-state-v1";
const defaultFolderId = "folder-unsorted";

const starterDocuments = [
  {
    id: crypto.randomUUID(),
    title: "Thesis chapter draft",
    style: "apa",
    status: "Draft",
    content: `<h2>Introduction</h2><p>Art education can be understood as a site where visual culture, identity, and critical pedagogy meet. This chapter examines how reflective practice can support students in connecting personal meaning with broader social questions.</p><p>The central argument is that socially engaged art education requires more than skill development; it requires attention to voice, context, materiality, and the ethical conditions of participation.</p>`,
  references: [],
  folderId: defaultFolderId,
  status: "Draft",
  updatedAt: Date.now(),
  },
  {
    id: crypto.randomUUID(),
    title: "Article idea",
    style: "apa",
    status: "Draft",
    content: `<h2>Abstract</h2><p>This article explores how museum education can support dialogic learning through participatory art practices. It considers the relationship between interpretation, embodiment, and critical reflection.</p>`,
    references: [],
    folderId: defaultFolderId,
    updatedAt: Date.now() - 60000,
  },
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
let liveSearchTimer = null;
let highlightTimer = null;
let githubSnapshotTimer = null;
let lastLiveQuery = "";
const githubSyncEndpoint = "http://127.0.0.1:37110/api";

const els = {
  documentList: document.querySelector("#documentList"),
  folderInlinePanel: document.querySelector("#folderInlinePanel"),
  folderNameInput: document.querySelector("#folderNameInput"),
  editor: document.querySelector("#editor"),
  docTitle: document.querySelector("#docTitle"),
  themeToggleButton: document.querySelector("#themeToggleButton"),
  projectMode: document.querySelector("#projectMode"),
  docStatus: document.querySelector("#docStatus"),
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
  researchQuestionInput: document.querySelector("#researchQuestionInput"),
  subQuestionsInput: document.querySelector("#subQuestionsInput"),
  methodologyInput: document.querySelector("#methodologyInput"),
  contributionInput: document.querySelector("#contributionInput"),
  literatureMatrix: document.querySelector("#literatureMatrix"),
  checkList: document.querySelector("#checkList"),
  syncState: document.querySelector("#syncState"),
  googleInlinePanel: document.querySelector("#googleInlinePanel"),
  googleDocLinkInlineInput: document.querySelector("#googleDocLinkInlineInput"),
  googleInlineMessage: document.querySelector("#googleInlineMessage"),
  githubInlinePanel: document.querySelector("#githubInlinePanel"),
  githubRepoInput: document.querySelector("#githubRepoInput"),
  githubSyncMessage: document.querySelector("#githubSyncMessage"),
  rewriteOutput: document.querySelector("#rewriteOutput"),
  googleDialog: document.querySelector("#googleDialog"),
  googleDocLinkInput: document.querySelector("#googleDocLinkInput"),
  googleDocIdDisplay: document.querySelector("#googleDocIdDisplay"),
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
    ...doc,
    folderId: folderIds.has(doc.folderId) ? doc.folderId : defaultFolderId,
    status: doc.status || "Draft",
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
  els.researchQuestionInput.value = project.researchQuestion || "";
  els.subQuestionsInput.value = project.subQuestions || "";
  els.methodologyInput.value = project.methodology || "";
  els.contributionInput.value = project.contribution || "";
  renderLiteratureMatrix();
}

function saveProjectPlan() {
  state.project = {
    ...(state.project || {}),
    mode: els.projectMode.value,
    researchQuestion: els.researchQuestionInput.value,
    subQuestions: els.subQuestionsInput.value,
    methodology: els.methodologyInput.value,
    contribution: els.contributionInput.value,
  };
  persist();
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
  persist();
}

function deleteLiteratureRow(rowId) {
  state.literatureMatrix = state.literatureMatrix.filter((item) => item.id !== rowId);
  persist();
  renderLiteratureMatrix();
}

function renderEditor() {
  const doc = activeDocument();
  els.docTitle.value = doc.title;
  els.docStatus.value = doc.status || "Draft";
  els.projectMode.value = state.project?.mode || "thesis";
  els.editor.innerHTML = doc.content;
  document.querySelectorAll(".style-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.style === doc.style);
  });
}

function renderApp() {
  renderDocuments();
  renderEditor();
  renderGoogleDocState();
  renderProjectPlan();
  updateMetrics();
  scheduleFocusHighlights();
  renderReferences();
  renderSourceChecks();
  runChecks();
}

function saveCurrentDocument() {
  const doc = activeDocument();
  doc.title = els.docTitle.value.trim() || "Untitled";
  doc.status = els.docStatus.value || "Draft";
  doc.content = htmlWithoutFocusMarks();
  doc.updatedAt = Date.now();
  persist();
}

function renderGoogleDocState() {
  const doc = activeDocument();
  const hasLink = Boolean(doc.googleDocId);
  if (els.googleDocLinkInlineInput) {
    els.googleDocLinkInlineInput.value = googleDocEditUrl(doc);
  }
  if (els.googleInlineMessage) {
    els.googleInlineMessage.textContent = hasLink
      ? googleSyncMessage(doc)
      : "Paste a shared edit link, then save it.";
  }
  renderGithubState();
}

function googleSyncMessage(doc = activeDocument()) {
  if (!doc.googleDocId) return "Paste a shared edit link, then save it.";
  return `Linked document ID: ${doc.googleDocId}.`;
}

function renderGithubState() {
  if (!els.githubRepoInput || !els.githubSyncMessage) return;
  els.githubRepoInput.value = state.githubRepoUrl || "";
  els.githubSyncMessage.textContent = state.githubRepoUrl
    ? "GitHub linked. The app will ask the local helper to push every 110 seconds."
    : "Pushes every 110 seconds when the local sync helper is running.";
}

function renderTheme() {
  document.body.dataset.theme = state.theme === "day" ? "day" : "night";
  if (els.themeToggleButton) {
    els.themeToggleButton.textContent =
      state.theme === "day" ? "Dark mode off" : "Dark mode on";
  }
}

function toggleTheme() {
  state.theme = state.theme === "day" ? "night" : "day";
  renderTheme();
  persist();
}

async function saveGithubRepo() {
  const repoUrl = els.githubRepoInput.value.trim();
  if (!repoUrl) {
    state.githubRepoUrl = "";
    persist();
    renderGithubState();
    return;
  }

  state.githubRepoUrl = repoUrl;
  persist();
  renderGithubState();
  await sendGithubConfig();
  await sendGithubSnapshot("manual");
  scheduleGithubSnapshots();
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
    activeId,
    folders: state.folders,
    project: state.project,
    literatureMatrix: state.literatureMatrix,
    theme: state.theme,
    documents: state.documents.map((doc) => ({
      ...doc,
      plainText: stripHtml(doc.content),
    })),
    exportedAt: new Date().toISOString(),
  };
}

async function sendGithubConfig() {
  if (!state.githubRepoUrl) return;
  try {
    const response = await fetch(`${githubSyncEndpoint}/config`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repoUrl: state.githubRepoUrl }),
    });
    const result = await response.json();
    els.githubSyncMessage.textContent = result.message || "GitHub repository linked.";
  } catch {
    els.githubSyncMessage.textContent =
      "GitHub helper is not running. Start it with: node sync-server.js";
  }
}

async function sendGithubSnapshot(reason = "auto") {
  if (!state.githubRepoUrl) return;
  try {
    els.githubSyncMessage.textContent = "Sending snapshot to GitHub helper...";
    const response = await fetch(`${githubSyncEndpoint}/snapshot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(githubPayload(reason)),
    });
    const result = await response.json();
    els.githubSyncMessage.textContent =
      result.message ||
      `Snapshot handled at ${new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}.`;
  } catch {
    els.githubSyncMessage.textContent =
      "Could not reach GitHub helper. Start it with: node sync-server.js";
  }
}

async function pullGithubSnapshot() {
  if (!state.githubRepoUrl) return;
  try {
    els.githubSyncMessage.textContent = "Pulling latest GitHub snapshot...";
    const response = await fetch(`${githubSyncEndpoint}/pull`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repoUrl: state.githubRepoUrl }),
    });
    const result = await response.json();
    if (!result.ok) throw new Error(result.message || "Pull failed");
    if (result.snapshot) {
      applyGithubSnapshot(result.snapshot);
    }
    els.githubSyncMessage.textContent = result.message || "Pulled latest GitHub snapshot.";
  } catch {
    els.githubSyncMessage.textContent =
      "Could not pull from GitHub. Start the helper and check repository access.";
  }
}

function applyGithubSnapshot(snapshot) {
  if (!snapshot.documents?.length) return;
  state.folders = snapshot.folders || state.folders;
  state.documents = snapshot.documents.map((doc) => ({
    ...doc,
    status: doc.status || "Draft",
  }));
  state.project = snapshot.project || state.project;
  state.literatureMatrix = snapshot.literatureMatrix || state.literatureMatrix;
  state.theme = snapshot.theme || state.theme;
  activeId = snapshot.activeId && state.documents.some((doc) => doc.id === snapshot.activeId)
    ? snapshot.activeId
    : state.documents[0].id;
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
  const citations = text.match(/\([A-Z][A-Za-z-]+(?: et al\.)?, \d{4}\)/g) || [];
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
  const block = element?.closest?.("p, li, blockquote, h2, h3");

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
  saveCurrentDocument();
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
      <p>${escapeHtml(ref.authors.join(", "))}</p>
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

function formatCitation(ref, style = activeDocument().style) {
  const firstAuthor = ref.authors[0]?.split(" ").slice(-1)[0] || "Unknown";
  if (style === "harvard") return `(${firstAuthor} ${ref.year})`;
  return `(${firstAuthor}, ${ref.year})`;
}

function formatBibliography(ref, style = activeDocument().style) {
  const authorText = ref.authors.join(", ");
  if (style === "harvard") {
    return `${authorText} ${ref.year}, <em>${escapeHtml(ref.title)}</em>. ${escapeHtml(ref.source)}.`;
  }
  return `${authorText}. (${ref.year}). <em>${escapeHtml(ref.title)}</em>. ${escapeHtml(ref.source)}.`;
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

function addBibliography(ref) {
  const doc = activeDocument();
  state.customReferences[ref.id] = ref;
  doc.references = Array.from(new Set([...(doc.references || []), ref.id]));
  const bibliographyItems = doc.references
    .map((id) => lookupReference(id))
    .filter(Boolean)
    .map((item) => `<p>${formatBibliography(item, doc.style)}</p>`)
    .join("");

  let html = els.editor.innerHTML;
  const block = `<h2>References</h2>${bibliographyItems}`;
  if (html.includes("<h2>References</h2>")) {
    html = html.replace(/<h2>References<\/h2>[\s\S]*$/i, block);
  } else {
    html += block;
  }
  els.editor.innerHTML = html;
  saveCurrentDocument();
  updateMetrics();
}

function lookupReference(id) {
  return (
    referenceCorpus.find((item) => item.id === id) ||
    visibleReferences.find((item) => item.id === id) ||
    liveCrosscheckReferences.find((item) => item.id === id) ||
    state.customReferences[id]
  );
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
        <p>${escapeHtml(ref.title)} by ${escapeHtml(ref.authors.join(", "))} may be relevant. If this source shaped the idea, cite it; if wording is close, paraphrase more clearly and cite it.</p>
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
          <p>${escapeHtml(ref.authors?.join(", ") || "Unknown author")}</p>
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
      const refText = `${ref.title} ${ref.abstract || ""} ${ref.topics?.join(" ") || ""}`;
      const refTokens = tokenize(refText);
      const score = weightedOverlap(sourceTokens, refTokens);
      return { ref, score };
    })
    .filter((item) => item.score >= 0.08)
    .sort((a, b) => b.score - a.score);
}

function hasInTextCitation(text) {
  return /\([A-Z][A-Za-z-]+(?: et al\.)?,? \d{4}\)|\([A-Z][A-Za-z-]+ \d{4}\)/.test(text);
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
  const hasCitation = /\([A-Z][A-Za-z-]+(?: et al\.)?,? \d{4}\)/.test(text);
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
      topics: [query],
      abstract: abstractFromOpenAlex(work) || (work.cited_by_count
        ? `Cited by ${work.cited_by_count} works.`
        : "Academic metadata result."),
      preview: abstractFromOpenAlex(work) || previewFromWork(work),
      url: work.doi || work.id || "https://openalex.org",
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
      topics: [query, detectTopic(paragraph)].filter(Boolean),
      abstract: abstractFromOpenAlex(work) || (work.cited_by_count
        ? `Live academic metadata match. Cited by ${work.cited_by_count} works.`
        : "Live academic metadata match."),
      preview: abstractFromOpenAlex(work) || previewFromWork(work),
      url: work.doi || work.id || "https://openalex.org",
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

function extractGoogleDocId(value) {
  const text = String(value || "").trim();
  const docMatch = text.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
  if (docMatch) return docMatch[1];

  try {
    const url = new URL(text);
    return url.searchParams.get("id") || "";
  } catch {
    return "";
  }
}

function googleDocEditUrl(doc = activeDocument()) {
  if (doc.googleDocUrl) return doc.googleDocUrl;
  if (doc.googleDocId) return `https://docs.google.com/document/d/${doc.googleDocId}/edit`;
  return "";
}

function saveGoogleDocLink() {
  const url = (
    els.googleDocLinkInlineInput?.value ||
    els.googleDocLinkInput?.value ||
    ""
  ).trim();
  const docId = extractGoogleDocId(url);
  if (!docId) {
    const message = "I could not find a Google Docs document ID in that link.";
    if (els.googleDocIdDisplay) els.googleDocIdDisplay.textContent = message;
    if (els.googleInlineMessage) els.googleInlineMessage.textContent = message;
    return false;
  }

  const doc = activeDocument();
  doc.googleDocId = docId;
  doc.googleDocUrl = url || `https://docs.google.com/document/d/${docId}/edit`;
  doc.updatedAt = Date.now();
  if (els.googleDocIdDisplay) els.googleDocIdDisplay.textContent = `Linked document ID: ${docId}`;
  if (els.googleInlineMessage) els.googleInlineMessage.textContent = `Linked document ID: ${docId}`;
  persist();
  renderGoogleDocState();
  fetchAndApplyGoogleDocTitle(docId);
  return true;
}

function openLinkedGoogleDoc() {
  const url = googleDocEditUrl();
  if (url) window.open(url, "_blank", "noopener,noreferrer");
}

async function copyDraftForGoogleDocs() {
  saveCurrentDocument();
  const doc = activeDocument();
  const draftText = `${doc.title}\n\n${textFromEditor()}`;

  try {
    await navigator.clipboard.writeText(draftText);
    els.syncState.textContent = "Draft copied. Paste it into the linked Google Doc.";
  } catch {
    fallbackCopyText(draftText);
    els.syncState.textContent = "Draft selected for copying. Paste it into Google Docs.";
  }
}

function fallbackCopyText(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

async function importLinkedGoogleDocText() {
  const doc = activeDocument();
  const docId =
    doc.googleDocId ||
    extractGoogleDocId(els.googleDocLinkInlineInput?.value || els.googleDocLinkInput?.value);
  if (!docId) {
    const message = "Save a valid Google Docs link first.";
    if (els.googleDocIdDisplay) els.googleDocIdDisplay.textContent = message;
    if (els.googleInlineMessage) els.googleInlineMessage.textContent = message;
    return;
  }

  setGoogleMessage("Pulling from Google Docs...");

  try {
    const response = await fetch(
      `https://docs.google.com/document/d/${docId}/export?format=txt`,
    );
    if (!response.ok) throw new Error("Google export failed");
    const text = await response.text();
    if (!text.trim()) throw new Error("No text returned");

    applyGoogleDocText(text);
    activeDocument().lastGooglePullAt = Date.now();
    persist();
    setGoogleMessage("Pulled public Google Doc text.");
  } catch {
    const message =
      "Import was blocked by Google or browser permissions. Open the Doc and copy/paste the text into the editor.";
    setGoogleMessage(message);
  }
}

function applyGoogleDocText(text, title = "") {
  if (!text?.trim()) {
    setGoogleMessage("Google returned no document text, so I kept your local draft unchanged.");
    return;
  }
  const doc = activeDocument();
  if (title?.trim()) {
    doc.title = title.trim();
  }
  doc.content = text
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.trim()).replace(/\n/g, "<br>")}</p>`)
    .join("");
  renderEditor();
  saveCurrentDocument();
  updateMetrics();
  renderReferences();
  renderSourceChecks();
}

async function fetchAndApplyGoogleDocTitle(docId = activeDocument().googleDocId) {
  if (!docId) return;
  const title = await fetchGoogleDocTitle(docId);
  if (!title) return;
  const doc = activeDocument();
  doc.title = title;
  doc.updatedAt = Date.now();
  renderEditor();
  renderDocuments();
  persist();
  setGoogleMessage(`Linked and renamed draft to "${title}".`);
}

async function fetchGoogleDocTitle(docId) {
  const endpoints = [
    `https://docs.google.com/document/d/${docId}/mobilebasic`,
    `https://docs.google.com/document/d/${docId}/edit`,
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) continue;
      const html = await response.text();
      const title =
        html.match(/<title>(.*?)<\/title>/i)?.[1] ||
        html.match(/"title"\s*:\s*"([^"]+)"/i)?.[1];
      if (title) {
        return title
          .replace(/- Google Docs$/i, "")
          .replace(/&amp;/g, "&")
          .trim();
      }
    } catch {
      // Public Google pages may block browser reads.
    }
  }
  return "";
}

function setGoogleMessage(message) {
  if (els.googleDocIdDisplay) els.googleDocIdDisplay.textContent = message;
  if (els.googleInlineMessage) els.googleInlineMessage.textContent = message;
}

function unlinkGoogleDoc() {
  const doc = activeDocument();
  delete doc.googleDocId;
  delete doc.googleDocUrl;
  if (els.googleDocLinkInput) els.googleDocLinkInput.value = "";
  if (els.googleDocLinkInlineInput) els.googleDocLinkInlineInput.value = "";
  if (els.googleDocIdDisplay) els.googleDocIdDisplay.textContent = "No document linked yet.";
  if (els.googleInlineMessage) {
    els.googleInlineMessage.textContent = "No document linked yet.";
  }
  persist();
  renderGoogleDocState();
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

document.querySelector("#newDocumentButton").addEventListener("click", () => {
  saveCurrentDocument();
  const doc = {
    id: crypto.randomUUID(),
    title: "Untitled academic draft",
    style: "apa",
    content: "",
    references: [],
    folderId: defaultFolderId,
    updatedAt: Date.now(),
  };
  state.documents.push(doc);
  activeId = doc.id;
  renderApp();
  persist();
  els.editor.focus();
});

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

els.docTitle.addEventListener("input", () => {
  saveCurrentDocument();
  renderDocuments();
});

els.docStatus.addEventListener("change", () => {
  saveCurrentDocument();
  renderDocuments();
});

els.projectMode.addEventListener("change", () => {
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
  saveCurrentDocument();
  updateMetrics();
  renderReferences();
  renderSourceChecks();
  runChecks();
  scheduleFocusHighlights();
  scheduleLiveAcademicSearch();
});

els.editor.addEventListener("mouseup", getSelectedText);
els.editor.addEventListener("keyup", getSelectedText);

document.querySelectorAll(".style-button").forEach((button) => {
  button.addEventListener("click", () => {
    activeDocument().style = button.dataset.style;
    saveCurrentDocument();
    renderApp();
  });
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("active-panel"));
    tab.classList.add("active");
    document.querySelector(`#${tab.dataset.tab}Panel`).classList.add("active-panel");
  });
});

els.referenceList.addEventListener("click", (event) => {
  const citeId = event.target.dataset?.cite;
  const addId = event.target.dataset?.add;
  const ref = lookupReference(citeId || addId);
  if (!ref) return;

  if (citeId) {
    insertAtCaret(` ${formatCitation(ref)} `);
    saveCurrentDocument();
    updateMetrics();
  }
  if (addId) addBibliography(ref);
});

els.sourceCheckList.addEventListener("click", (event) => {
  const citeId = event.target.dataset?.sourceCite;
  const addId = event.target.dataset?.sourceAdd;
  const ref = lookupReference(citeId || addId);
  if (!ref) return;

  if (citeId) {
    insertAtCaret(` ${formatCitation(ref)} `);
    saveCurrentDocument();
    updateMetrics();
    renderSourceChecks();
  }
  if (addId) addBibliography(ref);
});

els.readingList.addEventListener("click", (event) => {
  const citeId = event.target.dataset?.sourceCite;
  const addId = event.target.dataset?.sourceAdd;
  const ref = lookupReference(citeId || addId);
  if (!ref) return;

  if (citeId) {
    insertAtCaret(` ${formatCitation(ref)} `);
    saveCurrentDocument();
    updateMetrics();
    renderSourceChecks();
  }
  if (addId) addBibliography(ref);
});

document.querySelector("#refreshReferencesButton").addEventListener("click", () => {
  updateMetrics();
  renderReferences();
  renderSourceChecks();
  scheduleFocusHighlights();
  scheduleLiveAcademicSearch();
});

document.querySelector("#runChecksButton").addEventListener("click", runChecks);
document.querySelector("#onlineSearchButton").addEventListener("click", onlineSearch);
document.querySelector("#exportButton").addEventListener("click", exportDoc);

document.querySelector("#googleButton").addEventListener("click", () => {
  const doc = activeDocument();
  els.googleInlinePanel.hidden = !els.googleInlinePanel.hidden;
  els.googleDocLinkInlineInput.value = googleDocEditUrl(doc);
  els.googleInlineMessage.textContent = doc.googleDocId
    ? googleSyncMessage(doc)
    : "Paste a shared edit link, then save it.";

  els.googleDocLinkInput.value = googleDocEditUrl(doc);
  els.googleDocIdDisplay.textContent = doc.googleDocId
    ? `Linked document ID: ${doc.googleDocId}`
    : "No document linked yet.";
});

document.querySelector("#saveGoogleDocLinkButton").addEventListener("click", (event) => {
  if (!saveGoogleDocLink()) {
    event.preventDefault();
  }
});

document.querySelector("#saveGoogleDocInlineButton").addEventListener("click", saveGoogleDocLink);

document.querySelector("#githubButton").addEventListener("click", () => {
  els.githubInlinePanel.hidden = !els.githubInlinePanel.hidden;
  renderGithubState();
  if (!els.githubInlinePanel.hidden) els.githubRepoInput.focus();
});

document.querySelector("#saveGithubRepoButton").addEventListener("click", saveGithubRepo);
document.querySelector("#pullGithubRepoButton").addEventListener("click", pullGithubSnapshot);
els.themeToggleButton.addEventListener("click", toggleTheme);

document.querySelectorAll("[data-rewrite]").forEach((button) => {
  button.addEventListener("click", () => {
    const selected = getSelectedText();
    els.rewriteOutput.value = rewriteText(selected, button.dataset.rewrite);
  });
});

document.querySelector("#replaceSelectionButton").addEventListener("click", () => {
  if (!lastSelection || !els.rewriteOutput.value.trim()) return;
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(lastSelection);
  insertAtCaret(escapeHtml(els.rewriteOutput.value));
  saveCurrentDocument();
  updateMetrics();
  runChecks();
});

window.addEventListener("beforeunload", saveCurrentDocument);

renderApp();
renderTheme();
persist();
scheduleGithubSnapshots();
