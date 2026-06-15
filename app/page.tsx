import {
  HomeCountriesSection,
  HomeCountriesSkeleton,
} from "@flagapp/modules/countries/react-ui/sections/HomeCountriesSection";
import { Suspense } from "react";

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
        <Suspense key={`${textQuery}-${regionQuery}`} fallback={<HomeCountriesSkeleton />}>
          <HomeCountriesSection
            textQuery={textQuery || undefined}
            regionQuery={regionQuery && regionQuery !== "all" ? regionQuery : undefined}
          />
        </Suspense>
      </main>
  );
}
