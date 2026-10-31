import * as z from 'zod';
import { MATERIAL_INPUT_LIMITS } from '../constants/materialConfig';
import { discoveryTermObjectSchema } from '@shared/domain/customMaterial/discoverySchema';

const {
  category: { minLength: catMin, maxLength: catMax },
} = MATERIAL_INPUT_LIMITS;

export const customMaterialReconciliationSchema = z
  .object({
    category: z
      .string()
      .min(catMin, { error: 'Category cannot be empty.' })
      .max(catMax, { error: `Category cannot exceed ${catMax} chars` })
      .trim(),
    items: z
      .record(z.string().regex(/^\d+$/), discoveryTermObjectSchema)
      .refine(items => Object.keys(items).length > 0, {
        message: 'You must include one item.',
      }),
  })
  .transform(data => {
    const sortedTerms = Object.keys(data.items)
      .map(Number)
      .sort((a, b) => a - b)
      .map(key => data.items[key]);
    return {
      category: data.category,
      discoveryTerms: sortedTerms,
    };
  });
