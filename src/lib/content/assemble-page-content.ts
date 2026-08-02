import {
  CORE_PAGE_MODULE_KEYS,
  CORE_FALLBACK_MODULE_KEYS,
  getContentModule,
  getContentModules,
  LOCATION_MODULE_KEYS,
  LONG_FORM_SCROLL_MODULE_KEYS,
  SHARED_AREA_MODULE_KEYS,
  SHARED_AREA_SERVICE_MODULE_KEYS,
  SHARED_BLOG_MODULE_KEYS,
  SHARED_GUIDE_MODULE_KEYS,
  SHARED_SERVICE_LOCATION_MODULE_KEYS,
  SHARED_SERVICE_MODULE_KEYS,
} from "@/data/content-modules";
import { BUSINESS_CONFIG } from "@/config/business";
import {
  buildAreaSearchIntentParagraphs,
  buildServiceSearchIntentParagraphs,
  flattenSectionParagraphs,
  splitIntoScrollSections,
} from "@/lib/content/long-form-helpers";
import type {
  AreaRecord,
  BlogPostRecord,
  GuideRecord,
  LocationRecord,
  PageType,
  ProblemRecord,
  PropertyTypeRecord,
  ServiceRecord,
} from "@/types";

export type AssembledPageSection = {
  id: string;
  heading?: string;
  paragraphs: string[];
};

export type AssembledPageContent = {
  intro: string;
  sections: AssembledPageSection[];
  allText: string[];
};

function localIntroForLocation(location: LocationRecord): string {
  const moduleKey = `local-intro-${location.slug}` as const;
  return (
    getContentModule(moduleKey) ??
    `${location.name} homeowners often request balcony safety, invisible grills and mosquito protection suited to local property types and outdoor exposure.`
  );
}

function localIntroForArea(area: AreaRecord, location: LocationRecord): string {
  return `${area.introduction} ${area.localDescription} Projects in ${area.name}, ${location.name} are planned with measurement-led quotations and practical installation steps.`;
}

function buildAreaLocalityParagraphs(
  area: AreaRecord,
  location: LocationRecord,
): string[] {
  const propertyList =
    area.propertyTypes.length > 0
      ? area.propertyTypes.join(", ")
      : "apartments and independent houses";
  const characteristics =
    area.localCharacteristics.length > 0
      ? area.localCharacteristics.join("; ").toLowerCase()
      : "mixed residential living";

  return [
    `${area.name} in ${location.name}, ${location.state} is a served locality where Jogendhra Safety Nets provides invisible grills, balcony safety nets, children and pet nets, mosquito nets, bird spikes and related utility installations. Coverage is confirmed during enquiry for openings in ${propertyList}.`,
    `Residential patterns in ${area.name} commonly include ${characteristics}. These patterns influence whether view-preserving invisible grills, flexible balcony mesh or mosquito systems should take priority on each opening. We assess usage first—drying, ventilation, children’s play or pet access—before recommending a specification.`,
    `Homeowners in ${area.name} often ask about pricing, installation timelines, society approvals and material grades. Final quotations follow measurement of width, height, railing condition and access constraints such as lift size or high-floor scaffolding. Combining multiple openings in one visit usually improves overall value compared with piecemeal work.`,
    `For apartment projects in ${area.name}, ${location.name}, we coordinate with society guidelines on drilling, visible hardware and work timing wherever they apply. Independent houses and villas may need custom bracket planning for irregular railings, terrace edges or stair voids. Each opening is measured individually rather than assumed from a city average.`,
    `Verified local notes for ${area.name}: ${area.verifiedLocalFacts.join(" ")} Nearby served areas and city pages help you understand coverage without inventing thin doorway pages for every pin code.`,
    `Quality installations in ${area.name} depend on sound anchors, correct spacing for the intended safety purpose, neat edge finishing and honest aftercare guidance. We explain SS304 versus higher-corrosion options where exposure warrants it, and we do not claim awards, fake branch offices or guaranteed rankings.`,
    `If you live near ${area.name} but your exact society is not named on this page, contact us with your address and photos. We confirm whether a visit is operationally available instead of auto-publishing every locality combination. Expanding served pockets follows real installation capacity and verified local data.`,
    `Popular related searches for ${area.name}—such as best ${area.name} safety nets, ${area.name} invisible grills price, dealers near me or installation cost—are answered on this locality page and linked service pages. We do not create separate thin URLs for every keyword modifier.`,
  ];
}

