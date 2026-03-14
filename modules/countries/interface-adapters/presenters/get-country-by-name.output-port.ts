import type { Country } from '@modules/countries/core/models/country.entity';
import type { CountryByNamePageViewModel } from './get-country-by-name.view-model';

/**
 * Output Port for "Get Country by Name" (Uncle Bob: "Interface Adapters" / boundary).
 * The Controller depends on this abstraction (dependency inversion).
 */
export interface IGetCountryByNameOutputPort {
  present(country: Country | undefined): CountryByNamePageViewModel;
}
