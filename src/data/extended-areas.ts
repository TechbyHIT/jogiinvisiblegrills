import type { AreaRecord } from "@/types";

const now = "2026-07-29T00:00:00.000Z";

type AreaSeed = {
  id: string;
  slug: string;
  name: string;
  locationId: "loc-bangalore" | "loc-mysore";
  introduction: string;
  localDescription: string;
  propertyTypes: AreaRecord["propertyTypes"];
  localCharacteristics: string[];
  verifiedLocalFacts: string[];
  nearbyAreaIds: string[];
  qualityScore?: number;
};

function buildArea(seed: AreaSeed): AreaRecord {
  return {
    id: seed.id,
    slug: seed.slug,
    name: seed.name,
    locationId: seed.locationId,
    publicationStatus: "published",
    allowIndexing: true,
    isServed: true,
    introduction: seed.introduction,
    localDescription: seed.localDescription,
    propertyTypes: seed.propertyTypes,
    localCharacteristics: seed.localCharacteristics,
    nearbyAreaIds: seed.nearbyAreaIds,
    landmarkIds: [],
    verifiedLocalFacts: seed.verifiedLocalFacts,
    localDataVerified: true,
    contentReviewed: true,
    qualityScore: seed.qualityScore ?? 85,
    createdAt: now,
    updatedAt: now,
  };
}