function buildAreaServiceLocalityParagraphs(
  service: ServiceRecord,
  location: LocationRecord,
  area: AreaRecord,
): string[] {
  const applications = service.applications.slice(0, 3).join(", ").toLowerCase();
  const materials = service.materials.slice(0, 2).join("; ");
  const problems = service.customerProblems.slice(0, 3).join("; ").toLowerCase();

  return [
    `${service.name} in ${area.name}, ${location.name} is planned for local property types (${area.propertyTypes.join(", ") || "residential openings"}) with measurement-led quotations. Typical applications include ${applications}.`,
    `Families in ${area.name} usually enquire about ${service.shortName.toLowerCase()} when they face issues such as ${problems}. During the visit we check opening dimensions, fixing surfaces, daily use of the balcony or window, and any society rules that affect drilling or visible hardware.`,
    `Material planning for ${service.shortName} in ${area.name} commonly considers ${materials}. Exact grade, spacing and bracket finish are confirmed after seeing the site—not from a generic city rate card. ${location.state} climate and building height influence durability and access planning.`,
    `Pricing for ${service.name} in ${area.name} depends on total size, material grade, required spacing, floor access, number of openings and finishing scope. Share photos and approximate measurements for a quicker initial assessment; final numbers follow on-site confirmation.`,
    `Installation steps for ${service.shortName} projects in ${area.name} follow the same quality sequence used citywide: inspection and measurement, marking and fixing, product fitting or cable tensioning, edge finishing, safety checks and handover with maintenance tips. We schedule around lift permissions and quiet hours where societies require them.`,
    `Local characteristics that shape ${service.shortName} work in ${area.name}: ${area.localCharacteristics.join("; ") || "mixed residential demand"}. Verified notes: ${area.verifiedLocalFacts.join(" ")}`,
    `Related searches such as ${service.shortName.toLowerCase()} ${area.name} price, best ${service.shortName.toLowerCase()} near ${area.name}, ${area.name} dealers or ${location.name} installation cost map to this page—not to separate doorway URLs. Browse the ${area.name} locality hub and ${location.name} city pages for broader coverage context.`,
    `Aftercare for ${service.shortName} in ${area.name} includes periodic visual checks after monsoon weather, avoiding heavy hanging loads on the system, and requesting re-tensioning or mesh repair if components look loose or damaged. Safety systems reduce risk but do not replace supervision of children or pets near open edges.`,
    `To enquire about ${service.name} in ${area.name}, ${location.name}, contact Jogendhra Safety Nets with locality details, floor level, opening photos and whether child safety, pet safety, mosquito control or view retention is your main priority. We confirm served coverage honestly before scheduling.`,
  ];
}

function longFormSharedModules(): string[] {
  return getContentModules([...LONG_FORM_SCROLL_MODULE_KEYS]);
}

export function assembleCorePageContent(path: string): AssembledPageContent {
  const routeModules = CORE_PAGE_MODULE_KEYS[path] ?? [];
  const fallbackModules = getContentModules(CORE_FALLBACK_MODULE_KEYS);
  const trailingModules = getContentModules([
    "cta-primary",
    "service-area-note",
    "guide-shared-enquiry-preparation",
    "trust-measurement-led",
    "core-shared-footer-context",
    "core-shared-service-promise",
  ]);
  const longForm = longFormSharedModules();
  const paragraphs = [
    ...getContentModules(routeModules),
    ...fallbackModules,
    ...trailingModules,
    ...longForm,
  ];
  const uniqueParagraphs = [...new Set(paragraphs)];
  const fallbackIntro = BUSINESS_CONFIG.description;

  const sections = splitIntoScrollSections(
    [
      {
        idPrefix: "overview",
        heading: "Overview",
        paragraphs: uniqueParagraphs.length > 0 ? uniqueParagraphs : [fallbackIntro],
      },
    ],
    2,
  );

  const allText = uniqueParagraphs.length > 0 ? uniqueParagraphs : [fallbackIntro];

  return {
    intro: allText[0] ?? fallbackIntro,
    sections,
    allText,
  };
}

