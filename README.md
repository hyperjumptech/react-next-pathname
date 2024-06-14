# @hyperjumptech/react-next-pathname

![Minified size](https://img.shields.io/bundlephobia/min/@hyperjumptech/react-next-pathname) ![Test coverage](https://img.shields.io/codecov/c/github/hyperjumptech/react-next-pathname) ![Monthly download](https://img.shields.io/npm/dm/@hyperjumptech/react-next-pathname)

`@hyperjumptech/react-next-pathname` tracks the next pathname immediately when a link is clicked, without waiting for the new page to load. At Hyperjump, we use this to instantly update the sidebar or navigation, making the application feel smooth and fast.

## Installation

To install `@hyperjumptech/react-next-pathname`, run the following command:

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

## Usage

First, wrap your application with the NextPathnameProvider to provide the context to all components:

```tsx
import React from "react";
import { NextPathnameProvider } from "@hyperjumptech/react-next-pathname";

function App({ children }) {
  return <NextPathnameProvider>{children}</NextPathnameProvider>;
}

export default App;
```

Then, use the useNextPathname hook to access the next pathname in your components:

```tsx
import { useEffect } from "react";
import { useNextPathname } from "@hyperjumptech/react-next-pathname";

function MyComponent() {
  const { nextPathname } = useNextPathname();

  useEffect(() => {
    if (nextPathname) {
      console.log("Next pathname:", nextPathname);
      // Perform any side effects or conditional navigation logic here
    }
  }, [nextPathname]);

  return (
    <div>
      <p>Next pathname: {nextPathname}</p>
      <a href="/another-page">Go to another page</a>
    </div>
  );
}

export default MyComponent;
```

## License

[MIT License](/LICENSE)
