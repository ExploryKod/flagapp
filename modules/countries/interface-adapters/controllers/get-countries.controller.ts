import type { IGetCountriesUseCase } from '@modules/countries/core/application/use-cases/get-countries.usecase';
import type { IGetCountriesOutputPort } from '@modules/countries/interface-adapters/presenters/get-countries.output-port';
import type { CountriesPageViewModel } from '@modules/countries/interface-adapters/presenters/get-countries.view-model';

export type IGetCountriesController = ReturnType<typeof getCountriesController>;

/**
 * Input from the driver (e.g. page). Two separate concerns:
 * - textQuery: from the search input — filter by country name (text).
 * - regionQuery: from the region select — exact match on country.region (API).
 */
export type GetCountriesControllerInput = { textQuery?: string; regionQuery?: string };

/**
 * Controller for "Get Countries" (Uncle Bob: "Interface Adapter" — input side).
 * Receives the request and orchestrates: use case then presenter.
 */
export function getCountriesController(
  getCountriesUseCase: IGetCountriesUseCase,
  getCountriesOutputPort: IGetCountriesOutputPort
): (input?: GetCountriesControllerInput) => Promise<CountriesPageViewModel> {
  return async (input?: GetCountriesControllerInput): Promise<CountriesPageViewModel> => {
    const countries = await getCountriesUseCase();
    return getCountriesOutputPort.present(countries, input?.textQuery, input?.regionQuery);
  };
}