export function assembleLocationPageContent(
  location: LocationRecord,
): AssembledPageContent {
  const locationModules = getContentModules(LOCATION_MODULE_KEYS[location.id] ?? []);
  const sharedModules = getContentModules([
    "location-apartment-context",
    "location-independent-house-context",
    "location-seasonal-demand",
    "location-service-coverage",
    "location-measurement-process",
  ]);
  const longForm = longFormSharedModules();
  const searchIntent = buildAreaSearchIntentParagraphs(
    { name: location.name },
    location,
  );

  const sections = splitIntoScrollSections(
    [
      {
        idPrefix: "introduction",
        heading: `${location.name} Overview`,
        paragraphs: [location.introduction, location.localDescription, ...locationModules],
      },
      {
        idPrefix: "characteristics",
        heading: `Local Characteristics in ${location.name}`,
        paragraphs: [
          ...location.localCharacteristics.map((item) => `${item}.`),
          ...location.serviceDemandNotes.map((item) => `${item}.`),
        ],
      },
      {
        idPrefix: "verified-facts",
        heading: "Verified Local Notes",
        paragraphs: location.verifiedLocalFacts,
      },
      {
        idPrefix: "residential-context",
        heading: "Residential Installation Context",
        paragraphs: sharedModules,
      },
      {
        idPrefix: "search-intent",
        heading: `Common Searches in ${location.name}`,
        paragraphs: searchIntent,
      },
      {
        idPrefix: "longform-depth",
        heading: "Planning, Pricing and Installation Guide",
        paragraphs: longForm,
      },
    ],
    2,
  );

  const allText = [
    location.introduction,
    location.localDescription,
    ...locationModules,
    ...location.localCharacteristics,
    ...location.serviceDemandNotes,
    ...location.verifiedLocalFacts,
    ...sharedModules,
    ...searchIntent,
    ...longForm,
  ];

  return {
    intro: location.introduction,
    sections,
    allText,
  };
}

