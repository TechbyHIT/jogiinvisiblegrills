import type { AssembledPageSection } from "@/lib/content/assemble-page-content";
import { splitIntoScrollSections } from "@/lib/content/long-form-helpers";
import type { SearchIntent } from "@/data/search-intents";
import type { ProgrammaticService } from "@/data/programmatic-services";
import type { ServiceRecord } from "@/types";

export type ContentExpansionContext = {
  service: ProgrammaticService;
  parentService: ServiceRecord;
  locationName: string;
  state: string;
  placeName: string;
  intent?: SearchIntent;
  seed: number;
};

function hashSeed(...parts: string[]): number {
  let h = 2166136261;
  const s = parts.join("|");
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(pool: T[], seed: number, count: number, offset = 0): T[] {
  if (pool.length === 0) return [];
  const out: T[] = [];
  for (let i = 0; i < count; i++) {
    out.push(pool[(seed + offset + i * 13) % pool.length]!);
  }
  return out;
}

type ParagraphBuilder = (ctx: ContentExpansionContext) => string;

function kw(ctx: ContentExpansionContext) {
  const { service, placeName, locationName, intent } = ctx;
  const loc = placeName === locationName ? locationName : `${placeName}, ${locationName}`;
  return {
    svc: service.name,
    svcLower: service.name.toLowerCase(),
    loc,
    place: placeName,
    city: locationName,
    state: ctx.state,
    intent: intent?.label.toLowerCase() ?? "",
    intentSlug: intent?.slug ?? "",
    cat: service.categorySlug.replace(/-/g, " "),
    parent: ctx.parentService.shortName,
    short: service.shortName,
  };
}

/** Unique detail lines rotated by seed so pages differ meaningfully. */
function detailLine(ctx: ContentExpansionContext, index: number): string {
  const k = kw(ctx);
  const facets = [
    `opening width and height for ${k.svcLower}`,
    `railing profile and corner count on ${k.svc} projects`,
    `floor access and lift size for ${k.svcLower} materials`,
    `society quiet hours during ${k.svc} drilling`,
    `SS304 versus SS316 choice for ${k.svcLower}`,
    `cable or mesh spacing for child safety with ${k.svc}`,
    `finer base mesh for pets near ${k.svcLower}`,
    `powder-coated versus stainless brackets on ${k.svc}`,
    `monsoon aftercare for ${k.svcLower} in ${k.city}`,
    `multi-opening mobilisation savings for ${k.svc}`,
    `photo-assisted ballpark quotes for ${k.svcLower}`,
    `written grade names on ${k.svc} quotations`,
    `GST and transport line items for ${k.svcLower}`,
    `high-floor corridor protection during ${k.svc} work`,
    `AC ledge clearances around ${k.svcLower}`,
    `drying-line conflicts with ${k.svc} layouts`,
    `L-shaped balcony segments for ${k.svcLower}`,
    `French-window framing notes for ${k.svc}`,
    `duct-area bird pressure near ${k.svcLower}`,
    `terrace edge fall risks addressed by ${k.svc}`,
    `commercial night-work windows for ${k.svcLower}`,
    `residential view-retention goals with ${k.svc}`,
    `warranty wording after ${k.svcLower} handover`,
    `retensioning visits for ${k.svc} cables or cords`,
    `brand labels kept with ${k.svcLower} handover notes`,
    `near-me coverage confirmation for ${k.svc} in ${k.place}`,
    `premium finishing expectations for ${k.svcLower}`,
    `best-fit selection among ${k.svc} variants`,
    `hire criteria for ${k.svcLower} installers`,
    `buy-versus-install packages for ${k.svc}`,
  ];
  const verbs = [
    "Plan",
    "Document",
    "Confirm",
    "Compare",
    "Prioritise",
    "Review",
    "Measure",
    "Schedule",
    "Clarify",
    "Validate",
  ];
  const outcomes = [
    `so ${k.loc} quotations stay accurate`,
    `before booking ${k.svcLower} installation in ${k.place}`,
    `when comparing dealers near ${k.city}`,
    `to avoid rework after ${k.svc} fitting`,
    `for safer long-term ${k.svcLower} performance`,
    `while keeping society rules in ${k.place} intact`,
    `without relying on flat city rate cards`,
    `and keep internal links useful for related searches`,
  ];

  const facet = facets[(ctx.seed + index * 17) % facets.length]!;
  const verb = verbs[(ctx.seed + index * 7) % verbs.length]!;
  const outcome = outcomes[(ctx.seed + index * 11) % outcomes.length]!;
  return `${verb} ${facet} ${outcome}. Seed nuance ${((ctx.seed + index * 29) % 97) + 1}: local railing age and finish in ${k.place} change fixing choices for ${k.short}.`;
}

function buildUniqueDetailParagraphs(ctx: ContentExpansionContext, count: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < count; i++) out.push(detailLine(ctx, i));
  return [...new Set(out)];
}

