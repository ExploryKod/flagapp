import type { Country } from '@modules/countries/core/models/country.entity';
import type { ICountryRepository } from '@modules/countries/core/application/repositories/countries-repository.interface';
import {
  fetchAllCountriesV5,
  fetchCountryByCommonNameV5,
  fetchCountryNamesByAlpha3V5,
} from '@modules/countries/infra/repositories/rest-countries-v5.client';
import {
  mapToCountryDetailFromV5,
  mapToCountryFromV5,
} from '@modules/countries/infra/repositories/countries-v5.mapper';

export class CountriesRepository implements ICountryRepository {
  constructor() {}

  async getCountryByName(name: string): Promise<Country | undefined> {
    const raw = await fetchCountryByCommonNameV5(name);
    if (!raw) return undefined;

    const country = mapToCountryDetailFromV5(raw, 0);
    const borderCodes = raw.borders;
    if (Array.isArray(borderCodes) && borderCodes.length > 0) {
      country.borderCountryNames = await fetchCountryNamesByAlpha3V5(borderCodes);
    }
    return country;
  }

  async getCountries(): Promise<Country[]> {
    const raw = await fetchAllCountriesV5();
    return raw.map(mapToCountryFromV5);
  }
}
