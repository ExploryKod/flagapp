import type { IGetCountryByNameUseCase } from '@modules/countries/core/application/use-cases/get-country-by-name.usecase';
import type { IGetCountryByNameOutputPort } from '@modules/countries/interface-adapters/presenters/get-country-by-name.output-port';
import type { CountryByNamePageViewModel } from '@modules/countries/interface-adapters/presenters/get-country-by-name.view-model';

export type IGetCountryByNameController = ReturnType<typeof getCountryByNameController>;

export type GetCountryByNameControllerInput = { name: string };

/**
 * Controller for "Get Country by Name" (Uncle Bob: "Interface Adapter" — input side).
 * Receives the request and orchestrates: use case then presenter.
 */
export function getCountryByNameController(
  getCountryByNameUseCase: IGetCountryByNameUseCase,
  getCountryByNameOutputPort: IGetCountryByNameOutputPort
): (input: GetCountryByNameControllerInput) => Promise<CountryByNamePageViewModel> {
  return async (input: GetCountryByNameControllerInput): Promise<CountryByNamePageViewModel> => {
    const country = await getCountryByNameUseCase(input.name);
    return getCountryByNameOutputPort.present(country);
  };
}
