import { getInjection } from "@modules/di/container";
import { CountryList } from "./CountryList";

type Props = { query: string };

/**
 * Fetches via controller for current query; renders list only.
 * Inside Suspense key=query so only the list shows skeleton when query changes; filters stay visible.
 */
export async function CountryListWithData({ query }: Props) {
  const getCountriesController = getInjection("IGetCountriesController");
  const viewModel = await getCountriesController({ query });
  return <CountryList countries={viewModel.countries} />;
}
