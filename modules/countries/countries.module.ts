import { createModule } from '@evyweb/ioctopus';

import { DI_SYMBOLS } from '@modules/di/types';

import { CountriesRepository } from '@modules/countries/infra/repositories/countries.repository';
import { getCountriesUseCase } from '@modules/countries/core/application/use-cases/get-countries.usecase';
import { getCountriesPresenter } from '@modules/countries/interface-adapters/presenters/get-countries.presenter';
import { getCountriesController } from '@modules/countries/interface-adapters/controllers/get-countries.controller';

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

  return countryModule;
}
