import * as z from 'zod';
import { MATERIAL_INPUT_LIMITS } from '@features/material/constants/materialConfig';

const {
  discoveryTerm: { minLength: dtMin, maxLength: dtMax },
  definitionText: { minLength: defMin, maxLength: defMax },
} = MATERIAL_INPUT_LIMITS;

export const discoveryTermObjectSchema = z.strictObject({
  dt: z
    .string()
    .min(dtMin, { error: 'A Discovery Term is required.' })
    .max(dtMax, { error: `Discovery Term length exceeds ${dtMax} chars.` })
    .trim()
    .transform(arg => arg.charAt(0).toUpperCase() + arg.slice(1)),
  def: z
    .string()
    .min(defMin, { error: 'A Definition Text is required.' })
    .max(defMax, { error: `Definition Text exceeds ${dtMax} chars.` })
    .trim()
    .transform(arg => arg.charAt(0).toUpperCase() + arg.slice(1)),
});

export type DiscoveryTermObjectInput = z.input<
  typeof discoveryTermObjectSchema
>;
export type DiscoveryTermObjectOutput = z.output<
  typeof discoveryTermObjectSchema
>;
