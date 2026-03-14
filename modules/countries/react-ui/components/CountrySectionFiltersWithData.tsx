import { getInjection } from "@modules/di/container";
import { CountrySectionFilters } from "./CountrySectionFilters";

/**
 * Fetches once to get allRegions from presenter; renders filters.
 * In its own Suspense (no key), so it does not re-suspend when query changes — filters stay visible.
 */
export async function CountrySectionFiltersWithData() {
  const getCountriesController = getInjection("IGetCountriesController");
  const viewModel = await getCountriesController({});
  return <CountrySectionFilters regions={viewModel.allRegions} />;
}
