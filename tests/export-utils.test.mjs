import test from "node:test";
import assert from "node:assert/strict";

import {
  buildAcademicExportHtml,
  exportFilename,
  humanizeProjectMode,
  projectMetadataEntries,
} from "../src/app/export-utils.mjs";

test("exportFilename keeps Word-compatible naming stable", () => {
  assert.equal(exportFilename("Chapter 1: Draft"), "chapter-1-draft.doc");
  assert.equal(exportFilename("Supervisor copy", "-supervisor"), "supervisor-copy-supervisor.doc");
});

test("humanizeProjectMode makes internal project names readable", () => {
  assert.equal(humanizeProjectMode("dissertation-chapter"), "Dissertation Chapter");
  assert.equal(humanizeProjectMode("research-plan"), "Research Plan");
});

test("projectMetadataEntries omits empty values and keeps meaningful ones", () => {
  const entries = projectMetadataEntries(
    { status: "Draft", style: "apa" },
    {
      mode: "journal-article",
      workStatus: "Drafting",
      researcherName: "Test Researcher",
      targetVenue: "",
    },
  );

  assert.deepEqual(entries, [
    ["Document type", "journal-article"],
    ["Draft status", "Draft"],
    ["Project status", "Drafting"],
    ["Researcher", "Test Researcher"],
    ["Citation style", "APA"],
  ]);
});

test("buildAcademicExportHtml includes the Word-compatible note", () => {
  const html = buildAcademicExportHtml({
    title: "Draft title",
    bodyHtml: "<p>Body text</p>",
  });

  assert.match(html, /Word-compatible export/i);
  assert.match(html, /not a true \.docx/i);
});
