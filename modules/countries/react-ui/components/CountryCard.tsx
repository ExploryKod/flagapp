import React from "react";
import { Country } from "@flagapp/modules/countries/core/models/country.entity";
import Image from "next/image";

type CountryCardProps = {
  country: Country;
};

export const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const flagUrl = country.flags?.img || "";

  return (
    <article className="max-w-1/4 w-full shadow-md p-0">
      <div className="w-full flex items-center justify-center">
        {flagUrl && (
          <Image src={flagUrl} alt={`${country.name} flag`} width={200} height={100} className="w-full" />
        )}
      </div>
      <div className="p-4">
        <h2 className="mb-3 text-2xl font-bold">{country.name}</h2>
        <ul className="list-none">
          <li className="mb-1"><span className="font-bold">Population:</span> {country.population}</li>
          <li className="mb-1"><span className="font-bold">Region:</span> {country.region}</li>
          <li className="mb-1"><span className="font-bold">Capital:</span> {country.capital}</li>
        </ul>
      </div>
    </article>
  );
};

