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
  capital: z.string(),
  nativeName: z.string().optional(),
  subregion: z.string().optional(),
  tld: z.string().optional(),
  currencies: z.string().optional(),
  languages: z.string().optional(),
  borderCountryNames: z.array(z.string()).optional(),
});
export type Country = z.infer<typeof selectCountrySchema>;

