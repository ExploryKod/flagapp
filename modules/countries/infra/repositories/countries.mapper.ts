import type { Country } from '@modules/countries/core/models/country.entity';

/** Single country object from REST Countries API (flat dot-notation keys). */
export type RestCountryItem = {
  'names.common'?: string;
  'names.official'?: string;
  'names.native'?: Record<string, { common?: string; official?: string }>;
  'codes.ccn3'?: string;
  'codes.alpha_2'?: string;
  'flag.url_png'?: string;
  'flag.url_svg'?: string;
  'flag.description'?: string;
  population?: number;
  region?: string;
  subregion?: string;
  capitals?: Array<{ name?: string }>;
  tlds?: string[];
  borders?: string[];
  currencies?: Record<string, { name?: string; symbol?: string }>;
  languages?: Array<{ name?: string; native_name?: string }>;
};

export type RestCountriesApiResponse = {
  data?: {
    objects: RestCountryItem[];
    meta?: { total?: number; count?: number; limit?: number; offset?: number; more?: boolean };
  };
  errors?: Array<{ message?: string }>;
};

function formatCapitals(item: RestCountryItem): string {
  const capitals = item.capitals;
  if (!Array.isArray(capitals) || capitals.length === 0) return '';
  return capitals.map((c) => c.name).filter(Boolean).join(', ');
}

function resolveFlagUrl(item: RestCountryItem): string {
  const fromApi = item['flag.url_png'] ?? item['flag.url_svg'] ?? '';
  if (fromApi) return fromApi;

  const alpha2 = item['codes.alpha_2'];
  if (alpha2) {
    return `https://flags.restcountries.com/v5/w320/${alpha2.toLowerCase()}.png`;
  }

  return '';
}

export function mapToCountry(item: RestCountryItem, index: number): Country {
  const name = item['names.common'] ?? '';
  const img = resolveFlagUrl(item);
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
