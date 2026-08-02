import { getPublishedAreas } from "@/data/initial-areas";

export type ProgrammaticCity = {
  slug: string;
  name: string;
  locationId: string;
  legacySlug: string;
  intentIndexable: boolean;
};

export type ProgrammaticArea = {
  slug: string;
  name: string;
  locationId: string;
  citySlug: string;
  /** Intent-layer pages indexable in sitemap. */
  intentIndexable: boolean;
};

export type ProgrammaticLocation =
  | ({ kind: "city" } & ProgrammaticCity)
  | ({ kind: "area" } & ProgrammaticArea);

export const PROGRAMMATIC_CITIES: ProgrammaticCity[] = [
  {
    slug: "bengaluru",
    name: "Bengaluru",
    locationId: "loc-bangalore",
    legacySlug: "bangalore",
    intentIndexable: true,
  },
  {
    slug: "mysuru",
    name: "Mysuru",
    locationId: "loc-mysore",
    legacySlug: "mysore",
    intentIndexable: true,
  },
];

/** Priority-ranked Bengaluru localities. */
const BENGALURU_PRIORITY_SLUGS = [
  "whitefield", "marathahalli", "electronic-city", "hsr-layout", "koramangala",
  "indiranagar", "bellandur", "jp-nagar", "jayanagar", "btm-layout", "kr-puram",
  "thanisandra", "hennur", "vijayanagar-bengaluru", "begur", "chandapura", "ulsoor",
  "shivaji-nagar", "kundalahalli", "silk-board", "hoodi", "arekere", "vasanth-nagar",
  "bommasandra", "kammanahalli", "sarjapur-road", "hennur-road", "talaghattapura",
  "yelahanka", "rr-nagar", "rajajinagar", "mahadevapura", "nagawara", "yeshwanthpur",
  "kengeri", "kadugodi", "devanahalli", "frazer-town", "banaswadi", "varthur",
  "old-airport-road", "kanakapura-road", "gottigere", "jakkur", "jigani", "kasturi-nagar",
  "bilekahalli", "kaggadasapura", "subramanyapura", "electronic-city-phase-1",
  "bannerghatta-road", "basavanagudi", "horamavu", "kalyan-nagar", "nagarbhavi",
  "bommanahalli", "anekal", "sahakar-nagar", "richmond-town", "brookefield",
  "hosur-road", "electronic-city-phase-2", "hulimavu", "sadashivanagar",
  "singasandra", "ramamurthy-nagar", "domlur", "hal-layout", "banashankari",
  "hebbal", "attibele", "vidyaranyapura", "cox-town",
  "millers-road", "lavelle-road", "carmelaram", "kasavanahalli", "harlur",
  "kaikondrahalli", "kudlu-gate", "panathur", "ibblur", "agara", "hongasandra",
  "anjanapura", "uttarahalli", "jp-nagar-7th-phase", "banashankari-3rd-stage",
  "yelahanka-new-town", "rachenahalli", "kothanur", "ms-palya", "byatarayanapura",
  "doddakannelli", "hennur-bande", "sompura", "chikkakannalli",
];

/** Priority-ranked Mysuru localities. */
const MYSURU_PRIORITY_SLUGS = [
  "vijayanagar", "gokulam", "kuvempunagar", "hebbal", "jayalakshmipuram", "nazarbad",
  "bogadi", "siddhartha-layout", "lakshmipuram", "yadavagiri", "vv-mohalla",
  "chamrajpura", "devraj-urs-layout", "hinkal", "sharadadevi-nagar", "gnanabharathi",
  "teresian-college-area", "rajendranagar-mysuru", "saraswathipuram", "mandi-mohalla",
  "ramakrishnanagar", "dattagalli", "metagalli", "vontikoppal", "hunsur-road",
  "jayanagar-mysuru", "alanahalli", "srirampura-mysuru", "tilak-nagar-mysuru",
  "vijayanagar-2nd-stage-mysuru", "vivekananda-nagar-mysuru", "kesare", "kc-layout",
  "brindavan-extension", "nr-mohalla", "udayagiri", "cheluvamba-agrahara",
  "ittigegud", "hootagalli", "nanjangud-road", "rajiv-nagar-mysuru",
  "vidyaranyapuram", "gangotri-layout", "kalidasa-road", "paduvarahalli",
  "bamboo-bazaar", "chamundi-hill-area", "jp-nagar-mysuru", "shanthinagar-mysuru",
];

function pickAreas(
  locationId: string,
  prioritySlugs: string[],
  cap: number,
): ReturnType<typeof getPublishedAreas> {
  const all = getPublishedAreas().filter((a) => a.locationId === locationId && a.isServed);
  const bySlug = new Map(all.map((a) => [a.slug, a]));
  const picked: typeof all = [];

  for (const slug of prioritySlugs) {
    const area = bySlug.get(slug);
    if (area && picked.length < cap) picked.push(area);
  }

  for (const area of all.sort((a, b) => a.name.localeCompare(b.name))) {
    if (picked.length >= cap) break;
    if (!picked.some((p) => p.id === area.id)) picked.push(area);
  }

  return picked.slice(0, cap);
}

function buildProgrammaticAreas(): ProgrammaticArea[] {
  const areas: ProgrammaticArea[] = [];

  /** Use all served Bengaluru + Mysuru areas so inventory approaches ~400k with 25 intents. */
  const cityConfigs: Array<{ city: (typeof PROGRAMMATIC_CITIES)[number]; cap: number; priority: string[] }> = [
    { city: PROGRAMMATIC_CITIES[0]!, cap: 131, priority: BENGALURU_PRIORITY_SLUGS },
    { city: PROGRAMMATIC_CITIES[1]!, cap: 48, priority: MYSURU_PRIORITY_SLUGS },
  ];

  for (const { city, cap, priority } of cityConfigs) {
    const cityAreas = pickAreas(city.locationId, priority, cap);

    for (const area of cityAreas) {
      areas.push({
        slug: area.slug,
        name: area.name,
        locationId: city.locationId,
        citySlug: city.slug,
        intentIndexable: true,
      });
    }
  }

  return areas;
}

let cachedAreas: ProgrammaticArea[] | null = null;

export function getProgrammaticAreas(): ProgrammaticArea[] {
  if (!cachedAreas) cachedAreas = buildProgrammaticAreas();
  return cachedAreas;
}

export function getProgrammaticLocations(): ProgrammaticLocation[] {
  const cities: ProgrammaticLocation[] = PROGRAMMATIC_CITIES.map((c) => ({
    kind: "city" as const,
    ...c,
  }));

  const areas: ProgrammaticLocation[] = getProgrammaticAreas().map((a) => ({
    kind: "area" as const,
    ...a,
  }));

  return [...cities, ...areas];
}

export function getProgrammaticLocationBySlug(slug: string): ProgrammaticLocation | undefined {
  const city = PROGRAMMATIC_CITIES.find((c) => c.slug === slug);
  if (city) return { kind: "city", ...city };

  const area = getProgrammaticAreas().find((a) => a.slug === slug);
  if (area) return { kind: "area", ...area };

  return undefined;
}

export function getProgrammaticAreasByCity(citySlug: string): ProgrammaticArea[] {
  return getProgrammaticAreas().filter((a) => a.citySlug === citySlug);
}

export function getProgrammaticCityBySlug(slug: string): ProgrammaticCity | undefined {
  return PROGRAMMATIC_CITIES.find((c) => c.slug === slug);
}
