import {
  createMemoryRouter,
  type DataStrategyFunction,
  type HydrationState,
  type InitialEntry,
  type MemoryRouterOpts,
  type RouteObject,
  RouterProvider,
} from "react-router-dom";
import { render, type RenderOptions } from "@testing-library/react";
import { storeDecoratorWrapper } from "./storeDecorator";
import { setupStore } from "../store/Store";

type TRouterConfig = {
  basename?: string;
  // future?: Partial<Omit<FutureConfig, "v7_prependBasename">>;
  hydrationData?: HydrationState;
  initialEntries?: InitialEntry[];
  initialIndex?: number;
  dataStrategy?: DataStrategyFunction;
  patchRoutesOnNavigation?: MemoryRouterOpts["patchRoutesOnNavigation"];
};

export const routerDecorator = (
  routerConfig: {
    routerConfig: TRouterConfig;
    /**
     * Use it to wrap RouterProvider with store provider
     */
    store?: ReturnType<typeof setupStore> | boolean;
  } & (
    | {
        ui: React.ReactNode;
        path: string;
        routes?: undefined;
      }
    | {
        ui?: undefined;
        path?: undefined;
        routes: RouteObject[];
      }
  ),
  options?: Omit<RenderOptions, "queries">,
) => {
  let router: TRouter;
  if (routerConfig.routes) {
    const { routes } = routerConfig;

    router = createMemoryRouter(routes, {
      ...routerConfig.routerConfig,
      // future: futureConfig,
    });
  } else {
    router = getRouter(routerConfig);
  }

  if (routerConfig.store) {
    const api = render(
      storeDecoratorWrapper(
        <RouterProvider router={router} />,
        routerConfig.store === true ? setupStore() : routerConfig.store,
      ),
      options,
    );

    if (routerConfig.routes) {
      return api;
    }

    return {
      ...api,
      rerender: (rerenderUi: React.ReactNode) => {
        router = getRouter({ ...routerConfig, ui: rerenderUi });

        const store =
          typeof routerConfig.store === "boolean"
            ? setupStore()
            : routerConfig.store;

        api.rerender(
          storeDecoratorWrapper(<RouterProvider router={router} />, store),
        );
      },
    };
  }

  return render(<RouterProvider router={router} />, options);
};

type TRouter = ReturnType<typeof createMemoryRouter>;

function getRouter(
  routerConfig: { routerConfig: TRouterConfig } & {
    ui: React.ReactNode;
    path: string;
    routes?: undefined;
  },
) {
  const { path, ui } = routerConfig;
  const route: RouteObject = {
    path,
    element: ui,
  };

  return createMemoryRouter([route], {
    ...routerConfig.routerConfig,
    // future: futureConfig,
  });
}
