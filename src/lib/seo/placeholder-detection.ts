const PLACEHOLDER_PATTERN = /\[[A-Z0-9_]+\]/g;

export function containsPlaceholders(text: string): boolean {
  return PLACEHOLDER_PATTERN.test(text);
}

export function findPlaceholders(text: string): string[] {
  return [...text.matchAll(PLACEHOLDER_PATTERN)].map((match) => match[0]);
}

export function findPlaceholdersInFields(fields: string[]): string[] {
  const found = new Set<string>();

  for (const field of fields) {
    for (const placeholder of findPlaceholders(field)) {
      found.add(placeholder);
    }
  }

  return [...found];
}

export function hasPlaceholderContent(fields: string[]): boolean {
  return findPlaceholdersInFields(fields).length > 0;
}
