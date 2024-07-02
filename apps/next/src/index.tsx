"use client";

import { useRouter } from "next/router.js";
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
  const router = useRouter();
  const [nextPathname, setNextPathname] = useState(router.pathname);

  useEffect(() => {
    router.events.on("routeChangeStart", setNextPathname);

    return () => {
      router.events.off("routeChangeStart", setNextPathname);
    };
  }, [router.events]);

  return (
    <NextPathnameContext.Provider value={{ nextPathname }}>
      {children}
    </NextPathnameContext.Provider>
  );
}

export function useNextPathname() {
  return useContext(NextPathnameContext);
}
