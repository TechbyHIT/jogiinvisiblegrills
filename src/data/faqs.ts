export type FaqRecord = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export const SITE_FAQS: FaqRecord[] = [
  {
    id: "faq-service-area",
    question: "Which areas do you serve?",
    answer:
      "We serve Bengaluru, Mysuru and listed localities across Karnataka. Exact availability is confirmed when you enquire.",
    category: "General",
  },
  {
    id: "faq-pricing",
    question: "How is pricing calculated?",
    answer:
      "Pricing depends on measurements, material grade, required spacing, installation complexity, building height, site accessibility and total quantity. We provide quotations after site assessment or detailed photo measurements.",
    category: "Pricing",
  },
  {
    id: "faq-site-visit",
    question: "Do you offer free site visits?",
    answer:
      "We offer measurement-based assessments and can often begin with photos and basic dimensions on WhatsApp before scheduling an on-site visit for confirmed projects.",
    category: "Process",
  },
  {
    id: "faq-invisible-grills-safe",
    question: "Are invisible grills safe for children?",
    answer:
      "Invisible grills can provide fall protection when cables are correctly spaced, tensioned and anchored into sound structural points. The right spacing depends on child safety requirements discussed during inspection.",
    category: "Safety",
  },
  {
    id: "faq-nets-vs-grills",
    question: "Should I choose balcony nets or invisible grills?",
    answer:
      "Balcony nets are flexible and often quicker to install. Invisible grills preserve views with stainless cable barriers. The better choice depends on railing design, budget, aesthetics and safety priorities.",
    category: "Services",
  },
  {
    id: "faq-installation-time",
    question: "How long does installation take?",
    answer:
      "Timing varies by opening size, number of balconies or windows, floor access and material preparation. Many single-balcony projects are completed within a day after measurements are confirmed.",
    category: "Process",
  },
  {
    id: "faq-society-permission",
    question: "Do I need society approval for balcony modifications?",
    answer:
      "Many apartment communities have guidelines about balcony changes. We recommend checking with your building management before installation, especially when drilling or fixing to common areas.",
    category: "Process",
  },
  {
    id: "faq-maintenance",
    question: "How often should safety systems be checked?",
    answer:
      "Inspect hooks, cables and mesh every few months and after major storms. Look for loose fasteners, sagging cables or torn mesh and schedule repairs promptly.",
    category: "Maintenance",
  },
  {
    id: "faq-warranty",
    question: "Do you provide a warranty?",
    answer:
      "Warranty terms depend on the service type, materials used and installation context. Applicable coverage is explained in your quotation and service confirmation.",
    category: "General",
  },
  {
    id: "faq-bird-spikes-humane",
    question: "Are bird spikes humane?",
    answer:
      "Bird spikes deter roosting by removing flat landing space. They do not trap birds when installed correctly and are commonly used on ledges and parapets.",
    category: "Services",
  },
];

export function getSiteFaqs() {
  return SITE_FAQS;
}

export function getFaqsByCategory(category: string) {
  return SITE_FAQS.filter((faq) => faq.category === category);
}