const PRICING_PARAGRAPHS: ParagraphBuilder[] = [
  (ctx) => {
    const k = kw(ctx);
    return `${k.svc} price in ${k.loc}, ${k.state} is quoted after measuring each opening—not from a generic rate card. Width, height, railing profile, material grade (SS304 vs SS316), cable spacing, bracket finish and floor access all change the final number. Share photos on WhatsApp for a faster ballpark before the site visit.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Cost factors for ${k.svcLower} in ${k.place} include total running metres, corner brackets, transport within ${k.city}, GST and any society-mandated protection during work. Comparing three quotes? Ask each vendor to specify grade, spacing and what's included in installation versus extras on the day.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Best ${k.svcLower} near ${k.place} balances safety purpose with daily use—ventilation, drying, views and child or pet behaviour. A lower headline price without specification detail often hides thinner cables, wider spacing or incomplete edge finishing that affects long-term safety.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Premium ${k.svcLower} rates in ${k.loc} usually cover marine-grade or named mesh options, powder-coated or stainless brackets and cleaner edge finishing. Budget packages may omit corner kits or society floor protection—read the quote line by line.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Dealers and suppliers for ${k.svcLower} in ${k.loc} should confirm served coverage honestly. Jogendhra Safety Nets serves listed Bengaluru and Mysuru localities with measurement-led quotations—we do not invent branch offices in every pin code.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `${k.svc} charges near ${k.place} should list product, labour, transport and GST separately. Hidden scaffolding or night-work premiums frustrate homeowners—ask for them upfront when comparing offers.`;
  },
];

const INSTALLATION_PARAGRAPHS: ParagraphBuilder[] = [
  (ctx) => {
    const k = kw(ctx);
    return `Professional ${k.svcLower} installation in ${k.place} starts with marking bracket positions on sound structural points—concrete parapet, MS railing core or approved wall zones. Drilling without checking hollow tiles or weak mortar leads to failure; we re-measure before fixing on installation day.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Installation timeline for ${k.svc} in ${k.city} depends on opening count, society lift booking, weather and material readiness. Single-balcony projects may complete in hours; whole-apartment packages need planned mobilisation. We communicate realistic slots rather than overpromising same-day work when quality would suffer.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Society approvals in ${k.place} gated communities may require bracket drawings, material samples and work-hour restrictions. Submit society forms early; delays in NOC are a common reason projects slip—not installation skill. We adapt scheduling around approved windows.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `High-floor ${k.svcLower} projects in ${k.loc} need safe material handling—long cables, mesh rolls and frame sections through lifts or stairwells. Edge protection and floor covers during drilling keep common areas clean; neighbour courtesy matters in dense ${k.city} apartment corridors.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Hire ${k.svcLower} installers in ${k.place} who tension cables evenly, finish edges without sharp protrusions and demonstrate latch or track operation before leaving. Handover photos help future repair visits.`;
  },
];

const MATERIALS_PARAGRAPHS: ParagraphBuilder[] = [
  (ctx) => {
    const k = kw(ctx);
    return `Material selection for ${k.svcLower} in ${k.state} considers humidity, monsoon exposure and coastal versus inland corrosion risk. SS316 marine-grade cables suit harsh exposure; SS304 works for many inland ${k.city} apartments when maintained. Mesh UV rating matters for balcony nets facing direct sun.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Bracket finishing for ${k.svc} in ${k.place} can be powder-coated or stainless to match society aesthetics. Visible hardware colour is often discussed with apartment committees before work begins—planning prevents post-installation complaints from neighbours or management.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Spacing specifications for child and pet safety in ${k.loc} may require tighter cable gaps or finer mesh at lower railing zones. Cats exploit horizontal rails—finer mesh or combined grill-and-net planning addresses squeeze points adults might overlook during self-assessment.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Premium ${k.svcLower} materials near ${k.place} should be named on the quotation—cable diameter, mesh GSM or brand, and fastener grade. Unspecified “standard quality” is difficult to warranty or compare.`;
  },
];

