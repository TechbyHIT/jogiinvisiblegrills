export function countWords(text: string): number {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) {
    return 0;
  }

  return normalized.split(" ").length;
}

export function countWordsInSections(sections: string[]): number {
  return sections.reduce((total, section) => total + countWords(section), 0);
}

export function countWordsInFields(fields: Array<string | undefined>): number {
  return countWordsInSections(fields.filter((field): field is string => Boolean(field)));
}
