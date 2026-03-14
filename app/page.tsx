import { CountryListWithData, CountriesSkeleton } from "@flagapp/modules/countries/react-ui/sections/CountryList";
import { CountrySectionFiltersWithData } from "@flagapp/modules/countries/react-ui/sections/CountrySectionFilters";
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
      <main className="header-main-y header-max-w content-space-x">
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
