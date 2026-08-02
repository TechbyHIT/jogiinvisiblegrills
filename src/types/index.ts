export type PublicationStatus =
  | "draft"
  | "review"
  | "published"
  | "noindex"
  | "archived";

export type CrawlPriority = "high" | "medium" | "low";

export type PageType =
  | "core"
  | "service"
  | "location"
  | "area"
  | "service-location"
  | "service-area"
  | "solution"
  | "property-type-service"
  | "guide"
  | "blog";

export type ServiceRecord = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  categoryId: string;
  publicationStatus: PublicationStatus;
  allowIndexing: boolean;
  summary: string;
  introduction: string;
  detailedDescription: string;
  customerProblems: string[];
  benefits: string[];
  features: string[];
  applications: string[];
  materials: string[];
  specifications: string[];
  installationSteps: string[];
  safetyInformation: string[];
  maintenanceTips: string[];
  pricingFactors: string[];
  suitablePropertyTypes: string[];
  primaryKeywords: string[];
  secondaryKeywords: string[];
  customerQuestions: string[];
  searchIntents: string[];
  relatedServiceIds: string[];
  heroImage: string;
  galleryImages: string[];
  contentReviewed: boolean;
  qualityScore: number;
  createdAt: string;
  updatedAt: string;
};

export type LocationType =
  | "state"
  | "district"
  | "city"
  | "town"
  | "area"
  | "locality";

export type LocationRecord = {
  id: string;
  slug: string;
  name: string;
  locationType: LocationType;
  parentId?: string;
  state: string;
  district?: string;
  publicationStatus: PublicationStatus;
  allowIndexing: boolean;
  isServed: boolean;
  introduction: string;
  localDescription: string;
  nearbyLocationIds: string[];
  landmarkIds: string[];
  propertyTypes: string[];
  localCharacteristics: string[];
  serviceDemandNotes: string[];
  verifiedLocalFacts: string[];
  latitude?: number;
  longitude?: number;
  localDataVerified: boolean;
  contentReviewed: boolean;
  qualityScore: number;
  createdAt: string;
  updatedAt: string;
};

export type AreaRecord = {
  id: string;
  slug: string;
  name: string;
  locationId: string;
  publicationStatus: PublicationStatus;
  allowIndexing: boolean;
  isServed: boolean;
  introduction: string;
  localDescription: string;
  propertyTypes: string[];
  localCharacteristics: string[];
  nearbyAreaIds: string[];
  landmarkIds: string[];
  verifiedLocalFacts: string[];
  localDataVerified: boolean;
  contentReviewed: boolean;
  qualityScore: number;
  createdAt: string;
  updatedAt: string;
};

export type LandmarkRecord = {
  id: string;
  slug: string;
  name: string;
  locationId: string;
  areaId?: string;
  description: string;
  publicationStatus: PublicationStatus;
};

export type PropertyTypeRecord = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  recommendations: string[];
  suitableServiceIds: string[];
  publicationStatus: PublicationStatus;
  allowIndexing: boolean;
  contentReviewed: boolean;
  qualityScore: number;
};

export type ProblemRecord = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  detailedDescription: string;
  relatedServiceIds: string[];
  customerQuestions: string[];
  publicationStatus: PublicationStatus;
  allowIndexing: boolean;
  contentReviewed: boolean;
  qualityScore: number;
};

export type GuideRecord = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string[];
  relatedServiceIds: string[];
  relatedLocationIds: string[];
  faqs: Array<{ question: string; answer: string }>;
  publicationStatus: PublicationStatus;
  allowIndexing: boolean;
  contentReviewed: boolean;
  qualityScore: number;
  wordCount: number;
  reviewedAt: string;
  updatedAt: string;
};

export type BlogPostRecord = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string[];
  category: string;
  author: string;
  relatedServiceIds: string[];
  relatedGuideIds: string[];
  faqs: Array<{ question: string; answer: string }>;
  publicationStatus: PublicationStatus;
  allowIndexing: boolean;
  contentReviewed: boolean;
  qualityScore: number;
  wordCount: number;
  publishedAt: string;
  updatedAt: string;
};

export type PageRecord = {
  id: string;
  path: string;
  slug: string;
  pageType: PageType;
  title: string;
  metaDescription: string;
  h1: string;
  canonicalUrl: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: string;
  openGraphImageAlt: string;
  twitterTitle: string;
  twitterDescription: string;
  serviceId?: string;
  locationId?: string;
  areaId?: string;
  propertyTypeId?: string;
  problemId?: string;
  guideId?: string;
  blogPostId?: string;
  publicationStatus: PublicationStatus;
  allowIndexing: boolean;
  contentReviewed: boolean;
  localDataVerified: boolean;
  qualityScore: number;
  similarityScore: number;
  wordCount: number;
  minimumRequiredWordCount: number;
  hasUniqueMetadata: boolean;
  hasUniqueContent: boolean;
  hasValidCanonical: boolean;
  hasInternalLinks: boolean;
  hasValidSchema: boolean;
  crawlPriority: CrawlPriority;
  sitemapGroup: string;
  lastContentChangeAt?: string;
  publishedAt?: string;
  lastReviewedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type PageIndexabilityInput = Pick<
  PageRecord,
  | "publicationStatus"
  | "allowIndexing"
  | "qualityScore"
  | "contentReviewed"
  | "localDataVerified"
  | "hasUniqueMetadata"
  | "hasUniqueContent"
  | "hasValidCanonical"
  | "hasInternalLinks"
  | "hasValidSchema"
  | "wordCount"
  | "minimumRequiredWordCount"
  | "similarityScore"
>;

export type InternalLink = {
  href: string;
  label: string;
  rel?: string;
};

export type BreadcrumbItem = {
  name: string;
  href: string;
};
