import { z } from 'zod';

export const selectCountrySchema = z.object({
  id: z.number(),
  name: z.string(),
  flags: z.object({
    img: z.url(),
    alt: z.string(),
  }),
  population: z.number(),
  region: z.string(),
  capital: z.string()
});
export type Country = z.infer<typeof selectCountrySchema>;