const BANGALORE_EXTENDED: AreaSeed[] = [
  {
    id: "area-nagarbhavi",
    slug: "nagarbhavi",
    name: "Nagarbhavi",
    locationId: "loc-bangalore",
    introduction:
      "Nagarbhavi combines established apartment blocks and independent houses where balcony safety nets and mosquito protection are frequent family upgrades.",
    localDescription:
      "Installations in Nagarbhavi are planned around west Bangalore access, varied railing types and society rules in mid-rise complexes.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["West Bangalore residential mix", "Family balcony safety demand", "Mosquito net interest"],
    verifiedLocalFacts: ["Nagarbhavi is a served west Bangalore locality"],
    nearbyAreaIds: ["area-vijayanagar-blr", "area-rajajinagar", "area-kengeri"],
  },
  {
    id: "area-vijayanagar-blr",
    slug: "vijayanagar-bengaluru",
    name: "Vijayanagar",
    locationId: "loc-bangalore",
    introduction:
      "Vijayanagar (Bengaluru) residents request invisible grills and balcony nets for apartments and independent homes along busy west-corridor layouts.",
    localDescription:
      "Work here focuses on compact urban openings, existing MS railings and practical finishing for daily balcony use.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Dense west Bangalore layout", "Apartment and house mix", "View-oriented grill demand"],
    verifiedLocalFacts: ["Vijayanagar Bengaluru is distinct from Mysore Vijayanagar and is a served locality"],
    nearbyAreaIds: ["area-nagarbhavi", "area-rajajinagar", "area-basavanagudi"],
  },
  {
    id: "area-peenya",
    slug: "peenya",
    name: "Peenya",
    locationId: "loc-bangalore",
    introduction:
      "Peenya residential pockets near industrial corridors often need balcony fall protection and utility mosquito nets for family apartments.",
    localDescription:
      "Service visits cover north-west Bangalore housing with attention to access timing and multi-opening apartment projects.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["North-west corridor housing", "Mid-rise apartment demand", "Utility balcony work"],
    verifiedLocalFacts: ["Peenya is included in our served Bangalore coverage"],
    nearbyAreaIds: ["area-yeshwanthpur", "area-jalahalli", "area-nagarbhavi"],
  },
  {
    id: "area-hennur",
    slug: "hennur",
    name: "Hennur",
    locationId: "loc-bangalore",
    introduction:
      "Hennur apartments and gated layouts commonly request invisible grills and children safety nets for high-floor balconies.",
    localDescription:
      "Projects in Hennur often involve newer societies where society approval and lift booking affect installation scheduling.",
    propertyTypes: ["apartments", "villas", "independent-houses"],
    localCharacteristics: ["North-east residential growth", "Gated community apartments", "Child safety upgrades"],
    verifiedLocalFacts: ["Hennur is a served north-east Bangalore locality"],
    nearbyAreaIds: ["area-kalyan-nagar", "area-horamavu", "area-rt-nagar"],
  },
  {
    id: "area-kengeri",
    slug: "kengeri",
    name: "Kengeri",
    locationId: "loc-bangalore",
    introduction:
      "Kengeri homeowners plan balcony nets, invisible grills and mosquito systems for independent houses and growing apartment projects.",
    localDescription:
      "Installations address west Bangalore housing spread, custom bracket needs and measurement-led quotations.",
    propertyTypes: ["independent-houses", "apartments"],
    localCharacteristics: ["West Bangalore expansion", "Independent-house concentration", "Custom fixing planning"],
    verifiedLocalFacts: ["Kengeri is a served Bangalore residential area"],
    nearbyAreaIds: ["area-uttarahalli", "area-nagarbhavi", "area-kanakapura-road"],
  },
  {
    id: "area-uttarahalli",
    slug: "uttarahalli",
    name: "Uttarahalli",
    locationId: "loc-bangalore",
    introduction:
      "Uttarahalli family homes and apartments frequently request balcony safety nets and pet protection for open railings.",
    localDescription:
      "Service work covers south Bangalore layouts with practical mesh spacing and society-compliant hardware where required.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["South Bangalore residential density", "Family and pet safety demand", "Mixed building ages"],
    verifiedLocalFacts: ["Uttarahalli is a served Bangalore locality"],
    nearbyAreaIds: ["area-banashankari", "area-jp-nagar", "area-kengeri"],
  },
  {
    id: "area-kanakapura-road",
    slug: "kanakapura-road",
    name: "Kanakapura Road",
    locationId: "loc-bangalore",
    introduction:
      "Kanakapura Road corridor apartments and villas often need invisible grills and balcony nets for newer high-rise openings.",
    localDescription:
      "Installations follow measurement across multiple towers with society coordination and inland-climate material choices.",
    propertyTypes: ["apartments", "villas", "independent-houses"],
    localCharacteristics: ["South corridor apartment growth", "Villa and tower mix", "High-floor safety demand"],
    verifiedLocalFacts: ["Kanakapura Road is a served south Bangalore residential corridor"],
    nearbyAreaIds: ["area-jp-nagar", "area-bannerghatta-road", "area-uttarahalli"],
  },
  {
    id: "area-jalahalli",
    slug: "jalahalli",
    name: "Jalahalli",
    locationId: "loc-bangalore",
    introduction:
      "Jalahalli residents request mosquito nets, balcony safety nets and window protection for apartments and independent houses.",
    localDescription:
      "Projects plan around north Bangalore access, established housing stock and everyday opening measurements.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["North Bangalore locality", "Apartment balcony upgrades", "Mosquito protection demand"],
    verifiedLocalFacts: ["Jalahalli is included in our Bangalore service area"],
    nearbyAreaIds: ["area-peenya", "area-yeshwanthpur", "area-hebbal"],
  },
  {
    id: "area-nagavara",
    slug: "nagavara",
    name: "Nagavara",
    locationId: "loc-bangalore",
    introduction:
      "Nagavara apartment communities near north corridors commonly need balcony fall protection and bird spike installations.",
    localDescription:
      "Work includes high-rise access planning, society permissions and neat finishing on AC ledges and balconies.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["North corridor apartments", "Bird and balcony demand", "Society approval processes"],
    verifiedLocalFacts: ["Nagavara is a served Bangalore locality"],
    nearbyAreaIds: ["area-hebbal", "area-thanisandra", "area-nagawara"],
  },
  {
    id: "area-thanisandra",
    slug: "thanisandra",
    name: "Thanisandra",
    locationId: "loc-bangalore",
    introduction:
      "Thanisandra gated apartments frequently request invisible grills and children safety nets for family living.",
    localDescription:
      "Installations are scheduled with lift access and society guidelines typical of north Bangalore tower living.",
    propertyTypes: ["apartments", "villas"],
    localCharacteristics: ["Gated north Bangalore towers", "Family fall-protection demand", "IT-adjacent residential"],
    verifiedLocalFacts: ["Thanisandra is a served Bangalore locality"],
    nearbyAreaIds: ["area-hebbal", "area-nagavara", "area-hennur"],
  },
  {
    id: "area-hulimavu",
    slug: "hulimavu",
    name: "Hulimavu",
    locationId: "loc-bangalore",
    introduction:
      "Hulimavu homes along Bannerghatta corridor often plan balcony nets and mosquito protection for daily comfort.",
    localDescription:
      "Service visits address south Bangalore apartment and independent-house openings with measurement-led scope.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Bannerghatta corridor pocket", "Family safety upgrades", "Mosquito net demand"],
    verifiedLocalFacts: ["Hulimavu is a served south Bangalore locality"],
    nearbyAreaIds: ["area-bannerghatta-road", "area-begur", "area-arekere"],
  },
  {
    id: "area-begur",
    slug: "begur",
    name: "Begur",
    locationId: "loc-bangalore",
    introduction:
      "Begur residential growth includes apartments where balcony safety nets and invisible grills are common enquiries.",
    localDescription:
      "Installations cover newer south Bangalore societies and independent houses with varied railing designs.",
    propertyTypes: ["apartments", "independent-houses", "villas"],
    localCharacteristics: ["South Bangalore growth pocket", "Newer apartment demand", "Balcony safety interest"],
    verifiedLocalFacts: ["Begur is included in our served Bangalore coverage"],
    nearbyAreaIds: ["area-hulimavu", "area-bommanahalli", "area-arekere"],
  },
  {
    id: "area-bommanahalli",
    slug: "bommanahalli",
    name: "Bommanahalli",
    locationId: "loc-bangalore",
    introduction:
      "Bommanahalli apartments near ORR corridors frequently need balcony fall protection and mosquito nets.",
    localDescription:
      "Projects focus on compact urban balconies, society rules and multi-opening apartment quotations.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["ORR-adjacent apartments", "Compact balcony openings", "High tenant turnover buildings"],
    verifiedLocalFacts: ["Bommanahalli is a served Bangalore locality"],
    nearbyAreaIds: ["area-begur", "area-hsr-layout", "area-kudlu-gate"],
  },
  {
    id: "area-kudlu-gate",
    slug: "kudlu-gate",
    name: "Kudlu Gate",
    locationId: "loc-bangalore",
    introduction:
      "Kudlu Gate residents request invisible grills and balcony safety nets for apartments along the south ORR stretch.",
    localDescription:
      "Work is planned around ORR traffic access, society lift permissions and accurate opening measurement.",
    propertyTypes: ["apartments"],
    localCharacteristics: ["ORR south corridor apartments", "High-rise openings", "Society coordination needs"],
    verifiedLocalFacts: ["Kudlu Gate is a served Bangalore residential pocket"],
    nearbyAreaIds: ["area-bommanahalli", "area-hsr-layout", "area-electronic-city"],
  },
  {
    id: "area-gottigere",
    slug: "gottigere",
    name: "Gottigere",
    locationId: "loc-bangalore",
    introduction:
      "Gottigere independent houses and apartments commonly need window and balcony protection for family safety.",
    localDescription:
      "Installations address south Bangalore housing with custom bracket planning where railings vary.",
    propertyTypes: ["independent-houses", "apartments"],
    localCharacteristics: ["South Bangalore house mix", "Custom fixing needs", "Family safety demand"],
    verifiedLocalFacts: ["Gottigere is a served Bangalore locality"],
    nearbyAreaIds: ["area-bannerghatta-road", "area-begur", "area-arekere"],
  },
  {
    id: "area-attibele",
    slug: "attibele",
    name: "Attibele",
    locationId: "loc-bangalore",
    introduction:
      "Attibele and nearby residential pockets request balcony nets and mosquito systems for independent homes and newer layouts.",
    localDescription:
      "Service coverage is confirmed during enquiry for this south Bangalore fringe locality with honest visit scheduling.",
    propertyTypes: ["independent-houses", "apartments"],
    localCharacteristics: ["South fringe residential growth", "Independent-house demand", "Measurement-led quotes"],
    verifiedLocalFacts: ["Attibele is assessed for served coverage during enquiry"],
    nearbyAreaIds: ["area-electronic-city", "area-sarjapur-road", "area-kudlu-gate"],
  },
  {
    id: "area-devanahalli",
    slug: "devanahalli",
    name: "Devanahalli",
    locationId: "loc-bangalore",
    introduction:
      "Devanahalli villa and apartment projects often plan invisible grills and balcony safety for newer residential stock.",
    localDescription:
      "Installations follow north Bangalore expansion patterns with access planning for villa and apartment openings.",
    propertyTypes: ["villas", "apartments", "independent-houses"],
    localCharacteristics: ["North Bangalore expansion", "Villa layouts", "Newer balcony designs"],
    verifiedLocalFacts: ["Devanahalli projects are scheduled based on operational availability"],
    nearbyAreaIds: ["area-yelahanka", "area-thanisandra", "area-jakkur"],
  },
  {
    id: "area-jakkur",
    slug: "jakkur",
    name: "Jakkur",
    locationId: "loc-bangalore",
    introduction:
      "Jakkur apartments and lake-adjacent layouts frequently request balcony nets and mosquito protection.",
    localDescription:
      "Work covers north Bangalore mid-rise living with society-aware installation windows.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["North Bangalore residential pocket", "Mid-rise apartments", "Mosquito and balcony demand"],
    verifiedLocalFacts: ["Jakkur is a served Bangalore locality"],
    nearbyAreaIds: ["area-yelahanka", "area-hebbal", "area-thanisandra"],
  },
  {
    id: "area-horamavu",
    slug: "horamavu",
    name: "Horamavu",
    locationId: "loc-bangalore",
    introduction:
      "Horamavu family apartments often need children safety nets and invisible grills for open balconies.",
    localDescription:
      "Installations are tailored to east-north Bangalore housing with practical fixing for everyday use.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["East-north residential demand", "Family safety upgrades", "Apartment balcony focus"],
    verifiedLocalFacts: ["Horamavu is included in our Bangalore coverage"],
    nearbyAreaIds: ["area-kalyan-nagar", "area-hennur", "area-kr-puram"],
  },
  {
    id: "area-kalyan-nagar",
    slug: "kalyan-nagar",
    name: "Kalyan Nagar",
    locationId: "loc-bangalore",
    introduction:
      "Kalyan Nagar residents request discreet invisible grills and balcony nets for established apartment blocks.",
    localDescription:
      "Projects plan around older and renovated railings common in this north-east Bangalore layout.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Established north-east layout", "Apartment renovation demand", "Aesthetic-sensitive grills"],
    verifiedLocalFacts: ["Kalyan Nagar is a served Bangalore locality"],
    nearbyAreaIds: ["area-hennur", "area-kammanahalli", "area-horamavu"],
  },
  {
    id: "area-kammanahalli",
    slug: "kammanahalli",
    name: "Kammanahalli",
    locationId: "loc-bangalore",
    introduction:
      "Kammanahalli compact apartments frequently need balcony safety nets and mosquito nets for daily living.",
    localDescription:
      "Service work addresses dense urban openings and society-compliant installations in central-east Bangalore.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Dense urban residential stock", "Compact balconies", "Mosquito protection demand"],
    verifiedLocalFacts: ["Kammanahalli is a served Bangalore locality"],
    nearbyAreaIds: ["area-kalyan-nagar", "area-frazer-town", "area-indiranagar"],
  },
  {
    id: "area-frazer-town",
    slug: "frazer-town",
    name: "Frazer Town",
    locationId: "loc-bangalore",
    introduction:
      "Frazer Town heritage-style homes and apartments often need window mosquito systems and balcony protection.",
    localDescription:
      "Installations respect older building fabric while meeting modern safety spacing needs.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Central Bangalore character homes", "Window and balcony mix", "Custom finishing needs"],
    verifiedLocalFacts: ["Frazer Town is a served central Bangalore locality"],
    nearbyAreaIds: ["area-cox-town", "area-ulsoor", "area-indiranagar"],
  },
  {
    id: "area-cox-town",
    slug: "cox-town",
    name: "Cox Town",
    locationId: "loc-bangalore",
    introduction:
      "Cox Town residents plan balcony nets and invisible grills for family apartments and independent houses.",
    localDescription:
      "Work focuses on east-central Bangalore access and varied railing constructions.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["East-central residential pocket", "Mixed housing ages", "Family safety demand"],
    verifiedLocalFacts: ["Cox Town is included in our served Bangalore coverage"],
    nearbyAreaIds: ["area-frazer-town", "area-ulsoor", "area-cv-raman-nagar"],
  },
  {
    id: "area-ulsoor",
    slug: "ulsoor",
    name: "Ulsoor",
    locationId: "loc-bangalore",
    introduction:
      "Ulsoor apartments near the lake area commonly request low-profile invisible grills and mosquito nets.",
    localDescription:
      "Installations balance aesthetics with safety for central Bangalore openings facing society scrutiny.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Central Bangalore apartments", "Aesthetic-sensitive installations", "Lake-adjacent housing"],
    verifiedLocalFacts: ["Ulsoor is a served Bangalore locality"],
    nearbyAreaIds: ["area-indiranagar", "area-cox-town", "area-domlur"],
  },
  {
    id: "area-richmond-town",
    slug: "richmond-town",
    name: "Richmond Town",
    locationId: "loc-bangalore",
    introduction:
      "Richmond Town homes often need discreet balcony and window safety upgrades with neat finishing.",
    localDescription:
      "Projects address premium central layouts where visible hardware must stay minimal.",
    propertyTypes: ["apartments", "independent-houses", "villas"],
    localCharacteristics: ["Premium central locality", "Aesthetic priority", "Custom bracket planning"],
    verifiedLocalFacts: ["Richmond Town is a served central Bangalore area"],
    nearbyAreaIds: ["area-shantinagar", "area-wilson-garden", "area-ulsoor"],
  },
  {
    id: "area-shantinagar",
    slug: "shantinagar",
    name: "Shantinagar",
    locationId: "loc-bangalore",
    introduction:
      "Shantinagar apartments frequently request balcony safety nets and children protection for high-floor living.",
    localDescription:
      "Service visits cover central Bangalore apartment stock with society-aware scheduling.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Central Bangalore apartment density", "Child safety demand", "Compact urban openings"],
    verifiedLocalFacts: ["Shantinagar is a served Bangalore locality"],
    nearbyAreaIds: ["area-richmond-town", "area-wilson-garden", "area-koramangala"],
  },
  {
    id: "area-wilson-garden",
    slug: "wilson-garden",
    name: "Wilson Garden",
    locationId: "loc-bangalore",
    introduction:
      "Wilson Garden mixed-use corridors include residential apartments needing mosquito nets and balcony protection.",
    localDescription:
      "Installations are planned for central Bangalore openings with practical access and measurement.",
    propertyTypes: ["apartments", "independent-houses", "commercial"],
    localCharacteristics: ["Central mixed-use corridor", "Apartment safety upgrades", "Utility opening protection"],
    verifiedLocalFacts: ["Wilson Garden is included in our Bangalore service coverage"],
    nearbyAreaIds: ["area-shantinagar", "area-jayanagar", "area-btm-layout"],
  },
  {
    id: "area-nagawara",
    slug: "nagawara",
    name: "Nagawara",
    locationId: "loc-bangalore",
    introduction:
      "Nagawara apartment towers often need balcony fall protection and bird spike work on AC ledges.",
    localDescription:
      "Projects follow north Bangalore high-rise patterns with lift and society coordination.",
    propertyTypes: ["apartments"],
    localCharacteristics: ["North tower apartments", "Bird spike demand", "High-floor safety upgrades"],
    verifiedLocalFacts: ["Nagawara is a served Bangalore locality"],
    nearbyAreaIds: ["area-nagavara", "area-hebbal", "area-thanisandra"],
  },
  {
    id: "area-sahakara-nagar",
    slug: "sahakara-nagar",
    name: "Sahakara Nagar",
    locationId: "loc-bangalore",
    introduction:
      "Sahakara Nagar cooperative-layout homes and apartments request balcony nets and invisible grills.",
    localDescription:
      "Installations suit north Bangalore layout-style housing with independent-house and apartment mix.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Layout-style north Bangalore living", "Family safety demand", "Mixed building stock"],
    verifiedLocalFacts: ["Sahakara Nagar is a served Bangalore locality"],
    nearbyAreaIds: ["area-hebbal", "area-yelahanka", "area-jakkur"],
  },
  {
    id: "area-vidyaranyapura",
    slug: "vidyaranyapura",
    name: "Vidyaranyapura",
    locationId: "loc-bangalore",
    introduction:
      "Vidyaranyapura residents frequently plan mosquito nets and balcony safety for family homes.",
    localDescription:
      "Work covers north Bangalore residential pockets with measurement-led quotations.",
    propertyTypes: ["independent-houses", "apartments"],
    localCharacteristics: ["North Bangalore residential spread", "Independent-house openings", "Mosquito net demand"],
    verifiedLocalFacts: ["Vidyaranyapura is included in our served Bangalore coverage"],
    nearbyAreaIds: ["area-yelahanka", "area-sahakara-nagar", "area-jalahalli"],
  },
  {
    id: "area-ramamurthy-nagar",
    slug: "ramamurthy-nagar",
    name: "Ramamurthy Nagar",
    locationId: "loc-bangalore",
    introduction:
      "Ramamurthy Nagar apartments and houses commonly need children safety nets and balcony protection.",
    localDescription:
      "Installations address east Bangalore family housing with practical mesh spacing and fixing.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["East Bangalore family demand", "Apartment balcony focus", "Children safety interest"],
    verifiedLocalFacts: ["Ramamurthy Nagar is a served Bangalore locality"],
    nearbyAreaIds: ["area-kr-puram", "area-horamavu", "area-kundalahalli"],
  },
  {
    id: "area-hoodi",
    slug: "hoodi",
    name: "Hoodi",
    locationId: "loc-bangalore",
    introduction:
      "Hoodi IT-adjacent apartments frequently request invisible grills and balcony safety nets.",
    localDescription:
      "Service work aligns with Whitefield corridor societies and high-rise access requirements.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Whitefield corridor apartments", "IT-adjacent demand", "Society approval processes"],
    verifiedLocalFacts: ["Hoodi is a served Bangalore locality near Whitefield"],
    nearbyAreaIds: ["area-whitefield", "area-mahadevapura", "area-kundalahalli"],
  },
  {
    id: "area-varthur",
    slug: "varthur",
    name: "Varthur",
    locationId: "loc-bangalore",
    introduction:
      "Varthur residential communities along the lake corridor often plan balcony nets and mosquito protection.",
    localDescription:
      "Projects cover east Bangalore apartment growth with society coordination and accurate measurement.",
    propertyTypes: ["apartments", "villas", "independent-houses"],
    localCharacteristics: ["East corridor residential growth", "Gated communities", "Balcony and mosquito demand"],
    verifiedLocalFacts: ["Varthur is a served Bangalore locality"],
    nearbyAreaIds: ["area-whitefield", "area-bellandur", "area-kundalahalli"],
  },
  {
    id: "area-kaikondrahalli",
    slug: "kaikondrahalli",
    name: "Kaikondrahalli",
    locationId: "loc-bangalore",
    introduction:
      "Kaikondrahalli gated apartments commonly need invisible grills for view-friendly fall protection.",
    localDescription:
      "Installations follow Sarjapur corridor patterns with lift access and society permissions.",
    propertyTypes: ["apartments", "villas"],
    localCharacteristics: ["Sarjapur corridor gated living", "View-oriented grill demand", "High-rise openings"],
    verifiedLocalFacts: ["Kaikondrahalli is included in our Bangalore coverage"],
    nearbyAreaIds: ["area-sarjapur-road", "area-bellandur", "area-hosa-road"],
  },
  {
    id: "area-hosa-road",
    slug: "hosa-road",
    name: "Hosa Road",
    locationId: "loc-bangalore",
    introduction:
      "Hosa Road apartment projects frequently request balcony safety nets and children protection systems.",
    localDescription:
      "Work is scheduled for south-east Bangalore societies with multi-opening measurement.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["South-east corridor apartments", "Family safety upgrades", "Newer tower demand"],
    verifiedLocalFacts: ["Hosa Road is a served Bangalore residential corridor"],
    nearbyAreaIds: ["area-kaikondrahalli", "area-bommanahalli", "area-kudlu-gate"],
  },
  {
    id: "area-silk-board",
    slug: "silk-board",
    name: "Silk Board",
    locationId: "loc-bangalore",
    introduction:
      "Silk Board adjacent apartments often need compact balcony nets and mosquito nets for daily use.",
    localDescription:
      "Installations focus on dense south Bangalore urban openings and society-compliant hardware.",
    propertyTypes: ["apartments"],
    localCharacteristics: ["Dense urban apartment pocket", "Compact balconies", "Mosquito and fall-protection demand"],
    verifiedLocalFacts: ["Silk Board area is a served Bangalore residential pocket"],
    nearbyAreaIds: ["area-btm-layout", "area-bommanahalli", "area-hsr-layout"],
  },
  {
    id: "area-ejipura",
    slug: "ejipura",
    name: "Ejipura",
    locationId: "loc-bangalore",
    introduction:
      "Ejipura residents request balcony safety nets and window mosquito systems for mixed housing stock.",
    localDescription:
      "Service planning covers central-south Bangalore with varied railing and frame types.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Central-south urban mix", "Window protection demand", "Compact balcony work"],
    verifiedLocalFacts: ["Ejipura is a served Bangalore locality"],
    nearbyAreaIds: ["area-koramangala", "area-domlur", "area-wilson-garden"],
  },
  {
    id: "area-austin-town",
    slug: "austin-town",
    name: "Austin Town",
    locationId: "loc-bangalore",
    introduction:
      "Austin Town apartments and houses commonly plan invisible grills and balcony nets for family safety.",
    localDescription:
      "Installations respect central Bangalore building ages with custom bracket options.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Central Bangalore residential pocket", "Custom fixing needs", "Family safety demand"],
    verifiedLocalFacts: ["Austin Town is included in our served Bangalore coverage"],
    nearbyAreaIds: ["area-richmond-town", "area-shantinagar", "area-ulsoor"],
  },
  {
    id: "area-benson-town",
    slug: "benson-town",
    name: "Benson Town",
    locationId: "loc-bangalore",
    introduction:
      "Benson Town homeowners frequently request mosquito nets and balcony protection for established homes.",
    localDescription:
      "Work covers east-central Bangalore with measurement-led scope and neat finishing.",
    propertyTypes: ["independent-houses", "apartments"],
    localCharacteristics: ["Established east-central locality", "Independent-house openings", "Mosquito net interest"],
    verifiedLocalFacts: ["Benson Town is a served Bangalore locality"],
    nearbyAreaIds: ["area-frazer-town", "area-cox-town", "area-lingarajapuram"],
  },
  {
    id: "area-lingarajapuram",
    slug: "lingarajapuram",
    name: "Lingarajapuram",
    locationId: "loc-bangalore",
    introduction:
      "Lingarajapuram family apartments often need children safety nets and balcony fall protection.",
    localDescription:
      "Installations are tailored to east Bangalore mid-rise living and everyday balcony use.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["East Bangalore family housing", "Child safety demand", "Apartment balcony focus"],
    verifiedLocalFacts: ["Lingarajapuram is a served Bangalore locality"],
    nearbyAreaIds: ["area-benson-town", "area-kammanahalli", "area-cv-raman-nagar"],
  },
  {
    id: "area-kundalahalli",
    slug: "kundalahalli",
    name: "Kundalahalli",
    locationId: "loc-bangalore",
    introduction:
      "Kundalahalli IT-corridor apartments frequently request invisible grills and balcony safety nets.",
    localDescription:
      "Projects follow Marathahalli–Whitefield corridor society rules and high-rise access planning.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["IT corridor apartment density", "High-rise fall protection", "Society lift coordination"],
    verifiedLocalFacts: ["Kundalahalli is a served east Bangalore locality"],
    nearbyAreaIds: ["area-marathahalli", "area-hoodi", "area-varthur"],
  },
  {
    id: "area-munnekollal",
    slug: "munnekollal",
    name: "Munnekollal",
    locationId: "loc-bangalore",
    introduction:
      "Munnekollal residential pockets request balcony nets and mosquito protection for apartment living.",
    localDescription:
      "Service visits address east Bangalore access and multi-opening apartment quotations.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["East Bangalore residential pocket", "Apartment safety upgrades", "Mosquito demand"],
    verifiedLocalFacts: ["Munnekollal is included in our Bangalore coverage"],
    nearbyAreaIds: ["area-marathahalli", "area-brookefield", "area-kundalahalli"],
  },
  {
    id: "area-hal-layout",
    slug: "hal-layout",
    name: "HAL Layout",
    locationId: "loc-bangalore",
    introduction:
      "HAL Layout apartments and independent houses commonly need balcony safety and window mosquito systems.",
    localDescription:
      "Installations plan around east-central Bangalore housing with society-aware scheduling.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["East-central planned layout", "Apartment and house mix", "Family safety interest"],
    verifiedLocalFacts: ["HAL Layout is a served Bangalore locality"],
    nearbyAreaIds: ["area-indiranagar", "area-cv-raman-nagar", "area-domlur"],
  },
  {
    id: "area-old-airport-road",
    slug: "old-airport-road",
    name: "Old Airport Road",
    locationId: "loc-bangalore",
    introduction:
      "Old Airport Road premium apartments often request view-preserving invisible grills and balcony nets.",
    localDescription:
      "Work focuses on aesthetic-sensitive finishing for central-east Bangalore high-value openings.",
    propertyTypes: ["apartments", "villas"],
    localCharacteristics: ["Premium apartment corridor", "Aesthetic grill demand", "Society approval focus"],
    verifiedLocalFacts: ["Old Airport Road is a served Bangalore residential corridor"],
    nearbyAreaIds: ["area-domlur", "area-indiranagar", "area-hal-layout"],
  },
  {
    id: "area-sadashivanagar",
    slug: "sadashivanagar",
    name: "Sadashivanagar",
    locationId: "loc-bangalore",
    introduction:
      "Sadashivanagar independent homes and apartments need discreet balcony and window safety upgrades.",
    localDescription:
      "Installations respect premium north-central layouts with minimal visible hardware.",
    propertyTypes: ["independent-houses", "apartments", "villas"],
    localCharacteristics: ["Premium north-central locality", "Aesthetic priority", "Custom finishing"],
    verifiedLocalFacts: ["Sadashivanagar is a served Bangalore locality"],
    nearbyAreaIds: ["area-malleshwaram", "area-sanjay-nagar", "area-hebbal"],
  },
  {
    id: "area-sanjay-nagar",
    slug: "sanjay-nagar",
    name: "Sanjay Nagar",
    locationId: "loc-bangalore",
    introduction:
      "Sanjay Nagar residents frequently plan mosquito nets, invisible grills and balcony safety for family homes.",
    localDescription:
      "Projects cover north Bangalore mid-rise and independent-house openings with accurate measurement.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["North Bangalore residential demand", "Mixed housing stock", "Mosquito and balcony work"],
    verifiedLocalFacts: ["Sanjay Nagar is included in our served Bangalore coverage"],
    nearbyAreaIds: ["area-sadashivanagar", "area-rt-nagar", "area-hebbal"],
  },
  {
    id: "area-dollars-colony",
    slug: "dollars-colony",
    name: "Dollars Colony",
    locationId: "loc-bangalore",
    introduction:
      "Dollars Colony layout homes often request balcony safety nets and invisible grills for family protection.",
    localDescription:
      "Installations suit layout-style south Bangalore housing with independent-house and villa openings.",
    propertyTypes: ["independent-houses", "villas", "apartments"],
    localCharacteristics: ["Layout-style south Bangalore living", "Independent-house demand", "Family safety upgrades"],
    verifiedLocalFacts: ["Dollars Colony is a served Bangalore residential layout"],
    nearbyAreaIds: ["area-jp-nagar", "area-jayanagar", "area-bannerghatta-road"],
  },
  {
    id: "area-arekere",
    slug: "arekere",
    name: "Arekere",
    locationId: "loc-bangalore",
    introduction:
      "Arekere apartment communities along Bannerghatta corridor commonly need balcony fall protection.",
    localDescription:
      "Service work follows south Bangalore society patterns with measurement across multiple openings.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Bannerghatta corridor apartments", "Family balcony demand", "Society coordination"],
    verifiedLocalFacts: ["Arekere is a served Bangalore locality"],
    nearbyAreaIds: ["area-bannerghatta-road", "area-hulimavu", "area-begur"],
  },
  {
    id: "area-channasandra",
    slug: "channasandra",
    name: "Channasandra",
    locationId: "loc-bangalore",
    introduction:
      "Channasandra residents request balcony nets and mosquito protection for east Bangalore apartments.",
    localDescription:
      "Installations are planned with east corridor access and practical fixing for everyday use.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["East Bangalore residential pocket", "Apartment safety interest", "Mosquito net demand"],
    verifiedLocalFacts: ["Channasandra is included in our Bangalore service area"],
    nearbyAreaIds: ["area-ramamurthy-nagar", "area-kr-puram", "area-hoodi"],
  },
  {
    id: "area-tc-palya",
    slug: "tc-palya",
    name: "TC Palya",
    locationId: "loc-bangalore",
    introduction:
      "TC Palya family homes and apartments frequently need children safety nets and balcony protection.",
    localDescription:
      "Work covers east Bangalore housing with measurement-led quotations and society-aware scheduling.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["East Bangalore family housing", "Children safety demand", "Mixed building stock"],
    verifiedLocalFacts: ["TC Palya is a served Bangalore locality"],
    nearbyAreaIds: ["area-ramamurthy-nagar", "area-kr-puram", "area-horamavu"],
  },
  {
    id: "area-banaswadi",
    slug: "banaswadi",
    name: "Banaswadi",
    locationId: "loc-bangalore",
    introduction:
      "Banaswadi apartments and independent houses often need invisible grills and balcony safety nets for family living.",
    localDescription:
      "Installations in Banaswadi focus on east Bangalore access, varied railing types and practical mosquito protection.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["East Bangalore residential mix", "Family balcony safety demand", "Mosquito net interest"],
    verifiedLocalFacts: ["Banaswadi is a served east Bangalore locality"],
    nearbyAreaIds: ["area-kalyan-nagar", "area-hennur", "area-kammanahalli"],
  },
  {
    id: "area-hbr-layout",
    slug: "hbr-layout",
    name: "HBR Layout",
    locationId: "loc-bangalore",
    introduction:
      "HBR Layout residents request balcony nets and invisible grills for mid-rise apartments and independent homes.",
    localDescription:
      "Work covers north-east Bangalore layouts with measurement-led scope and society-aware scheduling.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Layout-style east Bangalore living", "Apartment safety demand", "Mixed housing stock"],
    verifiedLocalFacts: ["HBR Layout is included in our Bangalore service area"],
    nearbyAreaIds: ["area-kalyan-nagar", "area-hennur", "area-horamavu"],
  },
  {
    id: "area-harlur",
    slug: "haralur",
    name: "Haralur",
    locationId: "loc-bangalore",
    introduction:
      "Haralur apartment communities near Sarjapur corridor frequently plan balcony fall protection and mosquito nets.",
    localDescription:
      "Installations address south-east Bangalore high-rise and mid-rise layouts with access planning.",
    propertyTypes: ["apartments", "villas"],
    localCharacteristics: ["Sarjapur corridor growth", "Apartment balcony focus", "Newer building stock"],
    verifiedLocalFacts: ["Haralur is a served south-east Bangalore locality"],
    nearbyAreaIds: ["area-kaikondrahalli", "area-hosa-road", "area-kudlu-gate"],
  },
  {
    id: "area-kadugodi",
    slug: "kadugodi",
    name: "Kadugodi",
    locationId: "loc-bangalore",
    introduction:
      "Kadugodi residents near Whitefield IT corridor request balcony safety nets and invisible grills for apartments.",
    localDescription:
      "Work covers east Bangalore IT corridor housing with practical fixing and society coordination.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Whitefield corridor proximity", "Apartment concentration", "Family safety upgrades"],
    verifiedLocalFacts: ["Kadugodi is a served east Bangalore locality"],
    nearbyAreaIds: ["area-whitefield", "area-hoodi", "area-kundalahalli"],
  },
  {
    id: "area-kaggadasapura",
    slug: "kaggadasapura",
    name: "Kaggadasapura",
    locationId: "loc-bangalore",
    introduction:
      "Kaggadasapura mid-rise apartments often need children safety nets and mosquito protection for bedrooms and balconies.",
    localDescription:
      "Installations focus on east Bangalore apartment openings with measurement-led quotations.",
    propertyTypes: ["apartments"],
    localCharacteristics: ["East Bangalore apartment pocket", "Children safety demand", "Mosquito net interest"],
    verifiedLocalFacts: ["Kaggadasapura is included in our Bangalore coverage"],
    nearbyAreaIds: ["area-cv-raman-nagar", "area-indiranagar", "area-domlur"],
  },
  {
    id: "area-madiwala",
    slug: "madiwala",
    name: "Madiwala",
    locationId: "loc-bangalore",
    introduction:
      "Madiwala family apartments and houses frequently request balcony nets and invisible grills near the lake corridor.",
    localDescription:
      "Work covers south Bangalore housing with attention to humidity exposure and varied railing types.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["South Bangalore residential mix", "Balcony safety demand", "Mosquito protection interest"],
    verifiedLocalFacts: ["Madiwala is a served south Bangalore locality"],
    nearbyAreaIds: ["area-btm-layout", "area-koramangala", "area-bommanahalli"],
  },
  {
    id: "area-rr-nagar",
    slug: "rr-nagar",
    name: "RR Nagar",
    locationId: "loc-bangalore",
    introduction:
      "RR Nagar independent houses and apartments often plan invisible grills and balcony safety for family living.",
    localDescription:
      "Installations address west Bangalore residential layouts with custom bracket planning where needed.",
    propertyTypes: ["independent-houses", "apartments", "villas"],
    localCharacteristics: ["West Bangalore layout living", "Independent-house demand", "Family safety upgrades"],
    verifiedLocalFacts: ["RR Nagar is a served west Bangalore locality"],
    nearbyAreaIds: ["area-kengeri", "area-uttarahalli", "area-banashankari"],
  },
  {
    id: "area-shivaji-nagar",
    slug: "shivaji-nagar",
    name: "Shivaji Nagar",
    locationId: "loc-bangalore",
    introduction:
      "Shivaji Nagar commercial-residential buildings need discreet window and balcony safety upgrades.",
    localDescription:
      "Work covers central Bangalore mixed-use buildings with practical fixing and neat finishing.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Central Bangalore mixed use", "Window safety demand", "Compact urban openings"],
    verifiedLocalFacts: ["Shivaji Nagar is included in our Bangalore service area"],
    nearbyAreaIds: ["area-shantinagar", "area-ulsoor", "area-cox-town"],
  },
  {
    id: "area-itpl",
    slug: "itpl",
    name: "ITPL",
    locationId: "loc-bangalore",
    introduction:
      "ITPL corridor apartments frequently request invisible grills and balcony nets for high-rise family living.",
    localDescription:
      "Installations near ITPL focus on high-floor access, society permissions and view-preserving grill layouts.",
    propertyTypes: ["apartments"],
    localCharacteristics: ["IT corridor high-rise living", "View-oriented grill demand", "Apartment safety focus"],
    verifiedLocalFacts: ["ITPL Whitefield corridor is a served Bangalore pocket"],
    nearbyAreaIds: ["area-whitefield", "area-hoodi", "area-kadugodi"],
  },
  {
    id: "area-kasavanahalli",
    slug: "kasavanahalli",
    name: "Kasavanahalli",
    locationId: "loc-bangalore",
    introduction:
      "Kasavanahalli apartment communities near Sarjapur Road plan balcony fall protection and mosquito nets.",
    localDescription:
      "Work covers south-east Bangalore apartment stock with measurement-led scope.",
    propertyTypes: ["apartments", "villas"],
    localCharacteristics: ["Sarjapur corridor apartments", "Family balcony safety", "Newer residential layouts"],
    verifiedLocalFacts: ["Kasavanahalli is a served south-east Bangalore locality"],
    nearbyAreaIds: ["area-harlur", "area-kaikondrahalli", "area-sarjapur-road"],
  },
  {
    id: "area-konanakunte",
    slug: "konanakunte",
    name: "Konanakunte",
    locationId: "loc-bangalore",
    introduction:
      "Konanakunte independent houses and apartments request balcony safety nets and mosquito protection.",
    localDescription:
      "Installations follow south Bangalore layout patterns with honest visit scheduling.",
    propertyTypes: ["independent-houses", "apartments"],
    localCharacteristics: ["South Bangalore layout pocket", "Independent-house openings", "Mosquito net demand"],
    verifiedLocalFacts: ["Konanakunte is included in our Bangalore coverage"],
    nearbyAreaIds: ["area-uttarahalli", "area-jp-nagar", "area-bannerghatta-road"],
  },
  {
    id: "area-padmanabhanagar",
    slug: "padmanabhanagar",
    name: "Padmanabhanagar",
    locationId: "loc-bangalore",
    introduction:
      "Padmanabhanagar residents often enquire about invisible grills and children safety nets for balconies.",
    localDescription:
      "Work covers south-west Bangalore housing with practical fixing and society-aware timing.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["South-west Bangalore residential mix", "Family safety demand", "Balcony-focused work"],
    verifiedLocalFacts: ["Padmanabhanagar is a served Bangalore locality"],
    nearbyAreaIds: ["area-banashankari", "area-uttarahalli", "area-jp-nagar"],
  },
  {
    id: "area-tavarekere",
    slug: "tavarekere",
    name: "Tavarekere",
    locationId: "loc-bangalore",
    introduction:
      "Tavarekere family homes and apartments need balcony nets and mosquito systems for everyday comfort.",
    localDescription:
      "Installations address south Bangalore residential streets with varied opening sizes.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["South Bangalore family housing", "Balcony and window mix", "Mosquito protection interest"],
    verifiedLocalFacts: ["Tavarekere is a served south Bangalore locality"],
    nearbyAreaIds: ["area-btm-layout", "area-bannerghatta-road", "area-madiwala"],
  },
  {
    id: "area-bagalur",
    slug: "bagalur",
    name: "Bagalur",
    locationId: "loc-bangalore",
    introduction:
      "Bagalur north Bangalore apartments and villas plan invisible grills and balcony safety for newer projects.",
    localDescription:
      "Work covers north corridor housing with access planning for newer layouts.",
    propertyTypes: ["apartments", "villas", "independent-houses"],
    localCharacteristics: ["North Bangalore growth pocket", "Villa and apartment mix", "Newer balcony designs"],
    verifiedLocalFacts: ["Bagalur is included in our north Bangalore service coverage"],
    nearbyAreaIds: ["area-yelahanka", "area-thanisandra", "area-jakkur"],
  },
  {
    id: "area-dasarahalli",
    slug: "dasarahalli",
    name: "Dasarahalli",
    locationId: "loc-bangalore",
    introduction:
      "Dasarahalli residents request balcony safety nets and mosquito nets for mid-rise and independent homes.",
    localDescription:
      "Installations focus on north-west Bangalore access and practical fixing for daily use.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["North-west Bangalore residential mix", "Family safety upgrades", "Mosquito net demand"],
    verifiedLocalFacts: ["Dasarahalli is a served north-west Bangalore locality"],
    nearbyAreaIds: ["area-peenya", "area-yeshwanthpur", "area-jalahalli"],
  },
  {
    id: "area-gunjur",
    slug: "gunjur",
    name: "Gunjur",
    locationId: "loc-bangalore",
    introduction:
      "Gunjur apartment communities near Sarjapur corridor frequently plan balcony fall protection.",
    localDescription:
      "Work covers south-east Bangalore housing with measurement-led quotations.",
    propertyTypes: ["apartments", "villas"],
    localCharacteristics: ["Sarjapur corridor growth", "Apartment safety focus", "Family balcony demand"],
    verifiedLocalFacts: ["Gunjur is a served south-east Bangalore locality"],
    nearbyAreaIds: ["area-varthur", "area-harlur", "area-kaikondrahalli"],
  },
  {
    id: "area-st-johns-road",
    slug: "st-johns-road",
    name: "St Johns Road",
    locationId: "loc-bangalore",
    introduction:
      "St Johns Road central Bangalore apartments need discreet balcony and window safety installations.",
    localDescription:
      "Installations respect central Bangalore building fabric while meeting modern safety spacing needs.",
    propertyTypes: ["apartments"],
    localCharacteristics: ["Central Bangalore apartment pocket", "Aesthetic-sensitive finishing", "Window safety demand"],
    verifiedLocalFacts: ["St Johns Road is included in our central Bangalore coverage"],
    nearbyAreaIds: ["area-ulsoor", "area-indiranagar", "area-shivaji-nagar"],
  },
];

