import type { Country } from '@modules/countries/core/models/country.entity';
import type { ICountryRepository } from '@modules/countries/core/application/repositories/countries.repository.interface';

/**
 * Stub implementation of ICountryRepository for unit tests.
 * Returns configurable data (or rejects) without hitting the real API.
 */
export class StubCountriesRepository implements ICountryRepository {
  constructor(
    private readonly countries: Country[] = [],
    private readonly getCountriesError?: Error
  ) {}

  async getCountry(_id: number): Promise<Country | undefined> {
    return undefined;
  }

  async getCountries(): Promise<Country[]> {
    if (this.getCountriesError) {
      throw this.getCountriesError;
    }
    return [...this.countries];
  }
}