const LOCAL_PARAGRAPHS: ParagraphBuilder[] = [
  (ctx) => {
    const k = kw(ctx);
    return `${k.place} in ${k.city} has mixed apartments, villas and independent houses where ${k.svcLower} demand is steady for balcony fall protection, mosquito control and bird management. Local building age and railing types vary block to block—site measurement beats assumptions from neighbouring flats.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Families in ${k.loc} often search ${k.svcLower} price, cost, installation, near me, best, premium, dealers, contractors and company options. This page consolidates useful answers on one canonical URL with deep local detail and crawlable internal links.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Nearby ${k.city} localities with similar property patterns may share installation approaches with ${k.place}. Browse linked area and service pages below for coverage context—we confirm honest service boundaries during enquiry rather than claiming every suburb automatically.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Top ${k.svcLower} near me searches for ${k.place} should lead to measurement guidance, material grades and society process notes—not empty doorway pages repeating the locality name.`;
  },
];

const MAINTENANCE_PARAGRAPHS: ParagraphBuilder[] = [
  (ctx) => {
    const k = kw(ctx);
    return `After ${k.svcLower} installation in ${k.place}, inspect anchors and tension after monsoon seasons. Cables loosen, mesh frays and screws corrode slowly—quarterly visual checks extend system life. Do not hang heavy loads on safety cables or nets beyond their design purpose.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Repair and maintenance for ${k.svc} in ${k.loc} should address root cause—retensioning, bracket replacement or mesh patch—not cosmetic cover-ups. Share photos of the issue; we advise whether a service visit is needed or simple owner maintenance suffices.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `${k.svc} maintenance near ${k.place} is easier when handover notes list grades, spacing and install date. Keep those photos—service calls go faster with clear history.`;
  },
];

const APARTMENT_PARAGRAPHS: ParagraphBuilder[] = [
  (ctx) => {
    const k = kw(ctx);
    return `Apartment ${k.svcLower} in ${k.place} high-rises requires lift size checks for long materials, worker entry registers and noise-conscious drilling hours. We coordinate with security and facility teams where required so installation day runs smoothly for your household and neighbours.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Corner balconies and L-shaped openings in ${k.loc} need custom bracket planning—template kits rarely fit cleanly. ${k.svc} quotations should count each segment separately rather than averaging a single width across unequal sides.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Residential ${k.svcLower} in ${k.place} gated communities often needs committee approval for visible hardware colour. Share sample photos early to avoid rework after installation.`;
  },
];

const COMMERCIAL_PARAGRAPHS: ParagraphBuilder[] = [
  (ctx) => {
    const k = kw(ctx);
    return `Commercial ${k.svcLower} in ${k.loc}—offices, schools, hospitals and industrial sites—may require phased floors, night slots and signed method statements. Share access rules during enquiry so scheduling is realistic.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Facility managers buying ${k.svc} near ${k.place} should request itemised rates per opening type and written warranty covering workmanship and materials separately.`;
  },
];

const COMPARISON_PARAGRAPHS: ParagraphBuilder[] = [
  (ctx) => {
    const k = kw(ctx);
    return `Comparing ${k.svcLower} quotes in ${k.loc}: Vendor A may price SS304 at tighter spacing while Vendor B quotes wider gaps at lower cost—child safety outcomes differ. Always compare specification sheets, not just totals.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Traditional MS grills versus ${k.svcLower} in ${k.place}: heavy bars block views and airflow; cable systems preserve outlook while meeting fall-protection goals when spacing is correct. Some societies prefer low-profile hardware—discuss aesthetics before ordering.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `DIY ${k.svcLower} kits rarely match professional tensioning and anchor analysis in ${k.city} apartments. Improper fixing on hollow tiles or weak parapets creates false confidence—professional installation includes load-aware bracket placement.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Best ${k.svcLower} offers near ${k.place} name mesh or cable brands in writing. Unbranded “sale” stock may save upfront cost but fail UV or tensile expectations within seasons.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Openable versus fixed ${k.svcLower} designs in ${k.loc} trade cleaning access for daily security. Utility balconies and AC service zones often need hinged or removable sections—plan during measurement, not after installation.`;
  },
];

