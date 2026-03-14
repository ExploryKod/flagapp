import React from "react";
import { ThemeSwitcher } from "@modules/app/react-ui/components/ThemeSwitcher";

export const Header: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <header className="header-height bg-[var(--elements)] shadow-md w-full mx-auto flex items-center">
    <nav
      className={`flex flex-wrap items-center justify-between gap-4 text-[var(--foreground)] w-full ${className}`.trim()}
    >
      <h1 className="header-title m-0 flex h-7 items-center text-[1.125rem] font-extrabold leading-none sm:h-8 sm:text-[1.25rem]">
        Where in the world?
      </h1>
      <ThemeSwitcher />
    </nav>
    </header>
  );
};