export function assembleServicePageContent(service: ServiceRecord): AssembledPageContent {
  const sharedModules = getContentModules(SHARED_SERVICE_MODULE_KEYS);
  const longForm = longFormSharedModules();

  const sections = splitIntoScrollSections(
    [
      {
        idPrefix: "overview",
        heading: "Overview",
        paragraphs: [service.introduction, service.detailedDescription, ...sharedModules.slice(0, 2)],
      },
      {
        idPrefix: "problems",
        heading: "Common Customer Problems",
        paragraphs: service.customerProblems.map(
          (item) =>
            `Homeowners often contact us when they face this issue: ${item}. We assess the opening, discuss fixing options and recommend a specification suited to the property type and daily use of the balcony or window.`,
        ),
      },
      {
        idPrefix: "benefits",
        heading: "Benefits",
        paragraphs: service.benefits.map(
          (item) =>
            `${item}. This benefit matters for families who use balconies and windows regularly and want reliable protection without unnecessary visual bulk or maintenance burden.`,
        ),
      },
      {
        idPrefix: "features",
        heading: "Features",
        paragraphs: service.features.map((item) => `${item}.`),
      },
      {
        idPrefix: "applications",
        heading: "Applications",
        paragraphs: service.applications.map(
          (item) => `${service.shortName} is commonly used for ${item.toLowerCase()}.`,
        ),
      },
      {
        idPrefix: "materials",
        heading: "Materials",
        paragraphs: service.materials.map(
          (item) => `We use ${item.toLowerCase()} where appropriate for the site conditions.`,
        ),
      },
      {
        idPrefix: "specifications",
        heading: "Specifications",
        paragraphs: service.specifications.map((item) => `${item}.`),
      },
      {
        idPrefix: "installation",
        heading: "Installation Process",
        paragraphs: service.installationSteps.map(
          (step, index) => `Step ${index + 1}: ${step}.`,
        ),
      },
      {
        idPrefix: "planning",
        heading: "Planning and Quotation",
        paragraphs: [...sharedModules.slice(2), ...longForm],
      },
      {
        idPrefix: "safety",
        heading: "Safety Information",
        paragraphs: service.safetyInformation,
      },
      {
        idPrefix: "maintenance",
        heading: "Maintenance",
        paragraphs: service.maintenanceTips,
      },
      {
        idPrefix: "pricing",
        heading: "Pricing Factors",
        paragraphs: [
          getContentModule("pricing-disclaimer") ?? BUSINESS_CONFIG.pricingStatement,
          ...service.pricingFactors.map((item) => `Pricing also reflects ${item.toLowerCase()}.`),
        ],
      },
      {
        idPrefix: "faq-preview",
        heading: "Common Questions",
        paragraphs: service.customerQuestions.map(
          (item) => `Customers frequently ask: ${item}`,
        ),
      },
    ],
    2,
  );

  const allText = [
    service.summary,
    service.introduction,
    service.detailedDescription,
    ...sharedModules,
    ...flattenSectionParagraphs(sections),
    ...service.features,
    ...service.applications,
    ...service.materials,
    ...service.specifications,
    ...service.installationSteps,
    ...service.safetyInformation,
    ...service.maintenanceTips,
    ...service.pricingFactors,
    ...service.customerQuestions,
    ...service.searchIntents,
    ...service.secondaryKeywords,
    ...service.primaryKeywords,
    ...longForm,
  ];

  return {
    intro: service.introduction,
    sections,
    allText,
  };
}

export function assembleCityServicePageContent(
  service: ServiceRecord,
  location: LocationRecord,
): AssembledPageContent {
  const localIntro = `${localIntroForLocation(location)} ${service.shortName} installations here focus on ${service.applications.slice(0, 2).join(" and ").toLowerCase()} with materials suited to local conditions.`;
  const locationModules = getContentModules(LOCATION_MODULE_KEYS[location.id] ?? []);
  const sharedModules = getContentModules(SHARED_SERVICE_LOCATION_MODULE_KEYS);
  const longForm = longFormSharedModules();
  const searchIntent = buildServiceSearchIntentParagraphs(service, location);

  const sections = splitIntoScrollSections(
    [
      {
        idPrefix: "local-context",
        heading: `${service.shortName} in ${location.name}`,
        paragraphs: [localIntro, location.localDescription, ...locationModules.slice(0, 2)],
      },
      {
        idPrefix: "service-details",
        heading: "Service Details",
        paragraphs: [
          service.introduction,
          service.detailedDescription,
          ...service.benefits,
          ...service.features,
          ...service.applications,
          ...service.materials,
          ...service.specifications,
          ...service.safetyInformation,
          ...service.maintenanceTips,
        ],
      },
      {
        idPrefix: "local-characteristics",
        heading: `Why ${location.name} Homeowners Choose ${service.shortName}`,
        paragraphs: [
          ...location.localCharacteristics.map((item) => `${item}.`),
          ...location.serviceDemandNotes.map((item) => `${item}.`),
          ...locationModules.slice(2),
        ],
      },
      {
        idPrefix: "installation",
        heading: "Installation Approach",
        paragraphs: [
          ...service.installationSteps.map(
            (step, index) => `Step ${index + 1}: ${step}.`,
          ),
          ...sharedModules,
        ],
      },
      {
        idPrefix: "verified-facts",
        heading: "Local Notes",
        paragraphs: [...location.verifiedLocalFacts, getContentModule("service-area-note")].filter(
          (item): item is string => Boolean(item),
        ),
      },
      {
        idPrefix: "search-intent",
        heading: `Common ${service.shortName} Searches in ${location.name}`,
        paragraphs: searchIntent,
      },
      {
        idPrefix: "longform-depth",
        heading: "Measurement, Pricing and Aftercare",
        paragraphs: longForm,
      },
    ],
    2,
  );

  const allText = [
    localIntro,
    location.introduction,
    location.localDescription,
    ...locationModules,
    ...sharedModules,
    service.summary,
    service.introduction,
    service.detailedDescription,
    ...location.localCharacteristics,
    ...location.serviceDemandNotes,
    ...location.verifiedLocalFacts,
    ...service.customerProblems,
    ...service.benefits,
    ...service.features,
    ...service.applications,
    ...service.materials,
    ...service.specifications,
    ...service.installationSteps,
    ...service.safetyInformation,
    ...service.maintenanceTips,
    ...service.pricingFactors,
    ...service.customerQuestions,
    ...searchIntent,
    ...longForm,
  ];

  return {
    intro: localIntro,
    sections,
    allText,
  };
}

