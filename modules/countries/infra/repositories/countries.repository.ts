import type { Country } from '@modules/countries/core/models/country.entity';
import type { ICountryRepository } from '@modules/countries/core/application/repositories/countries.repository.interface';
import { RestCountryItem, mapToCountry } from '@modules/countries/infra/repositories/countries.mapper';

const REST_COUNTRIES_URL =
  'https://restcountries.com/v3.1/all?fields=ccn3,name,flags,population,region,capital';

export class CountriesRepository implements ICountryRepository {
  constructor() {}

  async getCountry(_id: number): Promise<Country | undefined> {
    return undefined;
  }

  async getCountries(): Promise<Country[]> {
    const res = await fetch(REST_COUNTRIES_URL);
    const raw: RestCountryItem[] = await res.json();
    if (!Array.isArray(raw)) return [];
    return raw.map(mapToCountry);
  }
}
