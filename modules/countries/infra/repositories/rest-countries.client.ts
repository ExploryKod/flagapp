import type { RestCountriesApiResponse, RestCountryItem } from './countries.mapper';
import { RestCountriesApiError } from '@modules/countries/infra/errors/rest-countries-api.error';

const REST_COUNTRIES_BASE = 'https://api.restcountries.com/countries/v5';

const LIST_FIELDS =
  'names.common,codes.ccn3,codes.alpha_2,flag.url_png,flag.url_svg,flag.description,population,region,capitals';

const DETAIL_FIELDS =
  'names.common,names.native,codes.ccn3,codes.alpha_2,flag.url_png,flag.url_svg,flag.description,population,region,subregion,capitals,tlds,borders,currencies,languages';

function getApiKey(): string {
  const apiKey = process.env.REST_COUNTRIES_API_KEY;
  if (!apiKey) {
    throw new RestCountriesApiError(0, ['REST_COUNTRIES_API_KEY is not set on the server']);
  }
  return apiKey;
}

function authHeaders(): HeadersInit {
  return { Authorization: `Bearer ${getApiKey()}` };
}

async function parseResponse(res: Response): Promise<RestCountriesApiResponse> {
  let body: RestCountriesApiResponse;

  try {
    body = (await res.json()) as RestCountriesApiResponse;
  } catch {
    throw new RestCountriesApiError(res.status, [
      `Invalid JSON response from REST Countries (${res.status} ${res.statusText})`,
    ]);
  }

  const apiMessages = body.errors?.map((e) => e.message).filter(Boolean) as string[] | undefined;

  if (!res.ok || (apiMessages && apiMessages.length > 0)) {
    throw new RestCountriesApiError(
      res.status,
      apiMessages?.length ? apiMessages : [`HTTP ${res.status} ${res.statusText}`]
    );
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
      return body.data?.objects?.[0]?.names?.common ?? '';
    })
  );
  return names.filter(Boolean);
}
