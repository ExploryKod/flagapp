import type { Country } from '@modules/countries/core/models/country.entity';
import type { ICountryRepository } from '@modules/countries/core/application/repositories/countries.repository.interface';

const REST_COUNTRIES_URL =
  'https://restcountries.com/v3.1/all?fields=ccn3,name,flags,population,region,capital';

type RestCountryItem = {
  ccn3?: string;
  name?: { common?: string };
  flags?: { png?: string; svg?: string; alt?: string };
};

function mapToCountry(item: RestCountryItem, index: number): Country {
  const name = item.name?.common ?? '';
  const img = item.flags?.png ?? item.flags?.svg ?? '';
  const alt = item.flags?.alt ?? `${name} flag`;
  const id =
    item.ccn3 != null && item.ccn3 !== ''
      ? parseInt(item.ccn3, 10)
      : index;
  return {
    id: Number.isNaN(id) ? index : id,
    name,
    flags: { img, alt },
    population: 0,
    region: '',
    capital: ''
  };
}

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
