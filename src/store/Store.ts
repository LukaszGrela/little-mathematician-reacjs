/*
   Copyright 2018 Łukasz 'Severiaan' Grela GrelaDesign

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
  applyMiddleware,
  legacy_createStore as createStore,
  compose,
  type Reducer,
  type Store,
} from "redux";

import { logger } from "redux-logger";

import reducer from "../reducers";
import {
  DEFAULT_GAME_STATE,
  HISTORY_LENGTH_CAP,
} from "../reducers/gameReducer";
import type { TRootState } from "./types";
import {
  readPersistedState,
  writePersistedState,
  type TPersistableState,
} from "./persistence";
import { DEFAULT_CONFIG_STATE } from "../reducers/configReducer";
import { DEFAULT_SCORE_STATE } from "../reducers/scoreReducer";
import type { TActions } from "../actions/actions";

/** Every action the store accepts, including the one Redux itself dispatches. */
export type TRootAction = TActions | { type: "@@INIT"; payload?: unknown };

// Log actions and state only in development. A production build must not print
// the player's answers or the internal game state to the browser console.
const middleware = applyMiddleware(...(import.meta.env.DEV ? [logger] : []));
const composeEnhancers =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * State restored from `localStorage`: the closed games and the score totals.
 * Only these two slices are persisted, everything else starts fresh.
 */
const createPreloadedState = (): Omit<TRootState, "config"> => {
  const persisted = readPersistedState();
  return {
    score: persisted.score,
    game: {
      ...DEFAULT_GAME_STATE,
      history: persisted.history,
      currentGame: null,
      historyLengthCap: HISTORY_LENGTH_CAP,
    },
  };
};

/**
 * Saves the persisted slices after every change that can affect them.
 * Comparing references keeps the write off the hot path (answering a question
 * does not touch the history or the totals).
 */
const subscribePersistence = (store: Store<TRootState>): void => {
  let previous = store.getState();
  store.subscribe(() => {
    const state = store.getState();
    if (
      state.game.history === previous.game.history &&
      state.score === previous.score
    ) {
      return;
    }
    previous = state;
    writePersistedState(state as TPersistableState);
  });
};

export const setupStore = (preloadedState?: TRootState): Store<TRootState> => {
  // The cast on the combined reducer is needed because redux infers its
  // preloaded-state type with `PreloadedStateShapeFromReducersMapObject`, which
  // only matches reducers whose action parameter accepts `UnknownAction`. Our
  // slice reducers narrow their actions (`TScoreActions`, ...), so inference
  // bails out to `Partial<{ score: never; ... }>` and the combined reducer is
  // not assignable to `Reducer<TRootState, TRootAction, Partial<TRootState>>`
  // even though the state/action types are correct. At runtime nothing changes:
  // only the inferred preloaded-state parameter is re-asserted here. Typing the
  // reducer also lets `createStore` infer `S`, `A` and `PreloadedState` from it
  // instead of defaulting `PreloadedState` to the full `TRootState`.
  const rootReducer = reducer as Reducer<
    TRootState,
    TRootAction,
    Partial<TRootState>
  >;

  const store = createStore(
    rootReducer,
    preloadedState
      ? Object.assign(
          {
            config: DEFAULT_CONFIG_STATE,
            score: DEFAULT_SCORE_STATE,
            game: DEFAULT_GAME_STATE,
          } as TRootState,
          preloadedState,
        )
      : Object.assign(
          {
            config: DEFAULT_CONFIG_STATE,
            score: DEFAULT_SCORE_STATE,
            game: DEFAULT_GAME_STATE,
          },
          createPreloadedState(),
        ),
    composeEnhancers(middleware),
  );

  subscribePersistence(store);

  return store;
};

const store = setupStore();

export default store;
