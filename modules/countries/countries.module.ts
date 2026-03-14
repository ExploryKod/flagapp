import { createModule } from '@evyweb/ioctopus';

import { DI_SYMBOLS } from '@modules/di/types';

import { CountriesRepository } from '@modules/countries/infra/repositories/countries.repository';
import { getCountriesUseCase } from '@modules/countries/core/application/use-cases/get-countries.usecase';
import { getCountryByNameUseCase } from '@modules/countries/core/application/use-cases/get-country-by-name.usecase';
import { getCountriesPresenter } from '@modules/countries/interface-adapters/presenters/get-countries.presenter';
import { getCountryByNamePresenter } from '@modules/countries/interface-adapters/presenters/get-country-by-name.presenter';
import { getCountriesController } from '@modules/countries/interface-adapters/controllers/get-countries.controller';
import { getCountryByNameController } from '@modules/countries/interface-adapters/controllers/get-country-by-name.controller';

export function createCountryModule() {
  const countryModule = createModule();

  countryModule
    .bind(DI_SYMBOLS.ICountryRepository)
    .toClass(CountriesRepository);

  countryModule
    .bind(DI_SYMBOLS.IGetCountriesUseCase)
    .toHigherOrderFunction(getCountriesUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.ICountryRepository,
    ]);

  countryModule
    .bind(DI_SYMBOLS.IGetCountriesOutputPort)
    .toValue(getCountriesPresenter);

  countryModule
    .bind(DI_SYMBOLS.IGetCountriesController)
    .toHigherOrderFunction(getCountriesController, [
      DI_SYMBOLS.IGetCountriesUseCase,
      DI_SYMBOLS.IGetCountriesOutputPort,
    ]);

  countryModule
    .bind(DI_SYMBOLS.IGetCountryByNameUseCase)
    .toHigherOrderFunction(getCountryByNameUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.ICountryRepository,
    ]);

  countryModule
    .bind(DI_SYMBOLS.IGetCountryByNameOutputPort)
    .toValue(getCountryByNamePresenter);

  countryModule
    .bind(DI_SYMBOLS.IGetCountryByNameController)
    .toHigherOrderFunction(getCountryByNameController, [
      DI_SYMBOLS.IGetCountryByNameUseCase,
      DI_SYMBOLS.IGetCountryByNameOutputPort,
    ]);

  return countryModule;
}
