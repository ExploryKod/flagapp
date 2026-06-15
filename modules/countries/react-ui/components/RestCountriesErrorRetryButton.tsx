'use client';

import { useRouter } from 'next/navigation';

export function RestCountriesErrorRetryButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.refresh()}
      className="country-page-back-btn inline-flex items-center rounded-md bg-[var(--background)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] shadow-md transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/20"
    >
      Try again
    </button>
  );
}
