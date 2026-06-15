import React from 'react';
import { getCountriesPageViewModel } from '@modules/countries/interface-adapters/cached/get-countries.cached';
import { CountrySectionFilters } from './CountrySectionFilters';
import { CountryList, CountriesSkeleton } from './CountryList';
import { renderRestCountriesError } from '../components/render-rest-countries-error';

export function HomeCountriesSkeleton() {
  return (
    <>
      <div className="mb-3 h-[52px]" aria-hidden />
      <CountriesSkeleton />
    </>
  );
}

/**
 * Single fetch for filters + list so the home page shows one error panel and one API call per request.
 */
export async function HomeCountriesSection({
  textQuery,
  regionQuery,
}: {
  textQuery?: string;
  regionQuery?: string;
}) {
  try {
    const viewModel = await getCountriesPageViewModel({ textQuery, regionQuery });
    return (
      <>
        <CountrySectionFilters regions={viewModel.allRegions} />
        <CountryList countries={viewModel.countries} />
      </>
    );
  } catch (error) {
    return renderRestCountriesError(error);
  }
}
