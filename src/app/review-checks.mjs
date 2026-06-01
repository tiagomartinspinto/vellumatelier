import { countWords } from "../lib/text-utils.mjs";

function keywordList(value = "") {
  return String(value)
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function hasMethodLanguage(text) {
  return /\b(method|methodology|material|materials|data|interview|survey|case study|ethnograph|analysis|archive|participant|sample|corpus)\b/i.test(text);
}

function hasContributionLanguage(text) {
  return /\b(contribution|contributes|contribute|adds to|offers a|this (article|chapter|study|paper|project) (offers|contributes|argues|demonstrates))\b/i.test(text);
}

function hasSignpostingLanguage(text) {
  return /\b(in this section|in this chapter|in this article|the next section|the following section|first,|second,|finally,|to begin with|turning to|taken together|in what follows)\b/i.test(text);
}

export function generateReviewChecks({
  text,
  typoMap,
  sourceMatches,
  paragraphTexts,
  headings,
  project,
  focusScores,
  hasInTextCitation,
  citationTokenCount,
}) {
  const checks = [];
  const lowerWords = text.toLowerCase().match(/\b[\w'-]+\b/g) || [];
  const keywords = keywordList(project?.keywords || "");

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

  paragraphTexts
    .filter((paragraph) => countWords(paragraph) > 140)
    .slice(0, 2)
    .forEach((paragraph) => {
      checks.push({
        level: "warning",
        title: "Overly long paragraph",
        body: `${paragraph.slice(0, 170)}... Consider breaking this paragraph into clearer argumentative steps.`,
      });
    });

  const genericPhrases = [
    "delves into",
    "it is important to note",
    "in today's world",
    "a rich tapestry",
    "plays a crucial role",
    "multifaceted",
  ];
  genericPhrases.forEach((phrase) => {
    if (text.toLowerCase().includes(phrase)) {
      checks.push({
        level: "warning",
        title: "Generic phrasing",
        body: `"${phrase}" may read as generic. Replace it with a more specific academic claim.`,
      });
    }
  });

  const claimWords = ["shows", "proves", "demonstrates", "argues", "suggests", "indicates", "reveals"];
  const unsupportedClaims = text
    .split(/[.!?]\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence && claimWords.some((word) => sentence.toLowerCase().includes(word)))
    .filter((sentence) => !hasInTextCitation(sentence))
    .slice(0, 3);

  unsupportedClaims.forEach((sentence) => {
    checks.push({
      level: "warning",
      title: "Unsupported claim",
      body: `${sentence.slice(0, 160)}... Consider adding evidence or a citation.`,
    });
  });

  if (countWords(text) > 140 && citationTokenCount === 0) {
    checks.push({
      level: "warning",
      title: "Missing citations",
      body: "This draft is substantial enough to benefit from at least one explicit citation or note to source material.",
    });
  }

  if (!project?.researchQuestion?.trim()) {
    checks.push({
      level: "warning",
      title: "Research question is unclear",
      body: "Add a main research question in Project plan so the draft and review checks have a clearer anchor.",
    });
  }

  if (!project?.contribution?.trim() && !hasContributionLanguage(text)) {
    checks.push({
      level: "warning",
      title: "Missing contribution statement",
      body: "The draft does not yet make its contribution explicit. State what this chapter, article, or plan adds to the discussion.",
    });
  }

  if ((!project?.methodology?.trim() || project.methodology.trim().length < 18) && !hasMethodLanguage(text)) {
    checks.push({
      level: "warning",
      title: "Methodology explanation looks thin",
      body: "Add a clearer account of material, method, or analytical approach so readers can understand how the argument is supported.",
    });
  }

  if (keywords.length) {
    const missingKeywords = keywords.filter((keyword) => !text.toLowerCase().includes(keyword));
    if (missingKeywords.length > 0 && missingKeywords.length < keywords.length) {
      checks.push({
        level: "warning",
        title: "Terminology may be drifting",
        body: `Some project keywords are not appearing in the draft yet: ${missingKeywords.slice(0, 4).join(", ")}.`,
      });
    }
  } else {
    const focusSpread = focusScores
      .filter((item) => item.score >= 10)
      .slice(0, 3);
    if (focusSpread.length === 3 && focusSpread[0].score - focusSpread[2].score <= 7) {
      checks.push({
        level: "warning",
        title: "Terminology may be inconsistent",
        body: `The draft is currently split across ${focusSpread.map((item) => item.topic).join(", ")}. Check whether your core terms are named consistently.`,
      });
    }
  }

  if (headings.length >= 3 && !hasSignpostingLanguage(text)) {
    checks.push({
      level: "warning",
      title: "Signposting between sections is light",
      body: "With several sections already in place, add a few guiding sentences that explain how one section leads to the next.",
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
      body: "The current pass looks sound for question, method, contribution, and citation coverage.",
    });
  }

  return checks;
}