const SEASONAL_PARAGRAPHS: ParagraphBuilder[] = [
  (ctx) => {
    const k = kw(ctx);
    return `Monsoon preparation for ${k.svcLower} in ${k.place}: clear drain paths on tracks, rinse salt residue on coastal-facing cables if applicable, and check mesh perimeter cords for looseness after storms.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Summer ventilation in ${k.loc} apartments balances ${k.svcLower} spacing with mosquito or bird pressures—finer mesh helps insects but reduces airflow; discuss priorities room by room during site visits.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Festival and guest season in ${k.city} often triggers last-minute ${k.svcLower} enquiries. Early measurement avoids rushed installations with compromised finishing—book inspections before peak holiday weeks when possible.`;
  },
];

const SAFETY_PARAGRAPHS: ParagraphBuilder[] = [
  (ctx) => {
    const k = kw(ctx);
    return `Child safety with ${k.svcLower} in ${k.loc} requires spacing suited to age and climb behaviour—furniture away from railings matters as much as hardware. Nets and grills reduce risk but do not replace supervision.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Pet safety for cats and dogs near ${k.svcLower} in ${k.place}: finer mesh at lower zones blocks squeeze attempts; dogs may lean on nets—perimeter cord integrity and tension checks are essential after installation.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Fall protection standards for ${k.svcLower} in ${k.city} high-rises depend on anchor pull-out strength and cable tensile rating. We avoid unsafe fixing on decorative tiles or brittle edges that cannot carry load.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Emergency egress planning: ${k.svcLower} on stair voids or landings in ${k.loc} must not block required escape paths where building rules apply—discuss removable or openable sections with your consultant if needed.`;
  },
];

const WARRANTY_PARAGRAPHS: ParagraphBuilder[] = [
  (ctx) => {
    const k = kw(ctx);
    return `Warranty scope for ${k.svcLower} in ${k.place} should distinguish material defects, workmanship issues and environmental wear excluded after storm damage. Keep handover notes with grades, spacing and installation date.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Service calls for ${k.svc} in ${k.loc} go faster when you share installation photos, approximate date and a short video of the issue—retensioning visits are simpler when records exist.`;
  },
];

const PREMIUM_NEAR_BEST_PARAGRAPHS: ParagraphBuilder[] = [
  (ctx) => {
    const k = kw(ctx);
    return `Premium ${k.svcLower} near me in ${k.place} means documented materials, measurement-led quotes and clean finishing—not a marketing badge on a thin page. Jogendhra Safety Nets focuses on specification honesty for ${k.loc} homes.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Best ${k.svcLower} near ${k.place} is the system that matches your opening use: child safety, pet safety, pigeon control or view retention. One “best” product does not fit every balcony in ${k.city}.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Top ${k.svc} searches in ${k.loc} combine price, cost, near me, premium residential, commercial, dealers, contractors, hire, buy, quotes and repair. Use the keyword links below to open the intent page that matches how you searched.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Looking to hire ${k.svcLower} installers near ${k.place}? Confirm coverage, ask for similar project photos and request written grades before paying advances.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Buy ${k.svcLower} in ${k.loc} after site measurement whenever possible. Online sale prices rarely survive real railing conditions, corner counts and society rules in ${k.city}.`;
  },
];

const MEASUREMENT_PARAGRAPHS: ParagraphBuilder[] = [
  (ctx) => {
    const k = kw(ctx);
    return `Free site inspection for ${k.svcLower} in ${k.place} covers opening sizes, fixing surfaces, access constraints and society guidelines. Bring prior quotes if you want a like-for-like comparison.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Photo-assisted quotes for ${k.svc} near ${k.place} help triage urgency, but final numbers follow on-site confirmation—especially for irregular or L-shaped openings in ${k.loc}.`;
  },
  (ctx) => {
    const k = kw(ctx);
    return `Measurement checklist: width, height, railing depth, corner count, floor level, lift size and whether AC units or drying lines affect ${k.svcLower} layout in ${k.place}.`;
  },
];

