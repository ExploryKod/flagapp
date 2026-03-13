import React from "react";
import { CountryCard } from "./CountryCard";
import { Country } from "@flagapp/modules/countries/core/models/country.entity";

type CountryListProps = {
  countries: Country[];
};

export const CountryList: React.FC<CountryListProps> = ({ countries }) => {
  return (
    <section>
      <h1>Countries</h1>
      <div className="flex flex-wrap gap-4 justify-between">
        {countries.map((country, index) => (
          <CountryCard key={`${country.id}-${index}`} country={country} />
        ))}
      </div>
    </section>
  );
};
