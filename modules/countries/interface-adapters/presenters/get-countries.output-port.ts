import type { Country } from '@modules/countries/core/models/country.entity';
import type { CountriesPageViewModel } from './get-countries.view-model';

/**
 * Output Port for "Get Countries" (Uncle Bob: "Interface Adapters" / boundary).
 * The Controller depends on this abstraction (dependency inversion).
 *
 * Two separate query inputs for the presenter:
 * - textQuery: search input → filter by country name.
 * - regionQuery: region select → exact match on country.region (from API).
 */
export interface IGetCountriesOutputPort {
  present(countries: Country[], textQuery?: string, regionQuery?: string): CountriesPageViewModel;
}
