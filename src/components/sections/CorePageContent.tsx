import { assembleCorePageContent } from "@/lib/content/assemble-page-content";
import { ContentSections } from "@/components/sections/ContentSections";

type CorePageContentProps = {
  path: string;
};

export function CorePageContent({ path }: CorePageContentProps) {
  const content = assembleCorePageContent(path);
  return <ContentSections content={content} />;
}
