import { CountryListWithData, CountriesSkeleton } from "@flagapp/modules/countries/react-ui/sections/CountryList";
import { CountrySectionFiltersWithData } from "@flagapp/modules/countries/react-ui/sections/CountrySectionFilters";
import { Header } from "@modules/app/react-ui/layout/Header";
import { Suspense } from "react";

/**
 * Filters in their own Suspense (no key) so they stay visible when query changes.
 * List in Suspense key=textQuery+regionQuery so only the list shows skeleton when either changes.
 */
export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    region?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const textQuery = searchParams?.query ?? "";
  const regionQuery = searchParams?.region ?? "";

  return (
      <main className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 space-y-8 py-6">
        <Suspense fallback={<div className="mb-3 h-[52px]" />}>
          <CountrySectionFiltersWithData />
        </Suspense>
        <Suspense key={`${textQuery}-${regionQuery}`} fallback={<CountriesSkeleton />}>
          <CountryListWithData
          textQuery={textQuery || undefined}
          regionQuery={regionQuery && regionQuery !== "all" ? regionQuery : undefined}
        />
        </Suspense>
      </main>
  );
}