export function assembleAreaServicePageContent(
  service: ServiceRecord,
  location: LocationRecord,
  area: AreaRecord,
): AssembledPageContent {
  const localIntro = `${localIntroForArea(area, location)} For ${service.shortName}, we assess opening size, fixing options and finishing requirements specific to ${area.name}.`;
  const localityParagraphs = buildAreaServiceLocalityParagraphs(service, location, area);
  const sharedModules = getContentModules(SHARED_AREA_SERVICE_MODULE_KEYS);
  const searchIntent = buildAreaSearchIntentParagraphs(area, location, service);

  const sections = splitIntoScrollSections(
    [
      {
        idPrefix: "area-context",
        heading: `${service.shortName} in ${area.name}, ${location.name}`,
        paragraphs: [localIntro, area.localDescription, ...localityParagraphs.slice(0, 4)],
      },
      {
        idPrefix: "service-details",
        heading: "Service Details",
        paragraphs: [
          service.introduction,
          service.detailedDescription,
          ...service.benefits,
          ...service.features,
          ...service.applications,
          ...service.materials,
          ...service.specifications,
          ...service.safetyInformation,
          ...service.maintenanceTips,
          ...service.pricingFactors,
        ],
      },
      {
        idPrefix: "area-characteristics",
        heading: `Local Considerations in ${area.name}`,
        paragraphs: [
          ...area.localCharacteristics.map((item) => `${item}.`),
          ...area.verifiedLocalFacts,
          ...localityParagraphs.slice(4),
        ],
      },
      {
        idPrefix: "installation",
        heading: "Installation Steps",
        paragraphs: [
          ...service.installationSteps.map(
            (step, index) => `Step ${index + 1}: ${step}.`,
          ),
          ...sharedModules.slice(0, 8),
        ],
      },
      {
        idPrefix: "search-intent",
        heading: `${service.shortName} Searches in ${area.name}`,
        paragraphs: searchIntent,
      },
      {
        idPrefix: "pricing-enquiry",
        heading: "Pricing, Quality and Enquiry",
        paragraphs: [
          ...sharedModules.slice(8),
          ...service.customerQuestions.map(
            (question) =>
              `${question} For ${area.name}, ${location.name}, we answer this after reviewing opening photos and measurements rather than quoting a flat city-wide rate.`,
          ),
        ],
      },
    ],
    2,
  );

  const allText = [
    localIntro,
    area.introduction,
    area.localDescription,
    location.introduction,
    location.localDescription,
    location.name,
    ...localityParagraphs,
    ...sharedModules,
    ...searchIntent,
    service.summary,
    service.introduction,
    service.detailedDescription,
    ...area.localCharacteristics,
    ...area.verifiedLocalFacts,
    ...location.localCharacteristics,
    ...service.customerProblems,
    ...service.benefits,
    ...service.features,
    ...service.applications,
    ...service.materials,
    ...service.specifications,
    ...service.installationSteps,
    ...service.safetyInformation,
    ...service.maintenanceTips,
    ...service.pricingFactors,
    ...service.customerQuestions,
  ];

  return {
    intro: localIntro,
    sections,
    allText,
  };
}

