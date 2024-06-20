"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";

type NextPathnameContextType = {
  nextPathname: string;
};

const defaultNextPathname = "/";

export const NextPathnameContext = createContext<NextPathnameContextType>({
  nextPathname: defaultNextPathname,
});

export function NextPathnameProvider({ children }: { children: ReactNode }) {
  const [nextPathname, setNextPathname] = useState(defaultNextPathname);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setNextPathname(window.location.pathname);

    const handleClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest("a");

      if (target?.href.startsWith(window.location.origin)) {
        setNextPathname(target.pathname);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <NextPathnameContext.Provider value={{ nextPathname }}>
      {children}
    </NextPathnameContext.Provider>
  );
}

export function useNextPathname() {
  return useContext(NextPathnameContext);
}