function intentParagraphs(slug: string): ParagraphBuilder[] {
  const shared: ParagraphBuilder[] = [
    (ctx) => {
      const k = kw(ctx);
      return `This page answers ${k.svcLower} ${slug.replace(/-/g, " ")} intent for ${k.loc}. Scroll for pricing factors, installation process, materials, safety notes and internal links to related localities.`;
    },
    (ctx) => {
      const k = kw(ctx);
      return `Customers searching ${k.svcLower} ${slug.replace(/-/g, " ")} near ${k.place} also compare best, premium, near me, price and cost pages—use the keyword hub below to browse without thin duplicate doorway URLs.`;
    },
  ];

  const specific: Record<string, ParagraphBuilder[]> = {
    price: [
      (ctx) =>
        `${kw(ctx).svc} price in ${kw(ctx).loc} reflects measured openings, grade and access—not a flat per-sq-ft sticker. Request itemised quotes listing cable diameter, spacing, bracket type and visit logistics.`,
    ],
    cost: [
      (ctx) =>
        `Total ${kw(ctx).svcLower} cost near ${kw(ctx).place} drops when multiple openings share one mobilisation. Phase work by risk—main balcony first, bedroom windows next—if budget spreads across months.`,
    ],
    "near-me": [
      (ctx) =>
        `${kw(ctx).svc} near me in ${kw(ctx).place} is confirmed during enquiry with your address and photos. We serve listed Bengaluru and Mysuru pockets operationally—not nationwide claims.`,
    ],
    best: [
      (ctx) =>
        `Best ${kw(ctx).svcLower} in ${kw(ctx).loc} means fit-for-purpose specification: correct spacing, sound anchors and neat finishing—not the lowest headline rate without details.`,
    ],
    premium: [
      (ctx) =>
        `Premium ${kw(ctx).svcLower} in ${kw(ctx).place} typically uses named SS grades or branded mesh, cleaner brackets and documented warranty scope. Ask what “premium” includes before comparing totals.`,
    ],
    top: [
      (ctx) =>
        `Top ${kw(ctx).svcLower} options near ${kw(ctx).place} are those that match child, pet or bird priorities for each opening—not a single ranked product for all of ${kw(ctx).city}.`,
    ],
    installation: [
      (ctx) =>
        `${kw(ctx).svc} installation contractors in ${kw(ctx).city} should explain fixing method, warranty scope and society coordination before booking. Measurement-led planning prevents mismatched expectations.`,
    ],
    company: [
      (ctx) =>
        `Choosing a ${kw(ctx).svcLower} company in ${kw(ctx).place}—verify served coverage, material grades quoted in writing and after-sales support. Jogendhra Safety Nets focuses on honest local service.`,
    ],
    contractors: [
      (ctx) =>
        `Licensed ${kw(ctx).svcLower} contractors for ${kw(ctx).loc} apartments should carry basic safety practices for high-floor work and protect common areas during drilling.`,
    ],
    services: [
      (ctx) =>
        `Our ${kw(ctx).svcLower} services in ${kw(ctx).city} include site assessment, specification advice, professional installation and maintenance guidance. Related categories can be bundled in one visit.`,
    ],
    repair: [
      (ctx) =>
        `${kw(ctx).svc} repair in ${kw(ctx).place} may involve retensioning cables, replacing corroded brackets or patching mesh perimeter cords. Send close-up photos to judge whether a visit is required.`,
    ],
    dealers: [
      (ctx) =>
        `${kw(ctx).svcLower} dealers in ${kw(ctx).loc} should supply specified grades—not unnamed generic materials. Dealers who install and warrant their own work simplify accountability.`,
    ],
    suppliers: [
      (ctx) =>
        `Suppliers of ${kw(ctx).svcLower} components near ${kw(ctx).city} vary in grade and compatibility. Field installers often catch fit issues suppliers miss from catalogue sales alone.`,
    ],
    manufacturers: [
      (ctx) =>
        `Named manufacturers on ${kw(ctx).svcLower} quotes in ${kw(ctx).place} should match materials delivered. Keep brand labels with your handover sheet.`,
    ],
    commercial: [
      (ctx) =>
        `Commercial ${kw(ctx).svcLower} in ${kw(ctx).loc} needs access rules, phased scheduling and itemised rates per opening type for facility managers.`,
    ],
    residential: [
      (ctx) =>
        `Residential ${kw(ctx).svcLower} near ${kw(ctx).place} prioritises view, airflow, drying space and child or pet safety depending on how each balcony is used daily.`,
    ],
    maintenance: [
      (ctx) =>
        `${kw(ctx).svc} maintenance in ${kw(ctx).place} includes monsoon checks, gentle cleaning and retensioning when cables look slack—do not hang heavy loads on the system.`,
    ],
    quotes: [
      (ctx) =>
        `${kw(ctx).svcLower} quotes for ${kw(ctx).loc} get faster with photos and approximate sizes. Final billing follows measurement—compare like-for-like specifications across vendors.`,
    ],
    charges: [
      (ctx) =>
        `${kw(ctx).svc} charges near ${kw(ctx).place} should separate product, labour, transport and GST. Ask about scaffolding or night-work extras before confirming.`,
    ],
    rates: [
      (ctx) =>
        `${kw(ctx).svcLower} rates in ${kw(ctx).city} vary with floor height, corners and society protection needs—rate cards without measurement are only rough guides.`,
    ],
    hire: [
      (ctx) =>
        `Hire ${kw(ctx).svcLower} installers near ${kw(ctx).place} who show similar project photos, explain spacing and leave written handover notes.`,
    ],
    buy: [
      (ctx) =>
        `Buy ${kw(ctx).svcLower} in ${kw(ctx).loc} after confirming grades and installation scope. Catalogue-only purchases often miss railing realities in ${kw(ctx).city} apartments.`,
    ],
    sale: [
      (ctx) =>
        `${kw(ctx).svcLower} sale offers near ${kw(ctx).place} should still list cable or mesh grade and spacing. Deep discounts without specs are rarely comparable.`,
    ],
    offer: [
      (ctx) =>
        `Current ${kw(ctx).svc} offers in ${kw(ctx).loc} may bundle multi-opening discounts—ask whether transport and GST are included before accepting.`,
    ],
    shop: [
      (ctx) =>
        `Shop for ${kw(ctx).svcLower} near ${kw(ctx).place} with after-sales retensioning in mind. Local installation capacity matters more than distant catalogue pricing.`,
    ],
  };

  return [...(specific[slug] ?? []), ...shared];
}