export function assembleAreaPageContent(
  area: AreaRecord,
  location: LocationRecord,
): AssembledPageContent {
  const localityParagraphs = buildAreaLocalityParagraphs(area, location);
  const sharedModules = getContentModules(SHARED_AREA_MODULE_KEYS);
  const searchIntent = buildAreaSearchIntentParagraphs(area, location);

  const sections = splitIntoScrollSections(
    [
      {
        idPrefix: "area-intro",
        heading: `${area.name}, ${location.name}`,
        paragraphs: [
          area.introduction,
          area.localDescription,
          localIntroForArea(area, location),
          ...localityParagraphs.slice(0, 4),
        ],
      },
      {
        idPrefix: "characteristics",
        heading: `Local Characteristics in ${area.name}`,
        paragraphs: [
          ...area.localCharacteristics.map((item) => `${item}.`),
          ...area.verifiedLocalFacts,
          ...localityParagraphs.slice(4),
        ],
      },
      {
        idPrefix: "services-and-materials",
        heading: `Safety Services Available in ${area.name}`,
        paragraphs: sharedModules.slice(0, 12),
      },
      {
        idPrefix: "search-intent",
        heading: `Popular Searches in ${area.name}`,
        paragraphs: searchIntent,
      },
      {
        idPrefix: "process-pricing",
        heading: "Measurement, Pricing and Installation Process",
        paragraphs: sharedModules.slice(12),
      },
    ],
    2,
  );

  const allText = [
    area.introduction,
    area.localDescription,
    localIntroForArea(area, location),
    location.name,
    location.introduction,
    location.localDescription,
    ...area.localCharacteristics,
    ...area.verifiedLocalFacts,
    ...localityParagraphs,
    ...sharedModules,
    ...searchIntent,
  ];

  return {
    intro: area.introduction,
    sections,
    allText,
  };
}

export function assembleGuidePageContent(guide: GuideRecord): AssembledPageContent {
  const sharedModules = getContentModules(SHARED_GUIDE_MODULE_KEYS);
  const longForm = longFormSharedModules();
  const faqText = guide.faqs.flatMap((faq) => [faq.question, faq.answer]);

  const sections = splitIntoScrollSections(
    [
      {
        idPrefix: "summary",
        heading: "Guide Overview",
        paragraphs: [guide.summary, ...sharedModules.slice(0, 2)],
      },
      {
        idPrefix: "content",
        heading: guide.title,
        paragraphs: guide.content,
      },
      {
        idPrefix: "planning",
        heading: "Planning Your Installation",
        paragraphs: [...sharedModules.slice(2), ...longForm],
      },
      {
        idPrefix: "faqs",
        heading: "Frequently Asked Questions",
        paragraphs: guide.faqs.map((faq) => `${faq.question} ${faq.answer}`),
      },
    ],
    2,
  );

  const allText = [guide.summary, ...guide.content, ...sharedModules, ...longForm, ...faqText];

  return {
    intro: guide.summary,
    sections,
    allText,
  };
}

