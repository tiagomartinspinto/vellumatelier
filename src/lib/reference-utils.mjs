export const stopWords = new Set([
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

export function tokenize(text) {
  return Array.from(
    new Set(
      String(text || "")
        .toLowerCase()
        .replace(/[^a-z0-9/ -]/g, " ")
        .split(/\s+/)
        .map((word) => word.trim())
        .filter((word) => word.length > 3 && !stopWords.has(word)),
    ),
  );
}

export function weightedOverlap(sourceTokens, refTokens) {
  const refSet = new Set(refTokens);
  const shared = sourceTokens.filter((token) => refSet.has(token));
  const denominator = Math.max(6, Math.min(sourceTokens.length, refTokens.length));
  return shared.length / denominator;
}

export function focusScores(text, topicKeywords, referenceCorpus) {
  const lower = String(text || "").toLowerCase();
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

export function detectTopic(text, topicKeywords, referenceCorpus) {
  const scored = focusScores(text, topicKeywords, referenceCorpus);
  return scored[0]?.score > 0 ? scored[0].topic : "";
}

export function referenceAuthors(ref) {
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

export function surnameFromAuthor(author) {
  const text = String(author || "").trim();
  if (!text) return "Unknown";
  if (text.includes(",")) return text.split(",")[0].trim();
  return text.split(/\s+/).at(-1) || text;
}

export function initialsFromAuthor(author) {
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

export function referenceYear(ref) {
  return String(ref.year || ref.date || "n.d.");
}
