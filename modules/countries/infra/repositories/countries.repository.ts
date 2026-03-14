import type { Country } from '@modules/countries/core/models/country.entity';
import type { ICountryRepository } from '@modules/countries/core/application/repositories/countries-repository.interface';
import { RestCountryItem, mapToCountry } from '@modules/countries/infra/repositories/countries.mapper';

const REST_COUNTRIES_URL =
  'https://restcountries.com/v3.1/all?fields=ccn3,name,flags,population,region,capital';

const REST_COUNTRY_URL = 'https://restcountries.com/v3.1/name/{name}';

export class CountriesRepository implements ICountryRepository {
  constructor() {}

  async getCountryByName(name: string): Promise<Country | undefined> {
    const res = await fetch(REST_COUNTRY_URL.replace('{name}', encodeURIComponent(name)));
    if (!res.ok) return undefined;
    const raw: RestCountryItem[] = await res.json();
    if (!Array.isArray(raw) || raw.length === 0) return undefined;
    return mapToCountry(raw[0], 0);
  }

  async getCountries(): Promise<Country[]> {
    const res = await fetch(REST_COUNTRIES_URL);
    const raw: RestCountryItem[] = await res.json();
    if (!Array.isArray(raw)) return [];
    return raw.map(mapToCountry);
  }
}
