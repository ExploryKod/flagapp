import { createModule } from '@evyweb/ioctopus';

import { DI_SYMBOLS } from '@modules/di/types';

import { CountriesRepository } from '@modules/countries/infra/repositories/countries.repository';

export function createCountryModule() {
  const countryModule = createModule();

  countryModule
    .bind(DI_SYMBOLS.ICountryRepository)
    .toClass(CountriesRepository);

  return countryModule;
}
