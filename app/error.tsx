'use client';

import { useEffect } from 'react';
import { RestCountriesApiError } from '@modules/countries/infra/errors/rest-countries-api.error';
import { RestCountriesErrorPanel } from '@modules/countries/react-ui/components/RestCountriesErrorPanel';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const apiError = RestCountriesApiError.fromSerialized(error);

  if (apiError) {
    return (
      <main className="header-main-y header-max-w content-space-x py-8">
        <RestCountriesErrorPanel {...apiError} />
      </main>
    );
  }

  return (
    <main className="header-main-y header-max-w content-space-x py-8">
      <section
        className="mx-auto w-full max-w-xl rounded-lg bg-[var(--elements)] p-6 text-[var(--foreground)] shadow-md sm:p-8"
        role="alert"
      >
        <h2 className="mb-2 text-xl font-bold sm:text-2xl">Something went wrong</h2>
        <p className="mb-4 text-sm leading-relaxed opacity-90">
          An unexpected error occurred while loading this page.
        </p>
        {error.message ? (
          <p className="mb-6 rounded-md bg-[var(--background)]/60 p-4 text-sm">{error.message}</p>
        ) : null}
        <button
          type="button"
          onClick={reset}
          className="country-page-back-btn inline-flex items-center rounded-md bg-[var(--background)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] shadow-md transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
