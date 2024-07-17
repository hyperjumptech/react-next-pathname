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
    const handleRouteChange = (url: string) => {
      setNextPathname(url);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChange);
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
