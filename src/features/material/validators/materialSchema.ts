import * as z from 'zod';
import { MATERIAL_INPUT_LIMITS } from '../constants/materialConfig';

const {
  category: { minLength: catMin, maxLength: catMax },
} = MATERIAL_INPUT_LIMITS;
const {
  discoveryTerm: { maxLength: dtMax, minLength: dtMin },
} = MATERIAL_INPUT_LIMITS;
const {
  definitionText: { maxLength: defMax, minLength: defMin },
} = MATERIAL_INPUT_LIMITS;

const discoveryTermsSchema = z.object({
  dt: z
    .string()
    .min(dtMin, { error: 'Discovery Term cannot be empty.' })
    .max(dtMax, { error: `Discovery Term cannot exceed ${dtMax} chars.` })
    .trim()
    .transform(val => val.charAt(0).toUpperCase() + val.slice(1)),
  def: z
    .string()
    .min(defMin, { error: 'Definition Text cannot be empty.' })
    .max(defMax, { error: `Discovery term cannot exceed ${defMax} chars.` })
    .trim()
    .transform(val => val.charAt(0).toUpperCase() + val.slice(1)),
});

export const materialSchema = z.object({
  category: z
    .string()
    .min(catMin, { error: 'Category cannot be empty.' })
    .max(catMax, { error: `Category cannot exceed ${catMax} chars` })
    .trim(),
  discoveryTerms: z
    .array(discoveryTermsSchema)
    .nonempty(),
});

export type MaterialSchema = z.infer<typeof materialSchema>;
export type DiscoveryTermsSchema = z.infer<typeof discoveryTermsSchema>;
