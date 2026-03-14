import React from "react";
import { getInjection } from "@modules/di/container";
import { CountrySearcher } from "../components/CountrySearcher";
import { CountryRegionFilter } from "../components/CountryRegionFilter";

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
  const getCountriesController = getInjection("IGetCountriesController");
  const viewModel = await getCountriesController({});
  return <CountrySectionFilters regions={viewModel.allRegions} />;
}