import type { Country } from '@modules/countries/core/models/country.entity';
import type { ICountryRepository } from '@modules/countries/core/application/repositories/countries-repository.interface';
import { RestCountryItem, mapToCountry } from '@modules/countries/infra/repositories/countries.mapper';
import {
  type RestCountryDetailDTO,
  mapToCountryDetail,
} from '@modules/countries/infra/repositories/country-detail.mapper';

const REST_COUNTRIES_URL =
  'https://restcountries.com/v3.1/all?fields=ccn3,name,flags,population,region,capital';

const REST_COUNTRY_URL = 'https://restcountries.com/v3.1/name/{name}';
const REST_ALPHA_URL = 'https://restcountries.com/v3.1/alpha?codes={codes}&fields=name';

export class CountriesRepository implements ICountryRepository {
  constructor() {}

  async getCountryByName(name: string): Promise<Country | undefined> {
    const res = await fetch(REST_COUNTRY_URL.replace('{name}', encodeURIComponent(name)));
    if (!res.ok) return undefined;
    const raw: RestCountryDetailDTO[] = await res.json();
    if (!Array.isArray(raw) || raw.length === 0) return undefined;
    const country = mapToCountryDetail(raw[0], 0);
    const borderCodes = raw[0].borders;
    if (Array.isArray(borderCodes) && borderCodes.length > 0) {
      const names = await this.fetchBorderCountryNames(borderCodes);
      country.borderCountryNames = names;
    }
    return country;
  }

  private async fetchBorderCountryNames(codes: string[]): Promise<string[]> {
    const codesParam = codes.map((c) => c.toLowerCase()).join(',');
    const res = await fetch(REST_ALPHA_URL.replace('{codes}', codesParam));
    if (!res.ok) return [];
    const items: { name?: { common?: string } }[] = await res.json();
    if (!Array.isArray(items)) return [];
    return items.map((i) => i.name?.common ?? '').filter(Boolean);
  }

  async getCountries(): Promise<Country[]> {
    const res = await fetch(REST_COUNTRIES_URL);
    const raw: RestCountryItem[] = await res.json();
    if (!Array.isArray(raw)) return [];
    return raw.map(mapToCountry);
  }
}
