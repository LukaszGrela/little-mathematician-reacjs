/**
 * Persistence of the game history and the per-operation score totals.
 *
 * The saved payload is versioned: `history` entries depend on the shape of
 * `TGameObject`, so a payload written by an older build must be discarded
 * instead of being rendered. Every read is validated field by field - a
 * truncated, stale or hand-edited `localStorage` value can only produce an
 * empty state, never a crash during the first render.
 *
 * Only the summary of a closed game is kept (no `questions`), which keeps the
 * payload small and independent from the question generator.
 */
import { isGameType } from "../gameTypes";
import { HISTORY_LENGTH_CAP } from "../reducers/gameReducer";
import type { TGameState } from "../reducers/gameReducer";
import type { TScoreState } from "../reducers/scoreReducer";
import type { TGameObject, TGameStatus, TOperation } from "../types";

/** Storage key, versioned through the `version` field of the payload. */
export const PERSISTENCE_KEY = "little-mathematician:state";
export const PERSISTENCE_VERSION = 1;

export type TPersistedState = {
  version: number;
  score: TScoreState;
  history: TGameObject[];
};

/** The part of the application state that survives a reload. */
export type TPersistableState = {
  score: TScoreState;
  game: Pick<TGameState, "history">;
};

export type TStorageLike = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

const OPERATIONS: readonly TOperation[] = ["+", "-", "x", "/"];
const STATUSES: readonly TGameStatus[] = [
  "in-progress",
  "finished",
  "abandoned",
];

export const createEmptyPersistedState = (): TPersistedState => ({
  version: PERSISTENCE_VERSION,
  score: { addScore: 0, subScore: 0, mulScore: 0, divScore: 0 },
  history: [],
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const isCount = (value: unknown): value is number =>
  isFiniteNumber(value) && Number.isInteger(value) && value >= 0;

const isStatus = (value: unknown): value is TGameStatus =>
  typeof value === "string" && (STATUSES as readonly string[]).includes(value);

const isOperation = (value: unknown): value is TOperation =>
  typeof value === "string" && (OPERATIONS as readonly string[]).includes(value);

const sanitizeScore = (value: unknown): TScoreState | null => {
  if (!isRecord(value)) return null;
  const { addScore, subScore, mulScore, divScore } = value;
  if (
    !isCount(addScore) ||
    !isCount(subScore) ||
    !isCount(mulScore) ||
    !isCount(divScore)
  ) {
    return null;
  }
  return { addScore, subScore, mulScore, divScore };
};

/**
 * Rebuilds a closed game from an untrusted value. Returns `null` when a field
 * required by the history screen is missing or of the wrong type, so the
 * caller can drop just that entry.
 */
const sanitizeGame = (value: unknown): TGameObject | null => {
  if (!isRecord(value)) return null;

  const {
    id,
    status,
    finishedAt,
    score,
    type,
    hudQuestionCurrent,
    hudCorrectAnswers,
    questionCount,
    from,
    to,
    operation,
  } = value;

  if (typeof id !== "string" || id.length === 0) return null;
  if (!isStatus(status)) return null;
  if (!isGameType(type)) return null;
  if (!isOperation(operation)) return null;
  if (status === "in-progress") return null;
  if (finishedAt !== null && !isFiniteNumber(finishedAt)) return null;
  if (!isCount(score) || !isCount(hudCorrectAnswers)) return null;
  if (!isCount(hudQuestionCurrent) || hudQuestionCurrent < 1) return null;
  if (!isCount(questionCount)) return null;
  if (!isFiniteNumber(from) || !isFiniteNumber(to)) return null;

  return {
    id,
    status,
    finishedAt,
    score,
    type,
    operation,
    hudQuestionCurrent,
    hudCorrectAnswers,
    questionCount,
    from,
    to,
    // The saved summary never carries questions - see `toPersistedState`.
    history: [],
    questions: [],
  };
};

/**
 * Validates a parsed payload. Any structural problem degrades to the empty
 * state (score totals are kept when only a single history entry is broken).
 */
export const parsePersistedState = (value: unknown): TPersistedState => {
  const empty = createEmptyPersistedState();
  if (!isRecord(value) || value.version !== PERSISTENCE_VERSION) return empty;

  const score = sanitizeScore(value.score);
  const rawHistory = Array.isArray(value.history) ? value.history : [];

  const history: TGameObject[] = [];
  for (const entry of rawHistory) {
    const game = sanitizeGame(entry);
    if (game) history.push(game);
    if (history.length === HISTORY_LENGTH_CAP) break;
  }

  return {
    version: PERSISTENCE_VERSION,
    score: score ?? empty.score,
    history,
  };
};

/** Strips everything the history screen does not need before writing. */
export const toPersistedState = (
  state: TPersistableState,
): TPersistedState => ({
  version: PERSISTENCE_VERSION,
  score: { ...state.score },
  history: state.game.history
    .slice(0, HISTORY_LENGTH_CAP)
    .map((game) => ({ ...game, history: [], questions: [] })),
});

const getStorage = (): TStorageLike | null => {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage ?? null;
  } catch {
    // e.g. cookies / site data blocked in the browser settings
    return null;
  }
};

/**
 * Reads the saved state. A missing, unreadable or invalid payload yields the
 * empty state - the application always starts with a usable history.
 */
export const readPersistedState = (
  storage: TStorageLike | null = getStorage(),
): TPersistedState => {
  try {
    const raw = storage?.getItem(PERSISTENCE_KEY);
    if (!raw) return createEmptyPersistedState();
    return parsePersistedState(JSON.parse(raw));
  } catch {
    return createEmptyPersistedState();
  }
};

/**
 * Writes the state. Storage failures (quota, private mode, disabled storage)
 * must never break the game, so they are swallowed on purpose.
 */
export const writePersistedState = (
  state: TPersistableState,
  storage: TStorageLike | null = getStorage(),
): void => {
  try {
    storage?.setItem(PERSISTENCE_KEY, JSON.stringify(toPersistedState(state)));
  } catch {
    // ignore - persistence is a convenience, not a requirement
  }
};
