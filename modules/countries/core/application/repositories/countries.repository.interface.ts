import type { Country } from '@modules/countries/core/models/country.entity';

export interface ICountryRepository {
  getCountry(id: number): Promise<Country | undefined>;
  getCountries(): Promise<Country[]>;
}
