import React from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { cleanup, fireEvent, render } from "@testing-library/react";

import { NextPathnameProvider, useNextPathname } from "../src";

describe("NextPathnameProvider", () => {
  beforeAll(() => {
    global.window = Object.create(window);

    Object.defineProperty(window, "location", {
      value: {
        pathname: "/initial-path",
        origin: "http://localhost",
      },
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
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

    expect(getByTestId("pathname").textContent).toBe("/initial-path");
  });
});
