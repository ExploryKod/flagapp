import type { RestCountriesApiResponse, RestCountryItem } from './countries.mapper';

const REST_COUNTRIES_BASE = 'https://api.restcountries.com/countries/v5';

const LIST_FIELDS =
  'names.common,codes.ccn3,codes.alpha_2,flag.url_png,flag.url_svg,flag.description,population,region,capitals';

const DETAIL_FIELDS =
  'names.common,names.native,codes.ccn3,codes.alpha_2,flag.url_png,flag.url_svg,flag.description,population,region,subregion,capitals,tlds,borders,currencies,languages';

function getApiKey(): string {
  const apiKey = process.env.REST_COUNTRIES_API_KEY;
  if (!apiKey) {
    throw new Error('REST_COUNTRIES_API_KEY is not set');
  }
  return apiKey;
}

function authHeaders(): HeadersInit {
  return { Authorization: `Bearer ${getApiKey()}` };
}

async function parseResponse(res: Response): Promise<RestCountriesApiResponse> {
  const body = (await res.json()) as RestCountriesApiResponse;
  if (!res.ok || body.errors?.length) {
    const message = body.errors?.[0]?.message ?? res.statusText;
    throw new Error(`REST Countries API error: ${message}`);
  }
  return body;
}

export async function fetchAllCountries(): Promise<RestCountryItem[]> {
  const all: RestCountryItem[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const url = `${REST_COUNTRIES_BASE}?limit=${limit}&offset=${offset}&response_fields=${LIST_FIELDS}`;
    const res = await fetch(url, { headers: authHeaders(), next: { revalidate: 3600 } });
    const body = await parseResponse(res);
    const objects = body.data?.objects ?? [];
    all.push(...objects);
    if (!body.data?.meta?.more) break;
    offset += limit;
  }

  return all;
}

export async function fetchCountryByCommonName(name: string): Promise<RestCountryItem | undefined> {
  const url = `${REST_COUNTRIES_BASE}/names.common/${encodeURIComponent(name)}?response_fields=${DETAIL_FIELDS}`;
  const res = await fetch(url, { headers: authHeaders(), next: { revalidate: 3600 } });
  if (res.status === 404) return undefined;
  const body = await parseResponse(res);
  return body.data?.objects?.[0];
}

export async function fetchCountryNamesByAlpha3(codes: string[]): Promise<string[]> {
  const names = await Promise.all(
    codes.map(async (code) => {
      const url = `${REST_COUNTRIES_BASE}/codes.alpha_3/${encodeURIComponent(code)}?response_fields=names.common`;
      const res = await fetch(url, { headers: authHeaders(), next: { revalidate: 3600 } });
      if (res.status === 404) return '';
      const body = await parseResponse(res);
      return body.data?.objects?.[0]?.['names.common'] ?? '';
    })
  );
  return names.filter(Boolean);
}
