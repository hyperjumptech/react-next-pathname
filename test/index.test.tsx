import React from "react";
import { afterEach, describe, expect, it } from "vitest";

import { cleanup, fireEvent, render } from "@testing-library/react";

import { NextPathnameProvider, useNextPathname } from "../src";

describe("NextPathnameProvider", () => {
  afterEach(() => {
    cleanup();
  });

  const TestComponent = () => {
    const { nextPathname } = useNextPathname();

    return <div data-testid="pathname">{nextPathname}</div>;
  };

  it("provides the initial pathname", () => {
    const { getByTestId } = render(
      <NextPathnameProvider>
        <TestComponent />
      </NextPathnameProvider>,
    );

    expect(getByTestId("pathname").textContent).toBe("/");
  });

  it("provides the initial pathname from defaultPathname", () => {
    const { getByTestId } = render(
      <NextPathnameProvider defaultPathname="/initial-path">
        <TestComponent />
      </NextPathnameProvider>,
    );

    expect(getByTestId("pathname").textContent).toBe("/initial-path");
  });

  it("updates the pathname on link click", () => {
    const { getByTestId } = render(
      <NextPathnameProvider>
        <TestComponent />
        <a href="/new-path" data-testid="link">
          Link
        </a>
      </NextPathnameProvider>,
    );

    fireEvent.click(getByTestId("link"));

    expect(getByTestId("pathname").textContent).toBe("/new-path");
  });

  it("does not update the pathname for external links", () => {
    const { getByTestId } = render(
      <NextPathnameProvider>
        <TestComponent />
        <a href="https://external.com" data-testid="external-link">
          External Link
        </a>
      </NextPathnameProvider>,
    );

    fireEvent.click(getByTestId("external-link"));

    expect(getByTestId("pathname").textContent).toBe("/");
  });
});
