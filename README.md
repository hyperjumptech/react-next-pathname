# About

![Minified size](https://img.shields.io/bundlephobia/min/@hyperjumptech/react-next-pathname) ![Test coverage](https://img.shields.io/codecov/c/github/hyperjumptech/react-next-pathname) ![Monthly download](https://img.shields.io/npm/dm/@hyperjumptech/react-next-pathname)

This is a helper tool you can use in your React application to make it feel faster and smoother when navigating between pages. Say you have a sidebar that contains links to different pages. When you click a link, the component that displays the link will show that it's currently active—usually like this:

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
        {
          pathname: "/contact",
          title: "Contact",
        },
      ].map(({ pathname, title }) => (
        <a
          key={pathname}
          href={pathname}
          className={`${ispathActive(pathname) ? "active" : ""}`}
        >
          {title}
        </a>
      ))}
    </div>
  );
};
```

The problem is that when the clicked page is slow to load due to bad network conditions or slow server response, the clicked link will not immediately show that it's active. This is because the `window.location.pathname` is not updated until the page has fully loaded. Users might think that nothing is happening when they click the link, and they will be confused.

This library helps you solve this problem by allowing you to get the next pathname immediately when a link is clicked, without waiting for the new page to load.

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
        {
          pathname: "/contact",
          title: "Contact",
        },
      ].map(({ pathname, title }) => (
        <a
          key={pathname}
          href={pathname}
          className={`${ispathActive(pathname, nextPathname) ? "active" : ""}`}
        >
          {title}
        </a>
      ))}
    </div>
  );
};
```

## License

[MIT License](/LICENSE)
