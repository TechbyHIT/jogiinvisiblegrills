import { SITE_CONFIG } from "@/config/site";
import { containsPlaceholders } from "@/lib/seo/placeholder-detection";

export type QualityScoreInput = {
  wordCount: number;
  minimumRequiredWordCount: number;
  contentReviewed: boolean;
  localDataVerified: boolean;
  hasUniqueMetadata: boolean;
  hasUniqueContent: boolean;
  hasValidCanonical: boolean;
  hasInternalLinks: boolean;
  hasValidSchema: boolean;
  similarityScore: number;
  entityQualityScore?: number;
  textFields?: string[];
};

export function computeQualityScore(input: QualityScoreInput): number {
  let score = input.entityQualityScore ?? 70;

  if (input.wordCount >= input.minimumRequiredWordCount) {
    score += 5;
  } else {
    score -= 15;
  }

  if (input.contentReviewed) score += 3;
  if (input.localDataVerified) score += 3;
  if (input.hasUniqueMetadata) score += 3;
  if (input.hasUniqueContent) score += 3;
  if (input.hasValidCanonical) score += 2;
  if (input.hasInternalLinks) score += 2;
  if (input.hasValidSchema) score += 2;

  if (input.similarityScore > SITE_CONFIG.maximumSimilarityScore) {
    score -= 20;
  } else if (input.similarityScore > 0.5) {
    score -= 8;
  }

  if (input.textFields?.some(containsPlaceholders)) {
    score -= 25;
  }

  return clampScore(score);
}

export function meetsMinimumQualityScore(score: number): boolean {
  return score >= SITE_CONFIG.minimumQualityScore;
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}
