import { StubCountriesRepository } from '../../testing/stub.countries-repository';
import { getCountryByNameUseCase } from './get-country-by-name.usecase';
import type { Country } from '@modules/countries/core/models/country.entity';
import type { IInstrumentationService } from '@modules/core/application/services/intrumentation.service.interface';
import { ICountryRepository } from '@modules/countries/core/application/repositories/countries-repository.interface';

function makeStubInstrumentation(): IInstrumentationService {
    return {
        startSpan<T>(_opts: { name: string; op?: string }, callback: () => T): T {
            return callback();
        },
        instrumentServerAction<T>(_name: string, _opts: object, callback: () => T): Promise<T> {
            return Promise.resolve(callback());
        },
    };
}
    
const stubInstrumentation = makeStubInstrumentation();

const stubRepository: ICountryRepository = new StubCountriesRepository([]);

describe('Get country by name use case', () => {
    function makeCountry(overrides: Partial<Country> = {}): Country {
        return {
          id: 1,
          name: 'France',
          flags: { img: 'https://flagcdn.com/fr.svg', alt: 'France flag' },
          population: 67_000_000,
          region: 'Europe',
          capital: 'Paris',
          ...overrides,
        };
      } 

  it('should return country from the repository', async () => {
    const country = makeCountry({ id: 1, name: 'France' });
    stubRepository.getCountryByName = async (name: string): Promise<Country | undefined> => {
        if (name === 'France') {
            return country;
        }
        return undefined;
    };
    const useCase = getCountryByNameUseCase(stubInstrumentation, stubRepository);

    const result = await useCase('France');

    expect(result).toEqual(country);
  });

  it("should return country when querying by lowercase name (e.g. 'peru')", async () => {
    const peru = makeCountry({
      id: 10,
      name: 'Peru',
      flags: { img: 'https://flagcdn.com/pe.svg', alt: 'Peru flag' },
      population: 34_050_000,
      region: 'Americas',
      capital: 'Lima',
    });
    stubRepository.getCountryByName = async (name: string): Promise<Country | undefined> => {
      if (name === 'peru') return peru;
      return undefined;
    };
    const useCase = getCountryByNameUseCase(stubInstrumentation, stubRepository);

    const result = await useCase('peru');

    expect(result).toEqual(peru);
    expect(result?.name).toBe('Peru');
  });

  it('should return undefined when repository has no country', async () => {
    stubRepository.getCountryByName = async (name: string): Promise<Country | undefined> => {
        return undefined;
    };
    const useCase = getCountryByNameUseCase(stubInstrumentation, stubRepository);
    const result = await useCase('France');
    expect(result).toEqual(undefined);
  });

  it('should propagate repository errors', async () => {
    const error = new Error('Failed to fetch country by name');
    const repository = new StubCountriesRepository([], error);
    const useCase = getCountryByNameUseCase(stubInstrumentation, repository);

    await expect(useCase('France')).rejects.toThrow('Failed to fetch country by name');
  });
});
