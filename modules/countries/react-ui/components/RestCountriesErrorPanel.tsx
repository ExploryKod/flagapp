import Link from 'next/link';
import type { RestCountriesErrorDisplay } from '@modules/countries/infra/errors/rest-countries-api.error';
import { RestCountriesErrorRetryButton } from './RestCountriesErrorRetryButton';

type RestCountriesErrorPanelProps = RestCountriesErrorDisplay & {
  showHomeLink?: boolean;
};

export function RestCountriesErrorPanel({
  status,
  statusLabel,
  apiMessages,
  title,
  hint,
  showHomeLink = true,
}: RestCountriesErrorPanelProps) {
  const isQuotaExceeded = status === 403;

  return (
    <section
      className="mx-auto w-full max-w-xl rounded-lg bg-[var(--elements)] p-6 text-[var(--foreground)] shadow-md sm:p-8"
      role="alert"
      aria-live="polite"
    >
      {!isQuotaExceeded ? (
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-md bg-[var(--background)] px-3 py-1 text-sm font-semibold">
            HTTP {status > 0 ? status : '—'} · {statusLabel}
          </span>
        </div>
      ) : null}

      <h2 className="mb-3 text-xl font-bold sm:text-2xl">{title}</h2>
      <p className="mb-6 text-sm leading-relaxed opacity-90 sm:text-base">{hint}</p>

      {!isQuotaExceeded ? (
        <div className="mb-6 rounded-md border border-[var(--foreground)]/10 bg-[var(--background)]/60 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-70">
            REST Countries API
          </p>
          <ul className="list-none space-y-2 text-sm">
            {apiMessages.map((message) => (
              <li key={message} className="leading-relaxed">
                {message}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {!isQuotaExceeded ? (
        <div className="flex flex-wrap items-center gap-3">
          <RestCountriesErrorRetryButton />
          {showHomeLink ? (
            <Link
              href="/"
              className="inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-[var(--foreground)] opacity-90 transition-opacity hover:opacity-100"
            >
              Back to home
            </Link>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
