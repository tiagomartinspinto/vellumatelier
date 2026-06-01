import { escapeHtml, stripTags } from "../lib/text-utils.mjs";

export function exportFilename(docTitle = "", suffix = "") {
  const base = String(docTitle || "")
    .replace(/[^\w-]+/g, "-")
    .toLowerCase() || "document";
  return `${base}${suffix}.doc`;
}

export function humanizeProjectMode(value = "") {
  return String(value || "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function projectMetadataEntries(doc = {}, project = {}) {
  return [
    ["Document type", project.mode],
    ["Draft status", doc.status || project.workStatus || ""],
    ["Project status", project.workStatus],
    ["Researcher", project.researcherName],
    ["Programme or field", project.programmeField],
    ["Supervisor(s)", project.supervisors],
    ["Target venue", project.targetVenue],
    ["Deadline", project.deadline],
    ["Keywords", project.keywords],
    ["Citation style", doc.style?.toUpperCase?.() || "APA"],
  ].filter(([, value]) => String(value || "").trim());
}

export function buildExportRoot(doc = {}, documentRef = document) {
  const root = documentRef.createElement("div");
  root.innerHTML = doc.content || "";
  return root;
}

export function extractSection(root, matcher) {
  const headings = Array.from(root.querySelectorAll("h1, h2, h3, h4"));
  const heading = headings.find((item) => matcher(item.textContent.trim().toLowerCase()));
  if (!heading) return "";

  const sectionNodes = [];
  let sibling = heading.nextElementSibling;
  while (sibling && !/^H[1-4]$/.test(sibling.tagName)) {
    sectionNodes.push(sibling);
    sibling = sibling.nextElementSibling;
  }

  const html = sectionNodes.map((node) => node.outerHTML).join("");
  heading.remove();
  sectionNodes.forEach((node) => node.remove());
  return html.trim();
}

export function removeBibliography(root) {
  const bibliography = root.querySelector("[data-bibliography-section='true']");
  if (!bibliography) return "";
  const html = bibliography.innerHTML.trim();
  bibliography.remove();
  return html;
}

export function buildSupervisorAppendixHtml(project = {}) {
  const items = [
    ["Meeting notes", project.meetingNotes],
    ["Questions for supervisor", project.supervisorQuestions],
    ["Revision tasks", project.revisionTasks],
    ["Next deadline", project.nextDeadline],
    ["Supervisor comments", project.supervisorComments],
  ].filter(([, value]) => String(value || "").trim());

  if (!items.length) return "";

  return items
    .map(
      ([label, value]) =>
        `<section><h3>${escapeHtml(label)}</h3><p>${escapeHtml(String(value)).replace(/\n/g, "<br />")}</p></section>`,
    )
    .join("");
}

export function buildAcademicExportHtml({
  title,
  subtitle = "",
  metadataEntries = [],
  abstractHtml = "",
  bodyHtml = "",
  bibliographyHtml = "",
  appendixHtml = "",
}) {
  const metadataHtml = metadataEntries.length
    ? `<dl class="export-metadata">${metadataEntries
        .map(
          ([label, value]) =>
            `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(
              label === "Document type" ? humanizeProjectMode(value) : String(value),
            )}</dd></div>`,
        )
        .join("")}</dl>`
    : "";

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(title)}</title>
    <style>
      body { font-family: "Times New Roman", Times, serif; color: #111; line-height: 1.55; margin: 36px; }
      h1, h2, h3 { margin: 0 0 14px; }
      h1 { font-size: 24px; }
      h2 { font-size: 16px; margin-top: 30px; }
      h3 { font-size: 14px; margin-top: 22px; }
      p, li, blockquote { font-size: 12pt; }
      blockquote { margin: 0 0 0 18px; padding-left: 14px; border-left: 2px solid #b5b5b5; }
      .export-kicker { margin: 0 0 10px; color: #555; font-size: 10pt; text-transform: uppercase; }
      .export-subtitle { margin: 0 0 22px; color: #444; }
      .export-metadata { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 18px; margin: 0 0 24px; }
      .export-metadata div { break-inside: avoid; }
      .export-metadata dt { font-weight: 700; font-size: 10pt; color: #555; }
      .export-metadata dd { margin: 4px 0 0; font-size: 11pt; }
      .export-section { margin-top: 28px; }
      .export-note { margin-top: 34px; color: #555; font-size: 10pt; }
    </style>
  </head>
  <body>
    <p class="export-kicker">Vellum Atelier Word-compatible export</p>
    <h1>${escapeHtml(title)}</h1>
    ${subtitle ? `<p class="export-subtitle">${escapeHtml(subtitle)}</p>` : ""}
    ${metadataHtml}
    ${abstractHtml ? `<section class="export-section"><h2>Abstract</h2>${abstractHtml}</section>` : ""}
    <section class="export-section">${bodyHtml}</section>
    ${appendixHtml ? `<section class="export-section"><h2>Supervisor workflow</h2>${appendixHtml}</section>` : ""}
    ${bibliographyHtml ? `<section class="export-section"><h2>Bibliography</h2>${bibliographyHtml}</section>` : ""}
    <p class="export-note">This export is Word-compatible HTML saved with a .doc extension. It is not a true .docx file.</p>
  </body>
</html>`;
}

export function plainTextForExport(content = "") {
  return stripTags(String(content || "")).trim();
}
