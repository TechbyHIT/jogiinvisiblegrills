import type { AssembledPageContent, AssembledPageSection } from "@/lib/content/assemble-page-content";
import {
  assembleAreaServicePageContent,
  assembleCityServicePageContent,
  assembleServicePageContent,
} from "@/lib/content/assemble-page-content";
import {
  buildExpandedProgrammaticSections,
  createExpansionContext,
} from "@/lib/content/programmatic-content-expansion";
import {
  dedupeSectionParagraphs,
  ensureUniqueSectionIds,
  sectionIdPrefix,
} from "@/lib/content/long-form-helpers";
import type { SearchIntent } from "@/data/search-intents";
import type { ProgrammaticService } from "@/data/programmatic-services";
import type { AreaRecord, LocationRecord, ServiceRecord } from "@/types";

function intentIntro(
  serviceName: string,
  intent: SearchIntent,
  locationName: string,
): string {
  return `This page covers ${serviceName.toLowerCase()} ${intent.label.toLowerCase()} in ${locationName}. Jogendhra Safety Nets confirms honest service coverage, measurement-based quotations and professional installation — without separate doorway pages for every keyword variation.`;
}

export function assembleProgrammaticContent(input: {
  programmaticService: ProgrammaticService;
  parentService: ServiceRecord;
  location?: LocationRecord;
  area?: AreaRecord;
  intent?: SearchIntent;
}): AssembledPageContent {
  const { programmaticService, parentService, location, area, intent } = input;
  const displayName = programmaticService.name;

  let base: AssembledPageContent;

  if (area && location) {
    base = assembleAreaServicePageContent(parentService, location, area);
  } else if (location) {
    base = assembleCityServicePageContent(parentService, location);
  } else {
    base = assembleServicePageContent(parentService);
  }

  const locationLabel = area?.name ?? location?.name ?? "Bengaluru & Mysuru";
  const state = location?.state ?? "Karnataka";

  const expansionCtx = createExpansionContext({
    service: programmaticService,
    parentService,
    locationName: location?.name ?? "Bengaluru & Mysuru",
    state,
    placeName: area?.name ?? location?.name ?? "Bengaluru & Mysuru",
    intent,
  });

  const expandedSections = buildExpandedProgrammaticSections(expansionCtx);

  const intro =
    intent != null
      ? intentIntro(displayName, intent, locationLabel)
      : area
        ? `${displayName} in ${area.name}, ${location!.name}. ${base.intro}`
        : location
          ? `${displayName} in ${location.name}. ${base.intro}`
          : `${displayName} — ${base.intro}`;

  const renamedBase: AssembledPageSection[] = base.sections.map((s) => ({
    ...s,
    heading: s.heading?.replace(parentService.name, displayName) ?? s.heading,
  }));

  /** Expanded blocks already cover pricing, installation, materials, etc. */
  const overlappingPrefixes = new Set([
    "pricing",
    "installation",
    "materials",
    "safety",
    "maintenance",
    "search-intent",
    "faq-preview",
    "planning",
    "process-pricing",
    "pricing-enquiry",
    "specifications",
  ]);

  const coreSections = renamedBase.filter(
    (section) => !overlappingPrefixes.has(sectionIdPrefix(section.id)),
  );

  const allSections = dedupeSectionParagraphs(
    ensureUniqueSectionIds([...coreSections, ...expandedSections]),
  );
  const allText = [intro, ...allSections.flatMap((s) => s.paragraphs)];

  return {
    intro,
    sections: allSections,
    allText,
  };
}
