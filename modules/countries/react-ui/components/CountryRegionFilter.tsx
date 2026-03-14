"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function optionLabel(value: string): string {
  return value === "" ? "All regions" : value;
}

type Props = { regions: string[] };

export const CountryRegionFilter: React.FC<Props> = ({ regions }) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const regionsList = Array.isArray(regions) ? regions : [];
  const options = ["", ...regionsList];

  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selected, setSelected] = useState<string>(() => {
    const r = searchParams.get("region");
    if (r === "all" || r === null || r === "") return "";
    return regionsList.includes(r) ? r : "";
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const listboxId = `${id}-listbox`;
  const optionId = (i: number) => `${id}-option-${i}`;

  useEffect(() => {
    const r = searchParams.get("region");
    if (r === "all" || r === null || r === "") setSelected("");
    else if (regionsList.includes(r)) setSelected(r);
    setIsSearching(false);
  }, [searchParams, regionsList]);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const el = document.getElementById(optionId(activeIndex));
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, isOpen, id]);

  useEffect(() => {
    if (isOpen) {
      const idx = options.indexOf(selected);
      setActiveIndex(idx >= 0 ? idx : 0);
      listboxRef.current?.focus();
    }
  }, [isOpen, selected, options]);

  function handleToggle() {
    setIsOpen((prev) => !prev);
    if (isOpen) triggerRef.current?.focus();
  }

  function handleSelect(region: string) {
    setIsSearching(true);
    setSelected(region);
    setIsOpen(false);
    triggerRef.current?.focus();
    const params = new URLSearchParams();
    if (region !== "") {
      params.set("region", region);
    } else {
      params.set("region", "all");
    }
    replace(params.toString() ? `${pathname}?${params.toString()}` : pathname);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + options.length) % options.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        handleSelect(options[activeIndex]);
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case "Tab":
        setIsOpen(false);
        break;
      default:
        break;
    }
  }

  return (
    <div className="relative min-w-[200px]" ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        className="w-full pl-4 pr-12 py-3 rounded-lg bg-[var(--elements)] text-[var(--foreground)] border-0 shadow-sm text-left"
        aria-label="Filter by region"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        onClick={handleToggle}
        disabled={isSearching}
        aria-busy={isSearching}
      >
        {isSearching ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--foreground)]/30 border-t-[var(--foreground)]" aria-hidden />
            Searching…
          </span>
        ) : (
          optionLabel(selected)
        )}
      </button>
      <svg
        className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground)]/70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>

      {isOpen && (
        <ul
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          tabIndex={0}
          aria-activedescendant={optionId(activeIndex)}
          className="absolute z-10 mt-1 w-full py-2 rounded-lg bg-[var(--elements)] text-[var(--foreground)] border-0 shadow-lg list-none outline-none"
          onKeyDown={handleKeyDown}
        >
          {options.map((region, i) => (
            <li
              key={region || "all"}
              id={optionId(i)}
              role="option"
              aria-selected={selected === region}
              tabIndex={-1}
              className="focus:outline-none"
            >
              <button
                type="button"
                className="w-full px-4 py-2 text-left hover:bg-[var(--background)]/20 focus:bg-[var(--background)]/20 focus:outline-none"
                onClick={() => handleSelect(region)}
              >
                {optionLabel(region)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
