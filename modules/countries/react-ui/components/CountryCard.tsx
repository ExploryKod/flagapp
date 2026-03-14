import React from "react";
import { Country } from "@flagapp/modules/countries/core/models/country.entity";
import Image from "next/image";

type CountryCardProps = {
  country: Country;
  className?: string;
};

export const CountryCard: React.FC<CountryCardProps> = ({ country, className }) => {
  const flagUrl = country.flags?.img || "";

  return (
    <article className={`max-w-[250px] w-full overflow-hidden rounded-lg bg-[var(--elements)] text-[var(--foreground)] shadow-md ${className ?? ""}`.trim()}>
      <div className="relative h-[160px] w-full overflow-hidden rounded-t-lg bg-[var(--background)]">
        {flagUrl && (
          <Image
            src={flagUrl}
            alt={country.flags?.alt ?? `${country.name} flag`}
            fill
            sizes="(max-width: 384px) 100vw, 280px"
            className="object-cover rounded-t-lg"
          />
        )}
      </div>
      <div className="px-6 py-5">
        <h2 className="mb-3 text-lg font-bold">{country.name}</h2>
        <ul className="list-none space-y-1 text-sm opacity-90">
          <li>
            <span className="font-semibold">Population:</span>{" "}
            {country.population.toLocaleString()}
          </li>
          <li>
            <span className="font-semibold">Region:</span>{" "}
            {country.region || "—"}
          </li>
          <li>
            <span className="font-semibold">Capital:</span>{" "}
            {country.capital || "—"}
          </li>
        </ul>
      </div>
    </article>
  );
};

