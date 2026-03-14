import { CountryListWithData } from "@modules/countries/react-ui/components/CountryListWithData";
import { CountrySectionFiltersWithData } from "@modules/countries/react-ui/components/CountrySectionFiltersWithData";
import { CountriesSkeleton } from "@modules/countries/react-ui/components/CountryList";
import { Header } from "@modules/app/react-ui/layout/Header";
import { Suspense } from "react";

/**
 * Filters in their own Suspense (no key) so they stay visible when query changes.
 * List in Suspense key=query so only the list shows skeleton when query changes.
 */
export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header className="max-w-[1200px] w-full mx-auto" />
      <main className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 space-y-8 py-6">
        <Suspense fallback={<div className="mb-3 h-[52px]" />}>
          <CountrySectionFiltersWithData />
        </Suspense>
        <Suspense key={query} fallback={<CountriesSkeleton />}>
          <CountryListWithData query={query} />
        </Suspense>
      </main>
    </div>
  );
}
