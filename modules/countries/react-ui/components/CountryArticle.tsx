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
  const { country } = viewModel;
  const borderCountryNames = viewModel.borderCountryNames ?? country?.borderCountryNames ?? [];

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
      className={`country-article-layout text-[var(--foreground)] ${layoutClassName ?? ""}`.trim()}
      aria-label={`Details for ${country.name}`}
    >
      {/* Flag — 50% on desktop, max 560×401 */}
      <div className="country-flag-dimensions w-full relative overflow-hidden rounded-sm bg-transparent">
        {flagUrl && (
          <Image
            src={flagUrl}
            alt={country.flags?.alt ?? `${country.name} flag`}
            width={560}
            height={401}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover w-full h-full"
            priority
          />
        )}
      </div>

      {/* Details — 50% on desktop */}
      <div className="flex flex-col gap-6 min-w-0">
        <h1 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
          {country.name}
        </h1>

        {/* Two columns of key-value details */}
        <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-10 md:gap-y-1">
          <div className="space-y-1">
            {country.nativeName != null && country.nativeName !== "" && (
              <DetailRow label="Native Name" value={country.nativeName} />
            )}
            <DetailRow label="Population" value={country.population.toLocaleString()} />
            <DetailRow label="Region" value={country.region || "—"} />
            {country.subregion != null && country.subregion !== "" && (
              <DetailRow label="Sub Region" value={country.subregion} />
            )}
            <DetailRow label="Capital" value={country.capital || "—"} />
          </div>
          <div className="mt-[32px] md:mt-0 space-y-1">
            {country.tld != null && country.tld !== "" && (
              <DetailRow label="Top Level Domain" value={country.tld} />
            )}
            {country.currencies != null && country.currencies !== "" && (
              <DetailRow label="Currencies" value={country.currencies} />
            )}
            {country.languages != null && country.languages !== "" && (
              <DetailRow label="Languages" value={country.languages} />
            )}
          </div>
        </div>

        {/* Border Countries */}
        {(borderCountryNames?.length ?? 0) > 0 && (
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
    <article className="country-article-layout">
      <div className="country-flag-dimensions w-full animate-pulse rounded-sm bg-[var(--elements)]" />
      <div className="flex flex-col gap-6 min-w-0">
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