const MYSORE_EXTENDED: AreaSeed[] = [
  {
    id: "area-mysore-hebbal",
    slug: "hebbal-mysuru",
    name: "Hebbal",
    locationId: "loc-mysore",
    introduction:
      "Hebbal in Mysuru has independent houses and apartments where balcony nets and mosquito systems are practical upgrades.",
    localDescription:
      "Installations are planned for north Mysore residential layouts with honest visit scheduling.",
    propertyTypes: ["independent-houses", "apartments"],
    localCharacteristics: ["North Mysore residential pocket", "Independent-house demand", "Mosquito protection interest"],
    verifiedLocalFacts: ["Hebbal Mysuru is distinct from Bangalore Hebbal and is a served locality"],
    nearbyAreaIds: ["area-mysore-vijayanagar", "area-mysore-gokulam"],
  },
  {
    id: "area-mysore-bannimantap",
    slug: "bannimantap",
    name: "Bannimantap",
    locationId: "loc-mysore",
    introduction:
      "Bannimantap residents request balcony safety nets and invisible grills for family homes and mid-rise apartments.",
    localDescription:
      "Service work covers central Mysore housing with measurement-led scope.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Central Mysore residential demand", "Family safety upgrades", "Mixed housing stock"],
    verifiedLocalFacts: ["Bannimantap is a served Mysore locality"],
    nearbyAreaIds: ["area-mysore-jayalakshmipuram", "area-mysore-nazarbad"],
  },
  {
    id: "area-mysore-nazarbad",
    slug: "nazarbad",
    name: "Nazarbad",
    locationId: "loc-mysore",
    introduction:
      "Nazarbad homeowners commonly plan window mosquito nets and balcony protection for daily comfort.",
    localDescription:
      "Installations address established Mysore neighbourhoods with varied railing and frame types.",
    propertyTypes: ["independent-houses", "apartments"],
    localCharacteristics: ["Established Mysore neighbourhood", "Window and balcony mix", "Mosquito net demand"],
    verifiedLocalFacts: ["Nazarbad is included in our Mysore coverage"],
    nearbyAreaIds: ["area-mysore-bannimantap", "area-mysore-vijayanagar"],
  },
  {
    id: "area-mysore-ramakrishnanagar",
    slug: "ramakrishnanagar",
    name: "Ramakrishnanagar",
    locationId: "loc-mysore",
    introduction:
      "Ramakrishnanagar apartments and houses frequently request children safety nets and balcony fall protection.",
    localDescription:
      "Projects follow Mysore layout patterns with practical fixing and neat finishing.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Layout-style Mysore living", "Family safety demand", "Apartment balcony focus"],
    verifiedLocalFacts: ["Ramakrishnanagar is a served Mysore locality"],
    nearbyAreaIds: ["area-mysore-kuvempunagar", "area-mysore-siddhartha-layout"],
  },
  {
    id: "area-mysore-metagalli",
    slug: "metagalli",
    name: "Metagalli",
    locationId: "loc-mysore",
    introduction:
      "Metagalli independent houses often need balcony nets, invisible grills and utility mosquito installations.",
    localDescription:
      "Work is tailored to south Mysore housing with custom bracket planning where needed.",
    propertyTypes: ["independent-houses", "apartments"],
    localCharacteristics: ["South Mysore residential pocket", "Independent-house openings", "Custom fixing needs"],
    verifiedLocalFacts: ["Metagalli is a served Mysore locality"],
    nearbyAreaIds: ["area-mysore-kuvempunagar", "area-mysore-bogadi"],
  },
  {
    id: "area-mysore-bogadi",
    slug: "bogadi",
    name: "Bogadi",
    locationId: "loc-mysore",
    introduction:
      "Bogadi family homes request balcony safety nets and mosquito protection for bedrooms and utility spaces.",
    localDescription:
      "Installations are scheduled based on site readiness and accurate opening measurement in Bogadi.",
    propertyTypes: ["independent-houses", "apartments"],
    localCharacteristics: ["West Mysore residential demand", "Family home openings", "Mosquito and balcony work"],
    verifiedLocalFacts: ["Bogadi is included in our Mysore service coverage"],
    nearbyAreaIds: ["area-mysore-metagalli", "area-mysore-vijayanagar"],
  },
  {
    id: "area-mysore-hunsur-road",
    slug: "hunsur-road",
    name: "Hunsur Road",
    locationId: "loc-mysore",
    introduction:
      "Hunsur Road corridor residences plan invisible grills and balcony nets for newer apartment and villa projects.",
    localDescription:
      "Service coverage along Hunsur Road is confirmed during enquiry with honest scheduling.",
    propertyTypes: ["apartments", "villas", "independent-houses"],
    localCharacteristics: ["North-west Mysore corridor growth", "Villa and apartment mix", "Newer balcony designs"],
    verifiedLocalFacts: ["Hunsur Road Mysore projects are served based on operational availability"],
    nearbyAreaIds: ["area-mysore-hebbal", "area-mysore-vijayanagar"],
  },
  {
    id: "area-mysore-mandi-mohalla",
    slug: "mandi-mohalla",
    name: "Mandi Mohalla",
    locationId: "loc-mysore",
    introduction:
      "Mandi Mohalla established homes need discreet window and balcony safety upgrades with neat finishing.",
    localDescription:
      "Installations respect older Mysore building fabric while meeting modern safety spacing needs.",
    propertyTypes: ["independent-houses", "apartments"],
    localCharacteristics: ["Historic Mysore residential pocket", "Custom window work", "Aesthetic-sensitive finishing"],
    verifiedLocalFacts: ["Mandi Mohalla is a served Mysore locality"],
    nearbyAreaIds: ["area-mysore-nazarbad", "area-mysore-jayalakshmipuram"],
  },
  {
    id: "area-mysore-alanahalli",
    slug: "alanahalli",
    name: "Alanahalli",
    locationId: "loc-mysore",
    introduction:
      "Alanahalli residents request balcony nets and mosquito systems for independent houses and low-rise apartments.",
    localDescription:
      "Work covers south Mysore layouts with measurement-led quotations.",
    propertyTypes: ["independent-houses", "apartments"],
    localCharacteristics: ["South Mysore layout living", "Independent-house concentration", "Balcony safety interest"],
    verifiedLocalFacts: ["Alanahalli is a served Mysore residential area"],
    nearbyAreaIds: ["area-mysore-metagalli", "area-mysore-siddhartha-layout"],
  },
  {
    id: "area-mysore-dattagalli",
    slug: "dattagalli",
    name: "Dattagalli",
    locationId: "loc-mysore",
    introduction:
      "Dattagalli apartments and houses commonly plan children safety nets and invisible grills for family living.",
    localDescription:
      "Installations follow east Mysore residential patterns with practical access and fixing.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["East Mysore residential pocket", "Family safety demand", "Apartment and house mix"],
    verifiedLocalFacts: ["Dattagalli is included in our Mysore coverage"],
    nearbyAreaIds: ["area-mysore-ramakrishnanagar", "area-mysore-kuvempunagar"],
  },
  {
    id: "area-mysore-lakshmipuram",
    slug: "lakshmipuram",
    name: "Lakshmipuram",
    locationId: "loc-mysore",
    introduction:
      "Lakshmipuram established homes request balcony nets and mosquito protection for family living.",
    localDescription:
      "Installations follow central Mysore residential patterns with practical fixing.",
    propertyTypes: ["independent-houses", "apartments"],
    localCharacteristics: ["Central Mysore residential pocket", "Family home openings", "Mosquito net demand"],
    verifiedLocalFacts: ["Lakshmipuram is a served Mysore locality"],
    nearbyAreaIds: ["area-mysore-jayalakshmipuram", "area-mysore-nazarbad"],
  },
  {
    id: "area-mysore-srirampura",
    slug: "srirampura",
    name: "Srirampura",
    locationId: "loc-mysore",
    introduction:
      "Srirampura apartments and houses frequently plan invisible grills and children safety nets.",
    localDescription:
      "Work covers north Mysore layouts with measurement-led quotations.",
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["North Mysore layout living", "Family safety demand", "Balcony-focused work"],
    verifiedLocalFacts: ["Srirampura is included in our Mysore coverage"],
    nearbyAreaIds: ["area-mysore-hebbal", "area-mysore-vijayanagar"],
  },
  {
    id: "area-mysore-ilavala",
    slug: "ilavala",
    name: "Ilavala",
    locationId: "loc-mysore",
    introduction:
      "Ilavala independent houses often need balcony safety nets and utility mosquito installations.",
    localDescription:
      "Installations are tailored to north Mysore housing with custom bracket planning.",
    propertyTypes: ["independent-houses", "apartments"],
    localCharacteristics: ["North Mysore residential pocket", "Independent-house concentration", "Balcony safety interest"],
    verifiedLocalFacts: ["Ilavala is a served Mysore locality"],
    nearbyAreaIds: ["area-mysore-hebbal", "area-mysore-bannimantap"],
  },
  {
    id: "area-mysore-nanjangud-road",
    slug: "nanjangud-road",
    name: "Nanjangud Road",
    locationId: "loc-mysore",
    introduction:
      "Nanjangud Road corridor residences plan balcony nets and invisible grills for newer apartment projects.",
    localDescription:
      "Service coverage along Nanjangud Road is confirmed during enquiry with honest scheduling.",
    propertyTypes: ["apartments", "villas", "independent-houses"],
    localCharacteristics: ["South Mysore corridor growth", "Villa and apartment mix", "Newer balcony designs"],
    verifiedLocalFacts: ["Nanjangud Road Mysore projects are served based on operational availability"],
    nearbyAreaIds: ["area-mysore-metagalli", "area-mysore-bogadi"],
  },
  {
    id: "area-mysore-chamundi-hills",
    slug: "chamundi-hills",
    name: "Chamundi Hills",
    locationId: "loc-mysore",
    introduction:
      "Chamundi Hills area homes need discreet balcony and terrace safety upgrades with neat finishing.",
    localDescription:
      "Installations respect hillside exposure and varied railing types common in the locality.",
    propertyTypes: ["independent-houses", "villas"],
    localCharacteristics: ["Hillside residential pocket", "Terrace edge safety", "Custom fixing needs"],
    verifiedLocalFacts: ["Chamundi Hills area is a served Mysore locality for eligible residential openings"],
    nearbyAreaIds: ["area-mysore-nazarbad", "area-mysore-jayalakshmipuram"],
  },
];

export const EXTENDED_AREAS: AreaRecord[] = [
  ...BANGALORE_EXTENDED.map(buildArea),
  ...MYSORE_EXTENDED.map(buildArea),
];
