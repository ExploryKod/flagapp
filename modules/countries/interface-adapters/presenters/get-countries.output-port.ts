import type { Country } from '@modules/countries/core/models/country.entity';
import type { CountriesPageViewModel } from './get-countries.view-model';

/**
 * Output Port for "Get Countries" (Uncle Bob: "Interface Adapters" / boundary).
 * This is the interface that the Presenter implements. The Controller depends
 * on this abstraction (dependency inversion): it receives use-case output (Country[])
 * and calls this port to obtain the View Model for the view.
 * The Use Case does not depend on this; only the Controller uses it.
 */
export interface IGetCountriesOutputPort {
  present(countries: Country[], query?: string): CountriesPageViewModel;
}
