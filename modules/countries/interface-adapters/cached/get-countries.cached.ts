import { cache } from 'react';
import { getInjection } from '@modules/di/container';
import type { Country } from '@modules/countries/core/models/country.entity';
import type { GetCountriesControllerInput } from '@modules/countries/interface-adapters/controllers/get-countries.controller';
import type { CountriesPageViewModel } from '@modules/countries/interface-adapters/presenters/get-countries.view-model';

const loadCountriesEntities = cache(async (): Promise<Country[]> => {
  const getCountriesUseCase = getInjection('IGetCountriesUseCase');
  return getCountriesUseCase();
});

export async function getCountriesPageViewModel(
  input?: GetCountriesControllerInput
): Promise<CountriesPageViewModel> {
  const countries = await loadCountriesEntities();
  const outputPort = getInjection('IGetCountriesOutputPort');
  return outputPort.present(countries, input?.textQuery, input?.regionQuery);
}
