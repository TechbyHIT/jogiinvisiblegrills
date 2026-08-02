import { SEO_CONFIG } from "@/config/seo";
import { BUSINESS_CONFIG } from "@/config/business";
import { assemblePageContentByType } from "@/lib/content/assemble-page-content";
import { countWordsInFields } from "@/lib/content/word-count";
import { generateCanonical, hasValidCanonical } from "@/lib/seo/generate-canonical";
import { generateDescription } from "@/lib/seo/generate-description";
import { computeSimilarityScore } from "@/lib/seo/duplicate-detection";
import { computeQualityScore } from "@/lib/seo/quality-score";
import { generateTitle } from "@/lib/seo/generate-title";
import type {
  AreaRecord,
  BlogPostRecord,
  GuideRecord,
  LocationRecord,
  PageRecord,
  PageType,
  ProblemRecord,
  PropertyTypeRecord,
  ServiceRecord,
} from "@/types";

const now = "2026-07-29T00:00:00.000Z";

export type BuildPageRecordInput = {
  id: string;
  path: string;
  slug: string;
  pageType: PageType;
  h1: string;
  service?: ServiceRecord;
  location?: LocationRecord;
  area?: AreaRecord;
  propertyType?: PropertyTypeRecord;
  problem?: ProblemRecord;
  guide?: GuideRecord;
  blogPost?: BlogPostRecord;
  coreTitle?: string;
  coreSummary?: string;
  comparisonTexts?: Array<{ id: string; text: string }>;
  override?: Partial<PageRecord>;
};

function getMinimumWordCount(pageType: PageType): number {
  return SEO_CONFIG.wordCountTargets[pageType]?.min ?? 400;
}

function getEntityQualityScore(input: BuildPageRecordInput): number {
  return (
    input.service?.qualityScore ??
    input.location?.qualityScore ??
    input.area?.qualityScore ??
    input.propertyType?.qualityScore ??
    input.problem?.qualityScore ??
    input.guide?.qualityScore ??
    input.blogPost?.qualityScore ??
    80
  );
}

function getPublicationFields(input: BuildPageRecordInput) {
  const entity =
    input.service ??
    input.location ??
    input.area ??
    input.propertyType ??
    input.problem ??
    input.guide ??
    input.blogPost;

  return {
    publicationStatus: entity?.publicationStatus ?? ("published" as const),
    allowIndexing: entity?.allowIndexing ?? true,
    contentReviewed: entity?.contentReviewed ?? true,
    localDataVerified:
      input.location?.localDataVerified ??
      input.area?.localDataVerified ??
      (input.pageType === "core" ||
        input.pageType === "service" ||
        input.pageType === "guide" ||
        input.pageType === "blog" ||
        input.pageType === "solution" ||
        input.pageType === "property-type-service"),
  };
}

function buildContentText(input: BuildPageRecordInput): string[] {
  const assembled = assemblePageContentByType(input.pageType, {
    path: input.path,
    service: input.service,
    location: input.location,
    area: input.area,
    guide: input.guide,
    blogPost: input.blogPost,
    problem: input.problem,
    propertyType: input.propertyType,
  });

  if (assembled) {
    return assembled.allText;
  }

  if (input.problem) {
    return [
      input.problem.summary,
      input.problem.detailedDescription,
      ...input.problem.customerQuestions,
    ];
  }

  if (input.guide) {
    const guideContent = assemblePageContentByType("guide", { guide: input.guide });
    if (guideContent) {
      return guideContent.allText;
    }
  }

  if (input.blogPost) {
    const blogContent = assemblePageContentByType("blog", { blogPost: input.blogPost });
    if (blogContent) {
      return blogContent.allText;
    }
  }

  if (input.propertyType && input.service) {
    return [
      input.propertyType.summary,
      ...input.propertyType.recommendations,
      input.service.summary,
      input.service.introduction,
      input.service.detailedDescription,
    ];
  }

  if (input.location && !input.service && !input.area && input.pageType === "location") {
    const locationContent = assemblePageContentByType("location", {
      location: input.location,
    });
    if (locationContent) {
      return locationContent.allText;
    }
  }

  if (input.area && input.location && input.pageType === "area") {
    const areaContent = assemblePageContentByType("area", {
      area: input.area,
      location: input.location,
    });
    if (areaContent) {
      return areaContent.allText;
    }
  }

  return [input.coreSummary ?? BUSINESS_CONFIG.description];
}

