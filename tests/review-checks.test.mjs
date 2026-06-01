import test from "node:test";
import assert from "node:assert/strict";

import { generateReviewChecks } from "../src/app/review-checks.mjs";

test("review checks flag missing doctoral framing in a sparse draft", () => {
  const checks = generateReviewChecks({
    text: "This article argues that archives matter for research writing.",
    typoMap: {},
    sourceMatches: [],
    paragraphTexts: ["This article argues that archives matter for research writing."],
    headings: ["Introduction", "Discussion", "Conclusion"],
    project: {},
    focusScores: [],
    hasInTextCitation: () => false,
    citationTokenCount: 0,
  });

  const titles = checks.map((check) => check.title);
  assert.ok(titles.includes("Research question is unclear"));
  assert.ok(titles.includes("Methodology explanation looks thin"));
  assert.ok(titles.includes("Unsupported claim"));
  assert.ok(titles.includes("Signposting between sections is light"));
});

test("review checks stay quiet when question, method, contribution, and citations are present", () => {
  const text =
    "In this section, the article argues that reflective drafting practices clarify revision decisions (Smith, 2024). " +
    "The study uses interview material and close textual analysis to explain the method and contribution of the work.";

  const checks = generateReviewChecks({
    text,
    typoMap: {},
    sourceMatches: [],
    paragraphTexts: [text],
    headings: ["Introduction", "Method", "Discussion"],
    project: {
      researchQuestion: "How do revision notes shape drafting decisions?",
      contribution: "It clarifies how revision planning supports doctoral writing.",
      methodology: "Interview material and textual analysis.",
      keywords: "revision, drafting",
    },
    focusScores: [{ topic: "revision", score: 18 }],
    hasInTextCitation: (value) => value.includes("(Smith, 2024)"),
    citationTokenCount: 1,
  });

  assert.deepEqual(checks, [
    {
      level: "ok",
      title: "No urgent issues",
      body: "The current pass looks sound for question, method, contribution, and citation coverage.",
    },
  ]);
});
