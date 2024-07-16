import "~/styles/globals.css";

import type { AppProps } from "next/app";
import { NextPathnameProvider } from "@hyperjumptech/react-next-pathname-nextjs";
import Navbar from "~/components/navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextPathnameProvider>
      <Navbar />
      <Component {...pageProps} />
    </NextPathnameProvider>
  );
}
