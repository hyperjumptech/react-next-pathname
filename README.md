# About

![Minified size](https://img.shields.io/bundlephobia/min/@hyperjumptech/react-next-pathname) ![Monthly download](https://img.shields.io/npm/dm/@hyperjumptech/react-next-pathname)

`@hyperjumptech/react-next-pathname` is a helper tool designed to enhance the user experience in React applications by improving the responsiveness and feedback when navigating between pages. It ensures that the active state of links in components like sidebars is updated immediately upon clicking, even if the new page is slow to load.

## Problem

When a user clicks a link, the typical implementation updates the link's active state based on the current pathname, which only changes after the new page loads. This delay can confuse users, making them think that their click did not register. For example:

```tsx
const isPathActive = (pathname: string) => {
  return pathname === window.location.pathname;
};

const Sidebar = () => {
  return (
    <div>
      {[
        { pathname: "/", title: "Home" },
        { pathname: "/about", title: "About" },
        { pathname: "/contact", title: "Contact" },
      ].map(({ pathname, title }) => (
        <a
          key={pathname}
          href={pathname}
          className={`${isPathActive(pathname) ? "active" : ""}`}
        >
          {title}
        </a>
      ))}
    </div>
  );
};
```

## Solution

`@hyperjumptech/react-next-pathname` solves this problem by providing the next pathname immediately when a link is clicked, without waiting for the new page to load. This ensures that the active state is updated right away, providing immediate feedback to the user.

## Installation

To install `@hyperjumptech/react-next-pathname`, run one of the following commands:

**NPM**

```
npm install @hyperjumptech/react-next-pathname
```

**Yarn**

```
yarn add @hyperjumptech/react-next-pathname
```

**pnpm**

```
pnpm add @hyperjumptech/react-next-pathname
```

**bun**

```
bun add @hyperjumptech/react-next-pathname
```

## Usage

First, wrap your application with the `NextPathnameProvider` to provide the context to all components:

```tsx
import React from "react";
import { NextPathnameProvider } from "@hyperjumptech/react-next-pathname";

function App({ children }) {
  return <NextPathnameProvider>{children}</NextPathnameProvider>;
}

export default App;
```

Then, use the `useNextPathname` hook to access the next pathname in your component. Let's take the previous example and use `@hyperjumptech/react-next-pathname`:

```tsx
import { useNextPathname } from "@hyperjumptech/react-next-pathname";

const isPathActive = (pathname: string, nextPathname: string) => {
  return pathname === nextPathname;
};

const Sidebar = () => {
  const { nextPathname } = useNextPathname();
  return (
    <div>
      {[
        { pathname: "/", title: "Home" },
        { pathname: "/about", title: "About" },
        { pathname: "/contact", title: "Contact" },
      ].map(({ pathname, title }) => (
        <a
          key={pathname}
          href={pathname}
          className={`${isPathActive(pathname, nextPathname) ? "active" : ""}`}
        >
          {title}
        </a>
      ))}
    </div>
  );
};
```

## Next.js Support

Currently, the `@hyperjumptech/react-next-pathname-nextjs` package only supports the Page Router. If you are using the App Router, you can use the `@hyperjumptech/react-next-pathname` package. However, please note that it is not fully optimized for the App Router.

## Development Guide

If this is the first time you have cloned the repository, run the following commands:

```bash
npm install
npm run build:packages
```

If you want to run the example, navigate to the example app directory and run the development server:

```bash
cd apps/example-nextjs
npm run dev
```

Every time you make changes in packages and want to see them in the example app, you need to run:

```bash
npm run build:packages
```

## License

[MIT License](/LICENSE)
