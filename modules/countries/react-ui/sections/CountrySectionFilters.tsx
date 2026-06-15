import React from "react";
import { getCountriesPageViewModel } from "@modules/countries/interface-adapters/cached/get-countries.cached";
import { CountrySearcher } from "../components/CountrySearcher";
import { CountryRegionFilter } from "../components/CountryRegionFilter";
import { renderRestCountriesError } from "../components/render-rest-countries-error";

/** regions: from presenter (viewModel.allRegions) only. */
export const CountrySectionFilters: React.FC<{ regions: string[] }> = ({ regions }) => {
  return (
    <section className="header-search-gap-y mb-3 flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <CountrySearcher placeholder="Search for a country..." />
      <CountryRegionFilter regions={regions} />
    </section>
  );
};

/**
 * Fetches once to get allRegions from presenter; renders CountrySectionFilters.
 * For use in its own Suspense (no key) so filters stay visible when query changes.
 */
export async function CountrySectionFiltersWithData() {
  try {
    const viewModel = await getCountriesPageViewModel({});
    return <CountrySectionFilters regions={viewModel.allRegions} />;
  } catch (error) {
    return renderRestCountriesError(error);
  }
}