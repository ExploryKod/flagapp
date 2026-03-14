import type { Country } from '@modules/countries/core/models/country.entity';

/**
 * DTO for the full REST Countries API response when fetching a single country by name.
 * Matches https://restcountries.com/v3.1/name/{name} response item shape.
 */
export type RestCountryDetailDTO = {
  ccn3?: string;
  name?: {
    common?: string;
    official?: string;
    nativeName?: Record<string, { common?: string; official?: string }>;
  };
  flags?: { png?: string; svg?: string; alt?: string };
  capital?: string[];
  population?: number;
  region?: string;
  subregion?: string;
  tld?: string[];
  borders?: string[];
  currencies?: Record<string, { name?: string; symbol?: string }>;
  languages?: Record<string, string>;
};

function firstNativeName(dto: RestCountryDetailDTO): string {
  const native = dto.name?.nativeName;
  if (!native || typeof native !== 'object') return '';
  const first = Object.values(native)[0];
  return first?.common ?? first?.official ?? '';
}

function formatCurrencies(dto: RestCountryDetailDTO): string {
  const cur = dto.currencies;
  if (!cur || typeof cur !== 'object') return '';
  return Object.values(cur)
    .map((c) => c?.name)
    .filter(Boolean)
    .join(', ');
}

function formatLanguages(dto: RestCountryDetailDTO): string {
  const lang = dto.languages;
  if (!lang || typeof lang !== 'object') return '';
  return Object.values(lang).filter(Boolean).join(', ');
}

function formatTld(dto: RestCountryDetailDTO): string {
  const tld = dto.tld;
  if (!Array.isArray(tld) || tld.length === 0) return '';
  return tld.join(', ');
}

/**
 * Maps a full REST country detail item to the domain Country entity.
 * Used only for getCountryByName (single country); border names are resolved in the repository.
 */
export function mapToCountryDetail(item: RestCountryDetailDTO, index: number): Country {
  const name = item.name?.common ?? '';
  const img = item.flags?.png ?? item.flags?.svg ?? '';
  const alt = item.flags?.alt ?? `${name} flag`;
  const id =
    item.ccn3 != null && item.ccn3 !== ''
      ? parseInt(item.ccn3, 10)
      : index;
  const capital =
    Array.isArray(item.capital) && item.capital.length > 0
      ? item.capital.join(', ')
      : '';

  return {
    id: Number.isNaN(id) ? index : id,
    name,
    flags: { img, alt },
    population: item.population ?? 0,
    region: item.region ?? '',
    capital,
    nativeName: firstNativeName(item) || undefined,
    subregion: item.subregion ?? undefined,
    tld: formatTld(item) || undefined,
    currencies: formatCurrencies(item) || undefined,
    languages: formatLanguages(item) || undefined,
  };
}