export function assembleBlogPageContent(blogPost: BlogPostRecord): AssembledPageContent {
  const sharedModules = getContentModules([
    ...SHARED_BLOG_MODULE_KEYS,
    ...SHARED_AREA_MODULE_KEYS,
  ]);
  const faqText = blogPost.faqs.flatMap((faq) => [faq.question, faq.answer]);
  const depthParagraphs = [
    `${blogPost.title} is written for homeowners evaluating practical safety upgrades across Bengaluru and Mysuru and other served localities—not as generic national filler. Local property types, society rules and climate exposure change which product fits each opening.`,
    `Use this article together with our service pages, city pages and locality pages. Keyword searches for price, dealers, best options or near-me intent should land on those canonical URLs rather than thin duplicate articles. Measurement-led quotations remain the basis for project decisions.`,
    `If you are ready for a site visit after reading, share balcony or window photos, approximate sizes, locality name and whether child safety, pet safety, mosquito control or view retention is the priority. We confirm coverage honestly and schedule based on operational availability.`,
    `Quality installations depend on sound anchors, correct spacing, neat finishing and seasonal inspection habits. Whether you choose invisible grills, balcony nets or mosquito systems, the decision should follow how each opening is used every day in your apartment or independent house—not a one-size marketing claim.`,
  ];

  const sections = splitIntoScrollSections(
    [
      {
        idPrefix: "summary",
        heading: "Article Summary",
        paragraphs: [blogPost.summary, ...depthParagraphs, ...sharedModules.slice(0, 2)],
      },
      {
        idPrefix: "content",
        heading: blogPost.title,
        paragraphs: blogPost.content,
      },
      {
        idPrefix: "context",
        heading: "Local Context and Next Steps",
        paragraphs: [...sharedModules.slice(2), ...longFormSharedModules()],
      },
      {
        idPrefix: "faqs",
        heading: "Related Questions",
        paragraphs: blogPost.faqs.map((faq) => `${faq.question} ${faq.answer}`),
      },
    ],
    2,
  );

  const allText = [
    blogPost.summary,
    ...depthParagraphs,
    ...blogPost.content,
    ...sharedModules,
    ...longFormSharedModules(),
    ...faqText,
  ];

  return {
    intro: blogPost.summary,
    sections,
    allText,
  };
}

export function assembleSolutionPageContent(
  problem: ProblemRecord,
): AssembledPageContent {
  const sharedModules = getContentModules(SHARED_AREA_MODULE_KEYS);
  const questionParagraphs = problem.customerQuestions.map(
    (question) =>
      `${question} The answer depends on opening size, railing design, floor height and how the balcony or window is used daily. We confirm the right ${problem.name.toLowerCase()} approach after measurement rather than recommending one product for every home.`,
  );
  const depth = [
    `${problem.name} is a common residential concern across apartments and independent houses in Bengaluru, Bangalore and Mysore. ${problem.detailedDescription}`,
    `Families researching ${problem.name.toLowerCase()} often compare invisible grills, balcony safety nets, children safety nets, pet nets and mosquito systems. The best fit depends on risk type, view preference, mesh spacing needs and society guidelines—not on a single marketed “best” product.`,
    `Pricing for ${problem.name.toLowerCase()} solutions follows measurement of openings, material grade, spacing, access difficulty and total quantity. Search phrases such as ${problem.name.toLowerCase()} price, best dealers or near me should lead to this solution page and linked services—not separate thin keyword URLs.`,
    `Installation planning includes site inspection, material confirmation, society coordination where required, careful fixing and handover with maintenance guidance. Safety systems reduce risk but do not replace adult supervision for children or pets near open edges.`,
    `Browse related services linked from this page, then contact Jogendhra Safety Nets with photos and locality details for a measurement-based assessment in your served area.`,
  ];

  const sections = splitIntoScrollSections(
    [
      {
        idPrefix: "overview",
        heading: problem.name,
        paragraphs: [problem.summary, ...depth],
      },
      {
        idPrefix: "planning",
        heading: "How We Approach This Problem",
        paragraphs: [...sharedModules, ...longFormSharedModules()],
      },
      {
        idPrefix: "faqs",
        heading: "Common Questions",
        paragraphs: questionParagraphs,
      },
    ],
    2,
  );

  return {
    intro: problem.summary,
    sections,
    allText: [problem.summary, ...depth, ...sharedModules, ...longFormSharedModules(), ...questionParagraphs],
  };
}

