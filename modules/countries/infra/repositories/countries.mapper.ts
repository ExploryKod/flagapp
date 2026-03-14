import type { Country } from '@modules/countries/core/models/country.entity';

export type RestCountryItem = {
    ccn3?: string;
    name?: { common?: string; official?: string; nativeName?: Record<string, { common?: string; official?: string }> };
    flags?: { png?: string; svg?: string; alt?: string };
    capital?: string[];
    population?: number;
    region?: string;
  };
  
  export function mapToCountry(item: RestCountryItem, index: number): Country {
    const name = item.name?.common ?? '';
    const img = item.flags?.png ?? item.flags?.svg ?? '';
    const alt = item.flags?.alt ?? `${name} flag`;
    const id =
      item.ccn3 != null && item.ccn3 !== ''
        ? parseInt(item.ccn3, 10)
        : index;
    const capital = Array.isArray(item.capital) && item.capital.length > 0
      ? item.capital.join(', ')
      : '';
  
    return {
      id: Number.isNaN(id) ? index : id,
      name,
      flags: { img, alt },
      population: item.population ?? 0,
      region: item.region ?? '',
      capital,
    };
  }