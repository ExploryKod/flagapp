import React from "react";
import { CountrySearcher } from "./CountrySearcher";
import { CountryRegionFilter } from "./CountryRegionFilter";
import { Country } from "@flagapp/modules/countries/core/models/country.entity";

export const CountrySectionFilters: React.FC<{ countries: Country[] }> = ({ countries }) => {
  return (
    <section className="mb-3 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
      <CountrySearcher placeholder="Search for a country..." />
      <CountryRegionFilter />
    </section>
  );
};