/** Single country object returned by REST Countries v5 (flat dot-notation keys). */
export type RestCountryV5Object = {
  'names.common'?: string;
  'names.official'?: string;
  'names.native'?: Record<string, { common?: string; official?: string }>;
  'codes.ccn3'?: string;
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

export type RestCountriesV5Response = {
  data?: {
    objects: RestCountryV5Object[];
    meta?: { total?: number; count?: number; limit?: number; offset?: number; more?: boolean };
  };
  errors?: Array<{ message?: string }>;
};
