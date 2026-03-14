import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { CountryByNamePageViewModel } from "@flagapp/modules/countries/interface-adapters/presenters/get-country-by-name.view-model";

type CountryArticleProps = {
  viewModel: CountryByNamePageViewModel;
  layoutClassName?: string;
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="leading-relaxed">
      <span className="font-semibold text-[var(--foreground)]">{label}: </span>
      <span className="text-[var(--foreground)]">{value}</span>
    </p>
  );
}

export const CountryArticle: React.FC<CountryArticleProps> = ({ viewModel, layoutClassName = "" }) => {
  const { country, borderCountryNames = [] } = viewModel;

  if (!country) {
    return (
      <article className="text-[var(--foreground)]">
        <h1 className="text-2xl font-bold">Country not found</h1>
      </article>
    );
  }

  const flagUrl = country.flags?.img ?? "";
  const slug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

  return (
    <article
      className={`flex flex-col gap-8 md:flex-row md:gap-12 lg:gap-20 text-[var(--foreground)] ${layoutClassName ?? ""}`.trim()}
      aria-label={`Details for ${country.name}`}
    >
      {/* Flag — left */}
      <div className="flex-shrink-0 w-full md:w-1/2 lg:w-2/5 aspect-[4/3] relative overflow-hidden rounded-sm bg-transparent">
        {flagUrl && (
          <Image
            src={flagUrl}
            alt={country.flags?.alt ?? `${country.name} flag`}
            width={500}
            height={500}
            sizes="(max-width: 768px) 100vw, 50vw, 40vw"
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Details — right */}
      <div className="flex flex-grow flex-col gap-6 md:w-1/2 lg:w-3/5">
        <h1 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
          {country.name}
        </h1>

        {/* Two columns of key-value details */}
        <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-10 md:gap-y-1">
          <div className="space-y-1">
            <DetailRow label="Population" value={country.population.toLocaleString()} />
            <DetailRow label="Region" value={country.region || "—"} />
            <DetailRow label="Capital" value={country.capital || "—"} />
          </div>
          <div className="space-y-1">
            {/* Right column: extend with Native Name, Sub Region, TLD, Currencies, Languages when available from API */}
          </div>
        </div>

        {/* Border Countries */}
        {borderCountryNames.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-base font-semibold text-[var(--foreground)] mr-2">
              Border Countries:
            </span>
            <div className="flex flex-wrap gap-2">
              {borderCountryNames.map((name) => (
                <Link
                  key={name}
                  href={`/${slug(name)}`}
                  className="inline-block rounded px-4 py-1.5 text-sm font-medium bg-[var(--elements)] text-[var(--foreground)] shadow-md transition-opacity hover:opacity-90"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export const CountryArticleSkeleton: React.FC = () => {
  return (
    <article className="flex flex-col gap-8 md:flex-row md:gap-12 lg:gap-20">
      <div className="w-full md:w-1/2 lg:w-2/5 aspect-[4/3] animate-pulse rounded-sm bg-[var(--elements)]" />
      <div className="flex flex-grow flex-col gap-6 md:w-1/2 lg:w-3/5">
        <div className="h-9 w-48 animate-pulse rounded bg-[var(--elements)]" />
        <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-5 w-full max-w-[200px] animate-pulse rounded bg-[var(--elements)]" />
          ))}
        </div>
      </div>
    </article>
  );
};
