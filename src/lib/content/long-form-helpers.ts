import type { AssembledPageSection } from "@/lib/content/assemble-page-content";
import { BUSINESS_CONFIG } from "@/config/business";

export type LongFormGroup = {
  idPrefix: string;
  heading: string;
  paragraphs: string[];
};

/** Split paragraph blocks into smaller scroll sections for long-form reading. */
export function splitIntoScrollSections(
  groups: LongFormGroup[],
  paragraphsPerSection = 2,
): AssembledPageSection[] {
  const sections: AssembledPageSection[] = [];

  for (const group of groups) {
    const unique = [...new Set(group.paragraphs.filter(Boolean))];
    if (unique.length === 0) continue;

    for (let i = 0; i < unique.length; i += paragraphsPerSection) {
      const chunk = unique.slice(i, i + paragraphsPerSection);
      const index = Math.floor(i / paragraphsPerSection);

      sections.push({
        id: `${group.idPrefix}-${index}`,
        heading: index === 0 ? group.heading : undefined,
        paragraphs: chunk,
      });
    }
  }

  return sections;
}

/** Search-intent paragraphs mapped to one canonical page (not separate doorway URLs). */
export function buildSearchIntentParagraphs(input: {
  placeName: string;
  locationName: string;
  state: string;
  serviceShortName?: string;
}): string[] {
  const { placeName, locationName, state, serviceShortName } = input;
  const loc =
    placeName.toLowerCase() === locationName.toLowerCase()
      ? locationName
      : `${placeName}, ${locationName}`;
  const svc = serviceShortName?.toLowerCase() ?? "safety installations";
  const svcTitle = serviceShortName ?? "Invisible grills and safety nets";

  return [
    `Searches for ${svc} in ${loc} usually include price, cost, installation, dealers, suppliers, best options and near-me intent. This page answers those questions in one useful locality hub instead of publishing separate thin URLs for every keyword modifier.`,
    `${svcTitle} pricing in ${loc}, ${state} depends on opening measurements, material grade, spacing requirements, floor access and total quantity—not a flat city rate card. Share photos and approximate sizes during enquiry for a faster initial assessment; final numbers follow on-site confirmation.`,
    `Installation timelines for ${svc} in ${placeName} vary with society permissions, lift access, opening count and weather. We schedule honestly based on operational availability rather than promising unrealistic same-day work when fixing quality would be compromised.`,
    `When comparing ${svc} dealers or suppliers near ${loc}, evaluate specified material grade, bracket type, edge finishing and visit logistics—not headline price alone. Written scope notes prevent mismatched expectations on installation day.`,
    `Best ${svc} choices in ${placeName} follow how each balcony or window is used daily—drying, ventilation, children’s play, pet access or mosquito control. Product selection should follow measurement, not marketing claims about a single universal best system.`,
    `${svcTitle} near ${placeName} is confirmed during enquiry. We serve listed localities with honest coverage boundaries and do not auto-publish every pin code combination. Contact us with your society or landmark details for a practical response.`,
    `Apartment societies in ${loc} may require approval before drilling or external hardware. Submit bracket drawings and material samples early where rules apply. We plan work around quiet hours and lift booking requirements common in ${locationName} gated communities.`,
    `Material planning for ${state} residential openings considers inland humidity, monsoon exposure and building height. SS304 stainless cables suit many inland apartments; higher-corrosion grades may be discussed where exposure warrants. Mesh UV rating matters for long-term balcony net performance.`,
    `After ${svc} installation in ${placeName}, periodic checks after monsoon weather help spot loose anchors, reduced cable tension or mesh damage early. Safety systems reduce risk but do not replace supervision of children or pets near open edges.`,
    `Combining multiple openings in one ${loc} visit—main balcony, bedroom windows and utility areas—often improves overall value compared with piecemeal mobilisation. Prioritise highest-risk openings first if budget is phased across months.`,
    `Related ${placeName} searches for ${svc} company, service, suppliers or cost map here and to linked service pages for ${locationName}. We avoid doorway-page spam while keeping genuinely useful local information on canonical URLs.`,
    `To enquire about ${svcTitle} in ${loc}, contact ${BUSINESS_CONFIG.name} with floor level, property type, opening photos and your main priority—child safety, pet safety, mosquito control or view retention. We confirm served coverage before scheduling.`,
  ];
}

export function buildServiceSearchIntentParagraphs(
  service: { shortName: string; name: string },
  location: { name: string; state: string },
): string[] {
  return buildSearchIntentParagraphs({
    placeName: location.name,
    locationName: location.name,
    state: location.state,
    serviceShortName: service.shortName,
  }).map((paragraph) =>
    paragraph.replace(
      `${location.name}, ${location.name}`,
      location.name,
    ),
  );
}

export function buildAreaSearchIntentParagraphs(
  area: { name: string },
  location: { name: string; state: string },
  service?: { shortName: string },
): string[] {
  return buildSearchIntentParagraphs({
    placeName: area.name,
    locationName: location.name,
    state: location.state,
    serviceShortName: service?.shortName,
  });
}

/** Flatten assembled sections back to paragraph list for word-count / SEO indexing. */
export function flattenSectionParagraphs(sections: AssembledPageSection[]): string[] {
  return sections.flatMap((section) => section.paragraphs);
}

export function sectionIdPrefix(id: string): string {
  return id.replace(/-\d+$/, "");
}

/** Guarantee unique DOM / React keys when merging base + expanded section lists. */
export function ensureUniqueSectionIds(sections: AssembledPageSection[]): AssembledPageSection[] {
  const seen = new Map<string, number>();

  return sections.map((section) => {
    const count = seen.get(section.id) ?? 0;
    seen.set(section.id, count + 1);
    if (count === 0) return section;
    return { ...section, id: `${section.id}-${count + 1}` };
  });
}

/** Drop repeated paragraphs across merged sections (keeps first occurrence). */
export function dedupeSectionParagraphs(sections: AssembledPageSection[]): AssembledPageSection[] {
  const seen = new Set<string>();

  return sections
    .map((section) => ({
      ...section,
      paragraphs: section.paragraphs.filter((paragraph) => {
        const key = paragraph.trim().toLowerCase();
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      }),
    }))
    .filter((section) => section.paragraphs.length > 0);
}
