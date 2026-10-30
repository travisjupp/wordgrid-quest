import DOMPurify, { Config } from "isomorphic-dompurify";

export const activePolicyDesc = 'Strip All Markup';

export const sanitizeDiscoveryTerm = (dirty: string, opts?: Config) => {
  const domPurified = DOMPurify.sanitize(dirty, opts);
  const templateScrubbed = domPurified.replace(/\{\{[\s\S]*?\}\}/g, '');

  return templateScrubbed;
}