const TOPIC_GROUPS: Array<{ idPrefix: string; heading: string; builders: ParagraphBuilder[] }> = [
  { idPrefix: "premium-near-best", heading: "Premium, Near Me & Best Local Options", builders: PREMIUM_NEAR_BEST_PARAGRAPHS },
  { idPrefix: "pricing", heading: "Pricing, Cost, Rates & Quotation Factors", builders: PRICING_PARAGRAPHS },
  { idPrefix: "install", heading: "Installation Process & Hiring Installers", builders: INSTALLATION_PARAGRAPHS },
  { idPrefix: "materials", heading: "Materials & Specifications", builders: MATERIALS_PARAGRAPHS },
  { idPrefix: "measure", heading: "Measurement, Inspection & Quote Checklist", builders: MEASUREMENT_PARAGRAPHS },
  { idPrefix: "local", heading: "Local Context for This Locality", builders: LOCAL_PARAGRAPHS },
  { idPrefix: "maint", heading: "Maintenance & Repair", builders: MAINTENANCE_PARAGRAPHS },
  { idPrefix: "apartment", heading: "Apartments & High-Rises", builders: APARTMENT_PARAGRAPHS },
  { idPrefix: "commercial", heading: "Commercial & Residential Use Cases", builders: COMMERCIAL_PARAGRAPHS },
  { idPrefix: "compare", heading: "Comparisons & Buying Guide", builders: COMPARISON_PARAGRAPHS },
  { idPrefix: "season", heading: "Seasonal & Weather Notes", builders: SEASONAL_PARAGRAPHS },
  { idPrefix: "safety", heading: "Safety Planning for Children & Pets", builders: SAFETY_PARAGRAPHS },
  { idPrefix: "warranty", heading: "Warranty & After-Sales Service", builders: WARRANTY_PARAGRAPHS },
];

