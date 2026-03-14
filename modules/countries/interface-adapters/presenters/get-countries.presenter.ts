import type { Country } from '@modules/countries/core/models/country.entity';
import type { IGetCountriesOutputPort } from './get-countries.output-port';
import type { CountriesPageViewModel } from './get-countries.view-model';

/**
 * Presenter for "Get Countries" (Uncle Bob: "Interface Adapter" — output side).
 * Converts use-case output (entity data) into the View Model required by the view.
 * Contains only presentation logic (filter by query, ordering); no business rules.
 * The view receives already-prepared data and only renders it.
 */
function present(countries: Country[], query?: string): CountriesPageViewModel {
  const normalizedQuery = query?.trim().toLowerCase() ?? '';
  const filtered = normalizedQuery
    ? countries.filter((country) => country.name.toLowerCase().includes(normalizedQuery))
    : [...countries];
  const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));
  return { countries: sorted };
}

export const getCountriesPresenter: IGetCountriesOutputPort = {
  present,
};
