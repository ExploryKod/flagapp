import type { Country } from '@modules/countries/core/models/country.entity';
import type { IGetCountryByNameOutputPort } from './get-country-by-name.output-port';
import type { CountryByNamePageViewModel } from './get-country-by-name.view-model';

function present(country: Country | undefined): CountryByNamePageViewModel {
  return { country: country ?? null };
}

export const getCountryByNamePresenter: IGetCountryByNameOutputPort = {
  present,
};
