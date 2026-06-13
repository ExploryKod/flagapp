import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Country } from "@flagapp/modules/countries/core/models/country.entity";

type CountryCardProps = {
  country: Country;
  href: string;
  className?: string;
};

export const CountryCard: React.FC<CountryCardProps> = ({ country, href, className }) => {
  const flagUrl = country.flags?.img ?? "";

  return (
    <Link
      href={href}
      className={`mx-auto block w-full max-w-[var(--card-image-w)] overflow-hidden rounded-lg bg-[var(--elements)] text-[var(--foreground)] shadow-md transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/30 ${className ?? ""}`.trim()}
      aria-label={`View details for ${country.name}`}
    >
      <div className="card-image-dimensions relative w-full overflow-hidden rounded-t-lg bg-[var(--background)]">
        {flagUrl ? (
          <Image
            src={flagUrl}
            alt={country.flags?.alt ?? `${country.name} flag`}
            width={264}
            height={160}
            sizes="(max-width: 384px) 100vw, 264px"
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="px-6 py-5 country-card-min-h">
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
    </Link>
  );
};

export function countrySlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}
