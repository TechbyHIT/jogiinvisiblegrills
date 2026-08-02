export function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter((token) => token.length > 2),
  );
}

export function jaccardSimilarityFromTokens(
  tokensA: Set<string>,
  tokensB: Set<string>,
): number {
  if (tokensA.size === 0 && tokensB.size === 0) {
    return 0;
  }

  let intersection = 0;
  for (const token of tokensA) {
    if (tokensB.has(token)) {
      intersection += 1;
    }
  }

  const union = tokensA.size + tokensB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

export function jaccardSimilarity(textA: string, textB: string): number {
  return jaccardSimilarityFromTokens(tokenize(textA), tokenize(textB));
}

export type TokenizedCandidate = {
  id: string;
  tokens: Set<string>;
};

export function pretokenizeCandidates(
  candidates: Array<{ id: string; text: string }>,
): TokenizedCandidate[] {
  return candidates.map((candidate) => ({
    id: candidate.id,
    tokens: tokenize(candidate.text),
  }));
}

export function findHighestSimilarity(
  targetText: string,
  candidates: Array<{ id: string; text: string }>,
): { id: string; score: number } {
  return findHighestSimilarityFromTokens(tokenize(targetText), pretokenizeCandidates(candidates));
}

export function findHighestSimilarityFromTokens(
  targetTokens: Set<string>,
  candidates: TokenizedCandidate[],
  excludeId?: string,
): { id: string; score: number } {
  let highest = { id: "", score: 0 };

  for (const candidate of candidates) {
    if (excludeId && candidate.id === excludeId) {
      continue;
    }
    const score = jaccardSimilarityFromTokens(targetTokens, candidate.tokens);
    if (score > highest.score) {
      highest = { id: candidate.id, score };
    }
  }

  return highest;
}

export function computeSimilarityScore(
  targetText: string,
  candidates: Array<{ id: string; text: string }>,
  excludeId?: string,
): number {
  const filtered = candidates.filter((candidate) => candidate.id !== excludeId);
  if (filtered.length === 0) {
    return 0;
  }

  return findHighestSimilarityFromTokens(
    tokenize(targetText),
    pretokenizeCandidates(filtered),
  ).score;
}

export function computeSimilarityScorePretokenized(
  targetText: string,
  candidates: TokenizedCandidate[],
  excludeId?: string,
): number {
  if (candidates.length === 0) {
    return 0;
  }

  return findHighestSimilarityFromTokens(tokenize(targetText), candidates, excludeId).score;
}
