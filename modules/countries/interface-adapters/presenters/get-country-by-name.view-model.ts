import type { Country } from '@modules/countries/core/models/country.entity';

/**
 * View Model for the "Get Country by Name" screen (single country or not found).
 * borderCountryNames: optional list for "Border Countries" tags (e.g. from API later).
 */
export type CountryByNamePageViewModel = {
  country: Country | null;
  borderCountryNames?: string[];
};
