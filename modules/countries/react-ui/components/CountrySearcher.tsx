"use client"
import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export const CountrySearcher: React.FC<{ placeholder: string }> = ({ placeholder }) => {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
 
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const debouncedHandleSearch = useDebouncedCallback(handleSearch, 300);

  return (
    <section className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
      <input
        type="search"
        placeholder="Search for a country..."
        className="input-space-x flex-1 max-w-md py-3 rounded-lg bg-[var(--elements)] text-[var(--foreground)] placeholder:text-gray-400 border-0 shadow-sm"
        aria-label="Search for a country"
        onChange={(e) => debouncedHandleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString() || ''}
      />
    </section>
  );
};


