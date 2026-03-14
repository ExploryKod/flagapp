import React from "react";
import { CountrySearcher } from "./CountrySearcher";
import { CountryRegionFilter } from "./CountryRegionFilter";

/** regions: from presenter (viewModel.allRegions) only. */
export const CountrySectionFilters: React.FC<{ regions: string[] }> = ({ regions }) => {
  return (
    <section className="mb-3 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
      <CountrySearcher placeholder="Search for a country..." />
      <CountryRegionFilter regions={regions} />
    </section>
  );
};