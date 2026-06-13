import type { Country } from '@modules/countries/core/models/country.entity';
import type { RestCountryItem } from './countries.mapper';
import { mapToCountry } from './countries.mapper';

function firstNativeName(item: RestCountryItem): string {
  const native = item['names.native'];
  if (!native || typeof native !== 'object') return '';
  const first = Object.values(native)[0];
  return first?.common ?? first?.official ?? '';
}

function formatCurrencies(item: RestCountryItem): string {
  const cur = item.currencies;
  if (!cur || typeof cur !== 'object') return '';
  return Object.values(cur)
    .map((c) => c?.name)
    .filter(Boolean)
    .join(', ');
}

function formatLanguages(item: RestCountryItem): string {
  const lang = item.languages;
  if (!Array.isArray(lang) || lang.length === 0) return '';
  return lang.map((l) => l.name ?? l.native_name).filter(Boolean).join(', ');
}

function formatTld(item: RestCountryItem): string {
  const tld = item.tlds;
  if (!Array.isArray(tld) || tld.length === 0) return '';
  return tld.join(', ');
}

/**
 * Maps a full REST country item to the domain Country entity (detail page).
 * Border names are resolved in the repository.
 */
export function mapToCountryDetail(item: RestCountryItem, index: number): Country {
  const country = mapToCountry(item, index);
  return {
    ...country,
    nativeName: firstNativeName(item) || undefined,
    subregion: item.subregion ?? undefined,
    tld: formatTld(item) || undefined,
    currencies: formatCurrencies(item) || undefined,
    languages: formatLanguages(item) || undefined,
  };
}
