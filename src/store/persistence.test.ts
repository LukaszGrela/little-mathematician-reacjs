import { expect, test } from "vitest";

import {
  PERSISTENCE_KEY,
  PERSISTENCE_VERSION,
  createEmptyPersistedState,
  parsePersistedState,
  readPersistedState,
  toPersistedState,
  writePersistedState,
  type TStorageLike,
} from "./persistence";
import { HISTORY_LENGTH_CAP } from "../reducers/gameReducer";
import type { TGameObject } from "../types";
import type { TScoreState } from "../reducers/scoreReducer";

const score: TScoreState = {
  addScore: 4,
  subScore: 2,
  mulScore: 0,
  divScore: 1,
};

const buildGame = (overrides: Partial<TGameObject> = {}): TGameObject => ({
  id: "game-1",
  status: "finished",
  finishedAt: 1_700_000_000_000,
  score: 3,
  type: "addition",
  history: [
    {
      id: 1,
      operandA: 1,
      operandB: 2,
      result: 3,
      ask: "result",
      correct: 3,
      distractors: [1, 3, 4, 5],
      operation: "+",
    },
  ],
  hudQuestionCurrent: 11,
  hudCorrectAnswers: 3,
  questions: [null],
  operation: "+",
  questionCount: 10,
  from: 0,
  to: 10,
  ...overrides,
});

const memoryStorage = (initial?: string): TStorageLike => {
  let value = initial ?? null;
  return {
    getItem: () => value,
    setItem: (_key, next) => {
      value = next;
    },
  };
};

test("returns the empty state when nothing was saved", () => {
  expect(readPersistedState(null)).toEqual(createEmptyPersistedState());
  expect(readPersistedState(memoryStorage())).toEqual(
    createEmptyPersistedState(),
  );
});

test("returns the empty state for unreadable storage", () => {
  const throwing: TStorageLike = {
    getItem: () => {
      throw new Error("access denied");
    },
    setItem: () => {
      /* noop */
    },
  };

  expect(readPersistedState(throwing)).toEqual(createEmptyPersistedState());
  expect(readPersistedState(memoryStorage("{not json"))).toEqual(
    createEmptyPersistedState(),
  );
});

test("keeps only the summary of a game when saving", () => {
  const persisted = toPersistedState({ score, game: { history: [buildGame()] } });

  expect(persisted.version).toBe(PERSISTENCE_VERSION);
  expect(persisted.score).toEqual(score);
  expect(persisted.history[0].questions).toEqual([]);
  expect(persisted.history[0].history).toEqual([]);
});

test("round-trips the saved state", () => {
  const storage = memoryStorage();
  writePersistedState({ score, game: { history: [buildGame()] } }, storage);

  const restored = readPersistedState(storage);

  expect(restored.score).toEqual(score);
  expect(restored.history).toHaveLength(1);
  expect(restored.history[0]).toMatchObject({
    id: "game-1",
    type: "addition",
    status: "finished",
    score: 3,
    questionCount: 10,
    hudQuestionCurrent: 11,
    finishedAt: 1_700_000_000_000,
  });
});

test("discards a payload from an older schema version", () => {
  const storage = memoryStorage(
    JSON.stringify({
      version: PERSISTENCE_VERSION - 1,
      score,
      history: [buildGame()],
    }),
  );

  expect(readPersistedState(storage)).toEqual(createEmptyPersistedState());
});

test("discards entries that do not match the current shape", () => {
  const parsed = parsePersistedState({
    version: PERSISTENCE_VERSION,
    score,
    history: [
      buildGame({ id: "kept" }),
      null,
      "nope",
      buildGame({ id: "" }),
      buildGame({ id: "bad-type", type: "power" as never }),
      buildGame({ id: "bad-status", status: "paused" as never }),
      buildGame({ id: "open", status: "in-progress" }),
      buildGame({ id: "bad-score", score: Number.NaN }),
      buildGame({ id: "bad-time", finishedAt: "yesterday" as never }),
      buildGame({ id: "kept-2", type: "division", operation: "/" }),
    ],
  });

  expect(parsed.history.map((game) => game.id)).toEqual(["kept", "kept-2"]);
});

test("falls back to zero totals when the score block is broken", () => {
  const parsed = parsePersistedState({
    version: PERSISTENCE_VERSION,
    score: { addScore: "many" },
    history: [buildGame({ id: "kept" })],
  });

  expect(parsed.score).toEqual(createEmptyPersistedState().score);
  expect(parsed.history).toHaveLength(1);
});

test("caps the restored history to the reducer limit", () => {
  const many = Array.from({ length: HISTORY_LENGTH_CAP + 5 }, (_, index) =>
    buildGame({ id: `game-${index}` }),
  );

  const parsed = parsePersistedState({
    version: PERSISTENCE_VERSION,
    score,
    history: many,
  });

  expect(parsed.history).toHaveLength(HISTORY_LENGTH_CAP);
});

test("ignores a broken top-level payload", () => {
  expect(parsePersistedState(null)).toEqual(createEmptyPersistedState());
  expect(parsePersistedState([])).toEqual(createEmptyPersistedState());
  expect(
    parsePersistedState({ version: PERSISTENCE_VERSION, history: "nope" }),
  ).toEqual(createEmptyPersistedState());
});

test("does not throw when the storage refuses to write", () => {
  const full: TStorageLike = {
    getItem: () => null,
    setItem: () => {
      throw new Error("QuotaExceededError");
    },
  };

  expect(() =>
    writePersistedState({ score, game: { history: [buildGame()] } }, full),
  ).not.toThrow();
});

test("writes through the versioned key", () => {
  const seen: string[] = [];
  const storage: TStorageLike = {
    getItem: (key) => {
      seen.push(key);
      return null;
    },
    setItem: (key) => {
      seen.push(key);
    },
  };

  writePersistedState({ score, game: { history: [] } }, storage);
  readPersistedState(storage);

  expect(seen).toEqual([PERSISTENCE_KEY, PERSISTENCE_KEY]);
});
test("restores the saved history when the store is created", async () => {
  const { setupStore } = await import("./Store");

  writePersistedState({ score, game: { history: [buildGame()] } });

  const store = setupStore();

  expect(store.getState().game.history).toHaveLength(1);
  expect(store.getState().game.history[0].id).toBe("game-1");
  expect(store.getState().game.currentGame).toBeNull();
  expect(store.getState().score).toEqual(score);
});

test("saves the history when a game is closed", async () => {
  const { setupStore } = await import("./Store");
  const { newGame, gameOver } = await import("../actions/mathGameActions");
  const { GAME_ADDITION } = await import("../gameTypes");

  const store = setupStore();

  store.dispatch(
    newGame({ general: { questionCount: 5, from: 0, to: 10 }, type: GAME_ADDITION }),
  );
  store.dispatch(gameOver());

  const restored = readPersistedState();

  expect(restored.history).toHaveLength(1);
  expect(restored.history[0]).toMatchObject({
    type: "addition",
    status: "finished",
    questionCount: 5,
  });
});

test("a saved payload does not survive a schema change", () => {
  window.localStorage.setItem(
    PERSISTENCE_KEY,
    JSON.stringify({ version: 0, score, history: [buildGame()] }),
  );

  expect(readPersistedState()).toEqual(createEmptyPersistedState());
});
