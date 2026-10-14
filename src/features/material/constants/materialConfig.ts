export const MATERIAL_INPUT_LIMITS = {
  category: {
    maxLength: 25,
    minLength: 2,
  },
  discoveryTerm: {
    maxLength: 16,
    minLength: 1,
  },
  definitionText: {
    maxLength: 107,
    minLength: 1,
  },
} as const; // Read only