export function buildPageRecord(input: BuildPageRecordInput): PageRecord {
  const contentText = buildContentText(input);
  const wordCount = countWordsInFields(contentText);

  const minimumRequiredWordCount = getMinimumWordCount(input.pageType);
  const similarityScore = input.comparisonTexts
    ? computeSimilarityScore(contentText.join(" "), input.comparisonTexts, input.id)
    : 0;

  const title = generateTitle({
    pageType: input.pageType,
    title: input.coreTitle ?? input.h1,
    locationName: input.location?.name,
    areaName: input.area?.name,
    serviceName: input.service?.name,
    propertyTypeName: input.propertyType?.name,
    problemName: input.problem?.name,
  });

  const metaDescription = generateDescription({
    pageType: input.pageType,
    summary:
      input.service?.summary ??
      input.location?.introduction ??
      input.area?.introduction ??
      input.problem?.summary ??
      input.guide?.summary ??
      input.blogPost?.summary ??
      input.coreSummary,
    locationName: input.location?.name,
    areaName: input.area?.name,
    serviceName: input.service?.name,
    propertyTypeName: input.propertyType?.name,
    problemName: input.problem?.name,
  });

  const canonicalUrl = generateCanonical(input.path);
  const publication = getPublicationFields(input);

  const baseRecord: PageRecord = {
    id: input.id,
    path: input.path,
    slug: input.slug,
    pageType: input.pageType,
    title,
    metaDescription,
    h1: input.h1,
    canonicalUrl,
    openGraphTitle: title,
    openGraphDescription: metaDescription,
    openGraphImage:
      input.service?.heroImage ?? BUSINESS_CONFIG.defaultOpenGraphImage,
    openGraphImageAlt: input.h1,
    twitterTitle: title,
    twitterDescription: metaDescription,
    serviceId: input.service?.id,
    locationId: input.location?.id,
    areaId: input.area?.id,
    propertyTypeId: input.propertyType?.id,
    problemId: input.problem?.id,
    guideId: input.guide?.id,
    blogPostId: input.blogPost?.id,
    publicationStatus: publication.publicationStatus,
    allowIndexing: publication.allowIndexing,
    contentReviewed: publication.contentReviewed,
    localDataVerified: publication.localDataVerified,
    qualityScore: 0,
    similarityScore,
    wordCount,
    minimumRequiredWordCount,
    hasUniqueMetadata: true,
    hasUniqueContent: similarityScore <= 0.7,
    hasValidCanonical: hasValidCanonical(input.path, canonicalUrl),
    hasInternalLinks: true,
    hasValidSchema: true,
    crawlPriority: SEO_CONFIG.crawlPriorityByType[input.pageType] ?? "medium",
    sitemapGroup: input.pageType,
    lastContentChangeAt: input.blogPost?.updatedAt ?? input.guide?.updatedAt ?? now,
    publishedAt: input.blogPost?.publishedAt ?? now,
    lastReviewedAt: input.guide?.reviewedAt ?? now,
    createdAt: now,
    updatedAt: now,
  };

  baseRecord.qualityScore = computeQualityScore({
    wordCount: baseRecord.wordCount,
    minimumRequiredWordCount: baseRecord.minimumRequiredWordCount,
    contentReviewed: baseRecord.contentReviewed,
    localDataVerified: baseRecord.localDataVerified,
    hasUniqueMetadata: baseRecord.hasUniqueMetadata,
    hasUniqueContent: baseRecord.hasUniqueContent,
    hasValidCanonical: baseRecord.hasValidCanonical,
    hasInternalLinks: baseRecord.hasInternalLinks,
    hasValidSchema: baseRecord.hasValidSchema,
    similarityScore: baseRecord.similarityScore,
    entityQualityScore: getEntityQualityScore(input),
    textFields: contentText,
  });

  return {
    ...baseRecord,
    ...input.override,
  };
}
