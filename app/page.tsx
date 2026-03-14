import { CountryListWithData } from "@modules/countries/react-ui/components/CountryListWithData";
import { CountriesSkeleton } from "@modules/countries/react-ui/components/CountryList";
import { Header } from "@modules/app/react-ui/layout/Header";
import { CountrySectionFilters } from "@modules/countries/react-ui/components/CountrySectionFilters";
import { Suspense } from "react";

/**
 * Page = Framework & Drivers (Uncle Bob). Data for the list is fetched inside
 * Suspense so that when the search query changes, the skeleton is shown until
 * the new list is ready (user sees loading feedback during the short re-render).
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
        <CountrySectionFilters countries={[]} />
        <Suspense key={query} fallback={<CountriesSkeleton />}>
          <CountryListWithData query={query} />
        </Suspense>
      </main>
    </div>
  );
}
