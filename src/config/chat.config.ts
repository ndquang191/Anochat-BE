export const ChatConfig = {
  categories: ['polite'] as const,
  sensitiveKeywords: ['hà nội', 'bikini'] as const,
  matchTimeout: 30, // seconds
};

export type Category = (typeof ChatConfig.categories)[number];
export type SensitiveKeyword = (typeof ChatConfig.sensitiveKeywords)[number];