export function assemblePropertyTypeServicePageContent(
  propertyType: PropertyTypeRecord,
  service: ServiceRecord,
): AssembledPageContent {
  const sharedModules = getContentModules(SHARED_AREA_SERVICE_MODULE_KEYS);
  const depth = [
    `${service.name} for ${propertyType.name.toLowerCase()} is planned around how these properties typically use balconies, windows and utility openings. ${propertyType.summary}`,
    `Recommendations for ${propertyType.name.toLowerCase()}: ${propertyType.recommendations.join(". ")}. These notes guide first discussions; final specifications follow measurement of each opening.`,
    `${service.introduction} ${service.detailedDescription}`,
    `For ${propertyType.name.toLowerCase()} projects, ${service.shortName.toLowerCase()} work commonly addresses: ${service.customerProblems.slice(0, 3).join("; ").toLowerCase()}. Benefits include ${service.benefits.slice(0, 4).join("; ").toLowerCase()}.`,
    `Materials often considered: ${service.materials.join("; ")}. Applications include ${service.applications.join(", ").toLowerCase()}. Pricing depends on size, grade, spacing, access and finishing—not a single flat rate for every ${propertyType.name.toLowerCase()} building.`,
    `Search intent such as ${service.shortName.toLowerCase()} for ${propertyType.name.toLowerCase()}, price or best installers maps to this page and related city or locality URLs. We serve Bengaluru and Mysuru and listed areas with honest coverage confirmation.`,
  ];

  const sections = splitIntoScrollSections(
    [
      {
        idPrefix: "overview",
        heading: `${service.name} for ${propertyType.name}`,
        paragraphs: depth,
      },
      {
        idPrefix: "details",
        heading: "Specifications and Installation",
        paragraphs: [
          ...service.features,
          ...service.specifications,
          ...service.installationSteps.map((step, i) => `Step ${i + 1}: ${step}.`),
          ...service.safetyInformation,
          ...service.maintenanceTips,
          ...service.pricingFactors,
        ],
      },
      {
        idPrefix: "guidance",
        heading: "Planning Guidance",
        paragraphs: [...sharedModules, ...longFormSharedModules()],
      },
    ],
    2,
  );

  return {
    intro: depth[0] ?? service.summary,
    sections,
    allText: [
      ...depth,
      ...propertyType.recommendations,
      ...service.benefits,
      ...service.features,
      ...service.applications,
      ...service.materials,
      ...service.specifications,
      ...service.installationSteps,
      ...service.safetyInformation,
      ...service.maintenanceTips,
      ...service.pricingFactors,
      ...sharedModules,
      ...longFormSharedModules(),
    ],
  };
}

export function assemblePageContentByType(
  pageType: PageType,
  entities: {
    path?: string;
    service?: ServiceRecord;
    location?: LocationRecord;
    area?: AreaRecord;
    guide?: GuideRecord;
    blogPost?: BlogPostRecord;
    problem?: ProblemRecord;
    propertyType?: PropertyTypeRecord;
  },
): AssembledPageContent | null {
  if (pageType === "core" && entities.path) {
    return assembleCorePageContent(entities.path);
  }

  if (pageType === "location" && entities.location) {
    return assembleLocationPageContent(entities.location);
  }

  if (pageType === "area" && entities.area && entities.location) {
    return assembleAreaPageContent(entities.area, entities.location);
  }

  if (pageType === "service" && entities.service) {
    return assembleServicePageContent(entities.service);
  }

  if (pageType === "guide" && entities.guide) {
    return assembleGuidePageContent(entities.guide);
  }

  if (pageType === "blog" && entities.blogPost) {
    return assembleBlogPageContent(entities.blogPost);
  }

  if (pageType === "solution" && entities.problem) {
    return assembleSolutionPageContent(entities.problem);
  }

  if (pageType === "property-type-service" && entities.propertyType && entities.service) {
    return assemblePropertyTypeServicePageContent(
      entities.propertyType,
      entities.service,
    );
  }

  if (
    pageType === "service-location" &&
    entities.service &&
    entities.location
  ) {
    return assembleCityServicePageContent(entities.service, entities.location);
  }

  if (
    pageType === "service-area" &&
    entities.service &&
    entities.location &&
    entities.area
  ) {
    return assembleAreaServicePageContent(
      entities.service,
      entities.location,
      entities.area,
    );
  }

  return null;
}
