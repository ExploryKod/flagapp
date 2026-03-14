import type { Country } from '@modules/countries/core/models/country.entity';
import type { IGetCountriesOutputPort } from './get-countries.output-port';
import type { CountriesPageViewModel } from './get-countries.view-model';

/**
 * Presenter for "Get Countries" (Uncle Bob: "Interface Adapter" — output side).
 * Converts use-case output (entity data) into the View Model required by the view.
 *
 * Two separate filters:
 * - textQuery: from the search input → filter by country name (substring).
 * - regionQuery: from the region select → exact match on country.region (value from API).
 * allRegions: unique region names from API, for the region filter options (from here, not UI).
 */
function present(countries: Country[], textQuery?: string, regionQuery?: string): CountriesPageViewModel {
  const allRegions = [...new Set(countries.map((c) => c.region))].sort();

  const normalizedTextQuery = textQuery?.trim().toLowerCase() ?? '';
  const filteredByText = normalizedTextQuery
    ? countries.filter((c) => c.name.toLowerCase().includes(normalizedTextQuery))
    : [...countries];

  const normalizedRegionQuery = regionQuery?.trim();
  const filteredByRegion = normalizedRegionQuery
    ? filteredByText.filter((c) => c.region === normalizedRegionQuery)
    : [...filteredByText];

  const sortedCountries = filteredByRegion.sort((a, b) => a.name.localeCompare(b.name));
  return { countries: sortedCountries, allRegions };
}   

export const getCountriesPresenter: IGetCountriesOutputPort = {
  present,
};
