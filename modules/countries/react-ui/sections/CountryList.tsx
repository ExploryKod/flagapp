import React from "react";
import { getInjection } from "@modules/di/container";
import { CountryCard } from "../components/CountryCard";
import { Country } from "@flagapp/modules/countries/core/models/country.entity";

type CountryListProps = {
  countries: Country[];
};

/**
 * Dumb view: only renders the list it receives (already filtered/sorted by the presenter).
 */
export const CountryList: React.FC<CountryListProps> = ({ countries }) => {
  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
      aria-label="List of countries"
    >
      {countries.map((country, index) => (
        <CountryCard
          key={`${country.id}-${index}`}
          country={country}
          className="min-w-0"
        />
      ))}
    </section>
  );
};

export const CountriesSkeleton: React.FC = () => {
  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
      aria-label="Loading countries"
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <article
          key={index}
          className="w-full min-w-0 overflow-hidden rounded-lg bg-[var(--elements)] shadow-md"
          aria-hidden
        >
          <div className="h-[160px] w-full animate-pulse rounded-t-lg bg-[var(--background)]/60" />
          <div className="px-6 py-5 space-y-3">
            <div className="h-5 w-3/4 max-w-[180px] animate-pulse rounded bg-[var(--foreground)]/20" />
            <ul className="list-none space-y-2">
              <li className="h-4 w-[60%] max-w-[140px] animate-pulse rounded bg-[var(--foreground)]/10" />
              <li className="h-4 w-[45%] max-w-[100px] animate-pulse rounded bg-[var(--foreground)]/10" />
              <li className="h-4 w-[55%] max-w-[120px] animate-pulse rounded bg-[var(--foreground)]/10" />
            </ul>
          </div>
        </article>
      ))}
    </section>
  );
};

/**
 * Fetches via controller for current text query (and optional region query); renders CountryList.
 * For use inside Suspense so only the list shows skeleton when query changes.
 */
export async function CountryListWithData({
  textQuery,
  regionQuery,
}: {
  textQuery?: string;
  regionQuery?: string;
}) {
  const getCountriesController = getInjection("IGetCountriesController");
  const viewModel = await getCountriesController({ textQuery, regionQuery });
  return <CountryList countries={viewModel.countries} />;
}