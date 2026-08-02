import { getAllPages } from "../src/lib/pages/registry";
import { findPlaceholdersInFields } from "../src/lib/seo/placeholder-detection";
import { assemblePageContentByType } from "../src/lib/content/assemble-page-content";
import { getPublishedServices } from "../src/data/initial-services";
import { getPublishedLocations } from "../src/data/initial-locations";
import { getPublishedAreas } from "../src/data/initial-areas";
import { getPublishedGuides } from "../src/data/guides";
import { getPublishedBlogPosts } from "../src/data/blog-posts";
import { writeReport } from "./lib/report-utils";

const services = getPublishedServices();
const locations = getPublishedLocations();
const areas = getPublishedAreas();
const guides = getPublishedGuides();
const blogPosts = getPublishedBlogPosts();

function collectTextFields(page: ReturnType<typeof getAllPages>[number]): string[] {
  const service = services.find((item) => item.id === page.serviceId);
  const location = locations.find((item) => item.id === page.locationId);
  const area = areas.find((item) => item.id === page.areaId);
  const guide = guides.find((item) => item.id === page.guideId);
  const blogPost = blogPosts.find((item) => item.id === page.blogPostId);

  const assembled = assemblePageContentByType(page.pageType, {
    path: page.path,
    service,
    location,
    area,
  });

  if (assembled) {
    return assembled.allText;
  }

  if (guide) {
    return [guide.summary, ...guide.content, ...guide.faqs.map((faq) => faq.answer)];
  }

  if (blogPost) {
    return [
      blogPost.summary,
      ...blogPost.content,
      ...blogPost.faqs.map((faq) => faq.answer),
    ];
  }

  return [page.title, page.metaDescription, page.h1];
}

const pages = getAllPages();

const flagged = pages
  .map((page) => {
    const placeholders = findPlaceholdersInFields(collectTextFields(page));
    return {
      path: page.path,
      pageType: page.pageType,
      placeholders,
    };
  })
  .filter((item) => item.placeholders.length > 0);

const report = {
  generatedAt: new Date().toISOString(),
  totals: {
    pages: pages.length,
    withPlaceholders: flagged.length,
  },
  flagged,
};

const filePath = writeReport("placeholder-audit.json", report);

console.log("Placeholder Audit Summary");
console.log("=========================");
console.log(`Pages analysed: ${report.totals.pages}`);
console.log(`Pages with placeholders: ${report.totals.withPlaceholders}`);
console.log(`Report: ${filePath}`);
