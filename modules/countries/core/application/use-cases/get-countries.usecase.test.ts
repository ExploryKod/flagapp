import { getCountriesUseCase } from './get-countries.usecase';
import { StubCountriesRepository } from '@modules/countries/core/testing/stub.countries-repository';
import type { Country } from '@modules/countries/core/models/country.entity';

const noopInstrumentation = {
  startSpan<T>(_opts: { name: string; op?: string }, callback: () => T): T {
    return callback();
  },
  instrumentServerAction<T>(_name: string, _opts: object, callback: () => T): Promise<T> {
    return Promise.resolve(callback());
  },
};

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

describe('Get countries use case', () => {
  it('should return countries from the repository', async () => {
    const countries: Country[] = [
      makeCountry({ id: 1, name: 'France' }),
      makeCountry({ id: 2, name: 'Germany' }),
    ];
    const repository = new StubCountriesRepository(countries);
    const useCase = getCountriesUseCase(noopInstrumentation, repository);

    const result = await useCase();

    expect(result).toEqual(countries);
    expect(result).toHaveLength(2);
  });

  it('should return an empty array when repository has no countries', async () => {
    const repository = new StubCountriesRepository([]);
    const useCase = getCountriesUseCase(noopInstrumentation, repository);

    const result = await useCase();

    expect(result).toEqual([]);
  });

  it('should propagate repository errors', async () => {
    const error = new Error('Failed to fetch countries');
    const repository = new StubCountriesRepository([], error);
    const useCase = getCountriesUseCase(noopInstrumentation, repository);

    await expect(useCase()).rejects.toThrow('Failed to fetch countries');
  });
});
