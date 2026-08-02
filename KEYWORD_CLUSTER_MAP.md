# Keyword Cluster Map

Maps high-volume search phrases onto **existing page types**. Do **not** create one URL per keyword, modifier, or city-name swap.

Modifiers such as `price`, `cost`, `dealers`, `best`, `near me`, `installation`, and `reviews` belong on the **same** canonical page (FAQ / content modules)—never as separate thin URLs.

## Canonical page types

| Intent | Page type | URL pattern |
| --- | --- | --- |
| Service (national / hub) | service | `/services/{service}/` |
| City + service | city-service | `/{city}/{service}/` |
| Area + service | area-service | `/{city}/{area}/{service}/` |
| City hub | location | `/locations/{city}/` |
| Locality hub | area | `/locations/{city}/{area}/` |
| Problem / solution | solution | `/solutions/{problem}/` |
| Guides / pricing / materials | core or guide | `/pricing-guide/`, `/guides/...` |

## Service slugs (canonical)

| Keyword themes | Service slug |
| --- | --- |
| Invisible grills, SS cable grills, balcony invisible grill | `invisible-grills` |
| Balcony safety nets, balcony nets | `balcony-safety-nets` |
| Children safety nets, kids balcony nets | `children-safety-nets` |
| Pet safety nets, cat / dog balcony nets | `pet-safety-nets` |
| Mosquito nets, insect mesh | `mosquito-nets` |
| Bird spikes, pigeon spikes | `bird-spikes` |
| Duct area nets | `duct-area-nets` |
| Cricket practice nets | `cricket-practice-nets` |
| Cloth hangers, balcony cloth hanger | `cloth-hangers` |

## City slugs

| Search forms | Canonical city slug |
| --- | --- |
| Bangalore, Bengaluru, Bangalore urban | `bangalore` |
| Mysore, Mysuru | `mysore` |
| Visakhapatnam, Vizag | `visakhapatnam` |

Use **one** city URL. Synonyms (Bengaluru → Bangalore) are covered in copy and metadata on `/locations/bangalore/`—not duplicate city hubs.

## Bangalore locality → area slug

| Locality (search forms) | Area slug | Canonical area hub |
| --- | --- | --- |
| Whitefield | `whitefield` | `/locations/bangalore/whitefield/` |
| HSR Layout, HSR | `hsr-layout` | `/locations/bangalore/hsr-layout/` |
| Koramangala | `koramangala` | `/locations/bangalore/koramangala/` |
| Electronic City, E-City | `electronic-city` | `/locations/bangalore/electronic-city/` |
| Indiranagar | `indiranagar` | `/locations/bangalore/indiranagar/` |
| Jayanagar | `jayanagar` | `/locations/bangalore/jayanagar/` |
| JP Nagar | `jp-nagar` | `/locations/bangalore/jp-nagar/` |
| Banashankari | `banashankari` | `/locations/bangalore/banashankari/` |
| Marathahalli | `marathahalli` | `/locations/bangalore/marathahalli/` |
| Bellandur | `bellandur` | `/locations/bangalore/bellandur/` |
| Sarjapur Road, Sarjapur | `sarjapur-road` | `/locations/bangalore/sarjapur-road/` |
| Hebbal | `hebbal` | `/locations/bangalore/hebbal/` |
| Yelahanka | `yelahanka` | `/locations/bangalore/yelahanka/` |
| RT Nagar | `rt-nagar` | `/locations/bangalore/rt-nagar/` |
| Malleshwaram | `malleshwaram` | `/locations/bangalore/malleshwaram/` |
| Rajajinagar | `rajajinagar` | `/locations/bangalore/rajajinagar/` |
| Basavanagudi | `basavanagudi` | `/locations/bangalore/basavanagudi/` |
| BTM Layout, BTM | `btm-layout` | `/locations/bangalore/btm-layout/` |
| Bannerghatta Road | `bannerghatta-road` | `/locations/bangalore/bannerghatta-road/` |
| KR Puram | `kr-puram` | `/locations/bangalore/kr-puram/` |
| Mahadevapura | `mahadevapura` | `/locations/bangalore/mahadevapura/` |
| Brookefield | `brookefield` | `/locations/bangalore/brookefield/` |
| CV Raman Nagar | `cv-raman-nagar` | `/locations/bangalore/cv-raman-nagar/` |
| Yeshwanthpur, Yeswanthpur | `yeshwanthpur` | `/locations/bangalore/yeshwanthpur/` |
| Domlur | `domlur` | `/locations/bangalore/domlur/` |

## Mysore locality → area slug

| Locality | Area slug | Canonical area hub |
| --- | --- | --- |
| Vijayanagar (Mysore) | `vijayanagar` | `/locations/mysore/vijayanagar/` |
| Gokulam | `gokulam` | `/locations/mysore/gokulam/` |
| Jayalakshmipuram | `jayalakshmipuram` | `/locations/mysore/jayalakshmipuram/` |
| Kuvempunagar | `kuvempunagar` | `/locations/mysore/kuvempunagar/` |
| Siddhartha Layout | `siddhartha-layout` | `/locations/mysore/siddhartha-layout/` |

## Example keyword → canonical URL

| Keyword example | Canonical URL |
| --- | --- |
| invisible grills bangalore | `/bangalore/invisible-grills/` |
| invisible grills bengaluru price | `/bangalore/invisible-grills/` (pricing FAQ on page) |
| balcony safety nets whitefield | `/bangalore/whitefield/balcony-safety-nets/` |
| best mosquito nets hsr layout | `/bangalore/hsr-layout/mosquito-nets/` |
| bird spikes dealers koramangala | `/bangalore/koramangala/bird-spikes/` |
| cloth hangers bangalore near me | `/bangalore/cloth-hangers/` |
| invisible grills mysore | `/mysore/invisible-grills/` |
| children safety nets gokulam mysore | `/mysore/gokulam/children-safety-nets/` |

## Explicit non-goals

- Do **not** create `/invisible-grills-whitefield-price/` style doorway URLs.
- Do **not** invent pages for every pin code or every modifier combination.
- Do **not** aim for millions of thin pages or multi-ten-thousand-word filler.
- Area-service pages stay in the registry when served, but enter sitemaps only when they pass `isPageIndexable` quality gates.
