import type { Country } from '@modules/countries/core/models/country.entity';

/**
 * View Model for the "Get Countries" screen (Uncle Bob: "Interface Adapters").
 * This is the data structure that crosses the boundary from the application layer
 * to the view (Framework & Drivers). The Presenter is responsible for building it
 * from use-case output (entities). The view depends on this shape, not on entities.
 */
export type CountriesPageViewModel = {
  countries: Country[];
  allRegions: string[];
};
