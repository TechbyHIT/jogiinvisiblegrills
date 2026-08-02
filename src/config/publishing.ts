export const PUBLISHING_CONFIG = {
  maxBatchSize: 500,
  defaultBatchSize: 100,
  phases: {
    1: [
      "core",
      "service",
      "location",
      "service-location",
      "guide",
    ] as const,
    2: ["area", "service-area", "solution", "property-type-service"] as const,
    3: ["blog", "service-area", "solution"] as const,
  },
  requireExplicitBatchSize: true,
} as const;
