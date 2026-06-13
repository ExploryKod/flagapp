import type { Country } from '@modules/countries/core/models/country.entity';
import type { ICountryRepository } from '@modules/countries/core/application/repositories/countries-repository.interface';
import { mapToCountry } from '@modules/countries/infra/repositories/countries.mapper';
import { mapToCountryDetail } from '@modules/countries/infra/repositories/country-detail.mapper';
import {
  fetchAllCountries,
  fetchCountryByCommonName,
  fetchCountryNamesByAlpha3,
} from '@modules/countries/infra/repositories/rest-countries.client';

export class CountriesRepository implements ICountryRepository {
  constructor() {}

  async getCountryByName(name: string): Promise<Country | undefined> {
    const raw = await fetchCountryByCommonName(name);
    if (!raw) return undefined;

    const country = mapToCountryDetail(raw, 0);
    const borderCodes = raw.borders;
    if (Array.isArray(borderCodes) && borderCodes.length > 0) {
      country.borderCountryNames = await fetchCountryNamesByAlpha3(borderCodes);
    }
    return country;
  }

  async getCountries(): Promise<Country[]> {
    const raw = await fetchAllCountries();
    return raw.map(mapToCountry);
  }
}
