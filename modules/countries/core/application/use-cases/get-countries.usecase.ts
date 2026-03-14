import type { Country } from '@modules/countries/core/models/country.entity';
import type { ICountryRepository } from '@modules/countries/core/application/repositories/countries-repository.interface';
import type { IInstrumentationService } from '@modules/core/application/services/intrumentation.service.interface';

export type IGetCountriesUseCase = ReturnType<typeof getCountriesUseCase>;

/**
 * Application use-case: "get countries".
 * Depends only on ports (repository, service); no UI or HTTP.
 */
export const getCountriesUseCase =
  (
    instrumentationService: IInstrumentationService,
    countriesRepository: ICountryRepository
  ) =>
  (): Promise<Country[]> => {
    return instrumentationService.startSpan(
      { name: 'getCountries UseCase', op: 'function' },
      () => countriesRepository.getCountries()
    );
  };
