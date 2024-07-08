import { RouterEvent, useRouter } from "next/router";
import React from "react";
import { afterEach, describe, expect, it, Mock, vi } from "vitest";

import { act, cleanup, render, waitFor } from "@testing-library/react";

import { NextPathnameProvider, useNextPathname } from "../src";

vi.mock("next/router", () => {
  const originalModule = vi.importActual(
    "next/router"
  ) as unknown as typeof import("next/router");

  return {
    __esModule: true,
    ...originalModule,
    useRouter: vi.fn(),
  };
});

type MockRouter = {
  pathname: string;
  events: {
    on: (event: RouterEvent, handler: (...args: any[]) => void) => void;
    off: (event: RouterEvent, handler: (...args: any[]) => void) => void;
    emit: (event: RouterEvent, ...args: any[]) => void;
  };
  mockHandler?: (...args: any[]) => void;
};

const mockRouter: MockRouter = {
  pathname: "/",
  events: {
    on: vi.fn((event, handler) => {
      if (event === "routeChangeStart") {
        mockRouter.mockHandler = handler;
      }
    }),
    off: vi.fn(),
    emit: vi.fn(),
  },
};

(useRouter as Mock).mockImplementation(() => mockRouter);

describe("NextPathnameProvider", () => {
  afterEach(() => {
    cleanup();

    mockRouter.pathname = "/";
  });

  const TestComponent: React.FC = () => {
    const { nextPathname } = useNextPathname();

    return <div data-testid="pathname">{nextPathname}</div>;
  };

  it("provides the initial pathname", () => {
    const { getByTestId } = render(
      <NextPathnameProvider>
        <TestComponent />
      </NextPathnameProvider>
    );

    expect(getByTestId("pathname").textContent).toBe("/");
  });

  it("updates the pathname on route change", async () => {
    render(
      <NextPathnameProvider>
        <TestComponent />
      </NextPathnameProvider>
    );

    act(() => {
      mockRouter.mockHandler && mockRouter.mockHandler("/new-path");
    });

    await waitFor(() => {
      const pathnameElement = document.querySelector(
        '[data-testid="pathname"]'
      );

      expect(pathnameElement?.textContent).toBe("/new-path");
    });
  });
});
