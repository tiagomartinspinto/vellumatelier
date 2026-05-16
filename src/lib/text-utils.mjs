export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

export function stripHtml(html) {
  const div = globalThis.document?.createElement
    ? document.createElement("div")
    : { innerHTML: "", innerText: "", textContent: "" };
  div.innerHTML = html;
  return div.innerText || div.textContent || "";
}

export function countWords(text) {
  return (String(text || "").match(/\b[\w'-]+\b/g) || []).length;
}

export function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function slugify(value) {
  return String(value || "section")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "section";
}

export function stripTags(value) {
  if (!globalThis.document?.createElement) {
    return String(value || "").replace(/<[^>]+>/g, "");
  }
  const div = document.createElement("div");
  div.innerHTML = String(value || "");
  return div.textContent || "";
}
