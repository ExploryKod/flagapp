import type { Country } from '@modules/countries/core/models/country.entity';
import type { ICountryRepository } from '@modules/countries/core/application/repositories/countries-repository.interface';
import type { IInstrumentationService } from '@modules/core/application/services/intrumentation.service.interface';

export type IGetCountryByNameUseCase = ReturnType<typeof getCountryByNameUseCase>;

/**
 * Application use-case: "get country by name".
 * Depends only on ports (repository, service); no UI or HTTP.
 */
export const getCountryByNameUseCase =
  (
    instrumentationService: IInstrumentationService,
    countriesRepository: ICountryRepository
  ) =>
  (name: string): Promise<Country | undefined> => {
    return instrumentationService.startSpan(
      { name: 'getCountryByName UseCase', op: 'function' },
      () => countriesRepository.getCountryByName(name)
    );
  };
