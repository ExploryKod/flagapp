"use client";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";

const ARROW_LIGHT = "/arrow-left-solid-full.svg";
const ARROW_DARK = "/arrow-left-solid-full-white.svg";

export const CountryPageBackBtn = () => {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const arrowSrc = resolvedTheme === "light" ? ARROW_LIGHT : ARROW_DARK; // default white arrow (e.g. dark theme or before hydration)

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="country-page-back-btn inline-flex items-center gap-2 rounded-md border border-transparent bg-[var(--elements)] px-6 py-2 text-base font-medium text-[var(--foreground)] shadow-md transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]/20"
      aria-label="Go back"
    >
      <Image
        src={arrowSrc}
        alt=""
        width={20}
        height={20}
        className="shrink-0"
        aria-hidden
      />
      Back
    </button>
  );
};