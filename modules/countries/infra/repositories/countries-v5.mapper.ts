import type { Country } from '@modules/countries/core/models/country.entity';
import type { RestCountryV5Object } from './rest-countries-v5.types';

function firstNativeName(item: RestCountryV5Object): string {
  const native = item['names.native'];
  if (!native || typeof native !== 'object') return '';
  const first = Object.values(native)[0];
  return first?.common ?? first?.official ?? '';
}

function formatCapitals(item: RestCountryV5Object): string {
  const capitals = item.capitals;
  if (!Array.isArray(capitals) || capitals.length === 0) return '';
  return capitals.map((c) => c.name).filter(Boolean).join(', ');
}

function formatCurrencies(item: RestCountryV5Object): string {
  const cur = item.currencies;
  if (!cur || typeof cur !== 'object') return '';
  return Object.values(cur)
    .map((c) => c?.name)
    .filter(Boolean)
    .join(', ');
}

function formatLanguages(item: RestCountryV5Object): string {
  const lang = item.languages;
  if (!Array.isArray(lang) || lang.length === 0) return '';
  return lang.map((l) => l.name ?? l.native_name).filter(Boolean).join(', ');
}

function formatTld(item: RestCountryV5Object): string {
  const tld = item.tlds;
  if (!Array.isArray(tld) || tld.length === 0) return '';
  return tld.join(', ');
}

function mapBaseCountry(item: RestCountryV5Object, index: number): Country {
  const name = item['names.common'] ?? '';
  const img = item['flag.url_png'] ?? item['flag.url_svg'] ?? '';
  const alt = item['flag.description'] ?? `${name} flag`;
  const ccn3 = item['codes.ccn3'];
  const id = ccn3 != null && ccn3 !== '' ? parseInt(ccn3, 10) : index;

  return {
    id: Number.isNaN(id) ? index : id,
    name,
    flags: { img, alt },
    population: item.population ?? 0,
    region: item.region ?? '',
    capital: formatCapitals(item),
  };
}

export function mapToCountryFromV5(item: RestCountryV5Object, index: number): Country {
  return mapBaseCountry(item, index);
}

export function mapToCountryDetailFromV5(item: RestCountryV5Object, index: number): Country {
  const country = mapBaseCountry(item, index);
  return {
    ...country,
    nativeName: firstNativeName(item) || undefined,
    subregion: item.subregion ?? undefined,
    tld: formatTld(item) || undefined,
    currencies: formatCurrencies(item) || undefined,
    languages: formatLanguages(item) || undefined,
  };
}
