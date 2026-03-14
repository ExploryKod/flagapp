import type { IGetCountriesUseCase } from '@modules/countries/core/application/use-cases/get-countries.usecase';
import type { IGetCountriesOutputPort } from '@modules/countries/interface-adapters/presenters/get-countries.output-port';
import type { CountriesPageViewModel } from '@modules/countries/interface-adapters/presenters/get-countries.view-model';

export type IGetCountriesController = ReturnType<typeof getCountriesController>;

/** Input from the driver (e.g. page): search query and optional filters. */
export type GetCountriesControllerInput = { query?: string };

/**
 * Controller for "Get Countries" (Uncle Bob: "Interface Adapter" — input side).
 * Receives the request (e.g. query from URL) and orchestrates: use case then presenter.
 * Does not contain business or presentation logic; only the flow.
 */
export function getCountriesController(
  getCountriesUseCase: IGetCountriesUseCase,
  getCountriesOutputPort: IGetCountriesOutputPort
): (input?: GetCountriesControllerInput) => Promise<CountriesPageViewModel> {
  return async (input?: GetCountriesControllerInput): Promise<CountriesPageViewModel> => {
    const countries = await getCountriesUseCase();
    return getCountriesOutputPort.present(countries, input?.query);
  };
}
