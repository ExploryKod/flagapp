import type { Country } from '@modules/countries/core/models/country.entity';
import type { IGetCountriesOutputPort } from './get-countries.output-port';
import type { CountriesPageViewModel } from './get-countries.view-model';

/**
 * Presenter for "Get Countries" (Uncle Bob: "Interface Adapter" — output side).
 * Converts use-case output (entity data) into the View Model required by the view.
 * Region options for the filter come from here (allRegions), not from the UI.
 */
function present(countries: Country[], query?: string): CountriesPageViewModel {
  const allRegions = [...new Set(countries.map((c) => c.region))].sort();

  const normalizedQuery = query?.trim().toLowerCase() ?? '';
  const filtered = normalizedQuery
    ? countries.filter((c) => c.name.toLowerCase().includes(normalizedQuery))
    : [...countries];
  const sortedCountries = filtered.sort((a, b) => a.name.localeCompare(b.name));
  return { countries: sortedCountries, allRegions };
}

export const getCountriesPresenter: IGetCountriesOutputPort = {
  present,
};
