/*
   Copyright 2026 Łukasz 'Severiaan' Grela GrelaDesign

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

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