function expandTopic(
  ctx: ContentExpansionContext,
  group: (typeof TOPIC_GROUPS)[number],
  rounds: number,
): string[] {
  const paragraphs: string[] = [];
  for (let r = 0; r < rounds; r++) {
    paragraphs.push(
      ...pick(group.builders, ctx.seed + r, group.builders.length, r * 3).map((fn) => fn(ctx)),
    );
  }
  return [...new Set(paragraphs)];
}

export function buildExpandedProgrammaticSections(ctx: ContentExpansionContext): AssembledPageSection[] {
  const groups = TOPIC_GROUPS.map((group) => ({
    idPrefix: group.idPrefix,
    heading: group.heading,
    paragraphs: expandTopic(ctx, group, 8),
  }));

  if (ctx.intent) {
    const intentBuilders = intentParagraphs(ctx.intent.slug);
    groups.unshift({
      idPrefix: "intent-keywords",
      heading: `${ctx.service.name} ${ctx.intent.label} in ${ctx.placeName} — What Customers Ask`,
      paragraphs: [
        ...intentBuilders.map((fn) => fn(ctx)),
        ...pick(PRICING_PARAGRAPHS, ctx.seed, 4).map((fn) => fn(ctx)),
        ...pick(INSTALLATION_PARAGRAPHS, ctx.seed + 1, 3).map((fn) => fn(ctx)),
        ...pick(PREMIUM_NEAR_BEST_PARAGRAPHS, ctx.seed + 2, 3).map((fn) => fn(ctx)),
        ...buildUniqueDetailParagraphs(ctx, 28),
      ],
    });
  } else {
    groups.unshift({
      idPrefix: "unique-details",
      heading: `${ctx.service.name} Details for ${ctx.placeName}`,
      paragraphs: buildUniqueDetailParagraphs(ctx, 36),
    });
  }

  groups.push({
    idPrefix: "more-details",
    heading: "Extra Planning Details Homeowners Often Miss",
    paragraphs: buildUniqueDetailParagraphs(
      { ...ctx, seed: ctx.seed + 99 },
      32,
    ),
  });

  groups.push({
    idPrefix: "faq-depth",
    heading: "Practical FAQ-Style Notes for This Page",
    paragraphs: buildUniqueDetailParagraphs(
      { ...ctx, seed: ctx.seed + 181 },
      24,
    ),
  });

  groups.push({
    idPrefix: "buyer-checklist",
    heading: "Buyer Checklist Before You Confirm",
    paragraphs: buildUniqueDetailParagraphs(
      { ...ctx, seed: ctx.seed + 277 },
      20,
    ),
  });

  groups.push({
    idPrefix: "internal-link-guide",
    heading: "Use Internal Links Below to Compare Options",
    paragraphs: [
      `This hub links to ${ctx.service.name} pages across Bengaluru and Mysuru localities plus keyword intents—price, cost, near me, best, premium, installation, contractors, company, dealers, quotes, rates, hire, buy, repair and more.`,
      `Strong local SEO needs crawlable paths between services and places. Scroll to keyword hubs, top localities, related services and city pages to find the best fit for your balcony, window or terrace opening.`,
      `For ${kw(ctx).loc}, start with the locality page, then open keyword variants matching your search. Combine with our pricing guide, installation process and FAQ for a complete pre-installation checklist.`,
    ],
  });

  return splitIntoScrollSections(groups, 3);
}

export function createExpansionContext(input: {
  service: ProgrammaticService;
  parentService: ServiceRecord;
  locationName?: string;
  state?: string;
  placeName?: string;
  intent?: SearchIntent;
}): ContentExpansionContext {
  const locationName = input.locationName ?? "Bengaluru & Mysuru";
  const placeName = input.placeName ?? locationName;
  const state = input.state ?? "Karnataka";

  return {
    service: input.service,
    parentService: input.parentService,
    locationName,
    state,
    placeName,
    intent: input.intent,
    seed: hashSeed(
      input.service.slug,
      placeName,
      locationName,
      input.intent?.slug ?? "base",
    ),
  };
}

export function countExpansionWords(sections: AssembledPageSection[]): number {
  const text = sections.flatMap((s) => s.paragraphs).join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}
