import { RestCountriesApiError, toRestCountriesApiError } from '@modules/countries/infra/errors/rest-countries-api.error';
import { RestCountriesErrorPanel } from './RestCountriesErrorPanel';

export function renderRestCountriesError(error: unknown, options?: { showHomeLink?: boolean }) {
  const apiError = toRestCountriesApiError(error);
  if (!apiError) throw error;

  return <RestCountriesErrorPanel {...apiError.toDisplay()} showHomeLink={options?.showHomeLink} />;
}

export function serializeRestCountriesErrorForBoundary(error: unknown): never {
  const apiError = toRestCountriesApiError(error);
  if (apiError) throw apiError.serializeForBoundary();
  throw error;
}
