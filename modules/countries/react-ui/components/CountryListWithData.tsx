import { getInjection } from "@modules/di/container";
import { CountryList } from "./CountryList";

type Props = { query: string };

/**
 * Async server component that fetches countries for the current query.
 * Used inside Suspense so that when the query changes, this component suspends
 * and the parent Suspense fallback (CountriesSkeleton) is shown until the new list is ready.
 */
export async function CountryListWithData({ query }: Props) {
  const getCountriesController = getInjection("IGetCountriesController");
  const viewModel = await getCountriesController({ query });
  return <CountryList countries={viewModel.countries} />;
}
