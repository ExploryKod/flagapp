import type { Country } from '@modules/countries/core/models/country.entity';

export interface ICountryRepository {
  getCountryByName(name: string): Promise<Country | undefined>;
  getCountries(): Promise<Country[]>;
}
