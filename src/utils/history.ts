/**
 * Helpers for presenting a closed game on the history / results screen.
 *
 * A closed game (`GAME_OVER`, `QUIT_GAME`, `FINISH_GAME`) has its `questions`
 * array cleared, so the number of answered questions cannot be read from it.
 * `hudQuestionCurrent` is a 1-based cursor: it points at the question being
 * asked, so the number of answered questions is `hudQuestionCurrent - 1`.
 * Deriving the value keeps the persisted schema unchanged and means a game
 * abandoned after one answer reports `1/10`, not `1/1`.
 */
import type { TGameObject } from "../types";

export type TGameSummary = Pick<TGameObject, "hudQuestionCurrent" | "questionCount">;

/**
 * Number of questions the player actually answered, clamped to a sane range so
 * a malformed persisted record never renders `-1` or more answers than questions.
 */
export const getAnsweredCount = (game: TGameSummary): number => {
  const answered = Math.floor(game.hudQuestionCurrent) - 1;
  const total = Math.floor(game.questionCount);

  if (!Number.isFinite(answered)) return 0;

  const cap = Number.isFinite(total) && total > 0 ? total : 0;

  return Math.min(Math.max(answered, 0), cap);
};

const pad = (value: number): string => String(value).padStart(2, "0");

/**
 * Deterministic `YYYY-MM-DD HH:mm` in local time (avoids locale dependent
 * `toLocaleString`, which would make the rendered output differ per machine).
 */
export const formatTimestamp = (value: number | null): string => {
  if (value === null || !Number.isFinite(value)) return "—";

  const date = new Date(value);
  const time = date.getTime();

  if (!Number.isFinite(time)) return "—";

  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    ` ${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
};