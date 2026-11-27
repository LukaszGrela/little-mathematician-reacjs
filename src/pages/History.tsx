/**
 * History / results screen: every closed game (finished or abandoned) with its
 * score, how many questions were actually answered, the configured length and
 * the moment it was closed, plus the score totals per operation.
 *
 * It is a pure consumer of the existing model (`game.history`, `score`) - no
 * reducer changes are needed to render it.
 */
import type { FC } from "react";
import { useSelector } from "react-redux";

import "./History.scss";

import {
  GAME_ADDITION,
  GAME_SUBTRACTION,
  GAME_MULTIPLICATION,
  GAME_DIVISION,
  type TGameType,
} from "../gameTypes";
import type { TGameStatus } from "../types";
import type { TRootState } from "../store/types";
import { formatTimestamp, getAnsweredCount } from "../utils/history";

const TYPE_LABEL: Record<TGameType, string> = {
  [GAME_ADDITION]: "Addition",
  [GAME_SUBTRACTION]: "Subtraction",
  [GAME_MULTIPLICATION]: "Multiplication",
  [GAME_DIVISION]: "Division",
};

const STATUS_LABEL: Record<TGameStatus, string> = {
  "in-progress": "In progress",
  finished: "Finished",
  abandoned: "Abandoned",
};

export const History: FC = () => {
  const history = useSelector((state: TRootState) => state.game.history);
  const score = useSelector((state: TRootState) => state.score);

  const totals: { label: string; value: number }[] = [
    { label: TYPE_LABEL[GAME_ADDITION], value: score.addScore },
    { label: TYPE_LABEL[GAME_SUBTRACTION], value: score.subScore },
    { label: TYPE_LABEL[GAME_MULTIPLICATION], value: score.mulScore },
    { label: TYPE_LABEL[GAME_DIVISION], value: score.divScore },
  ];

  return (
    <div className="history">
      <dl className="history-totals">
        {totals.map(({ label, value }) => (
          <div className="history-total" key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      {history.length === 0 ? (
        <p className="history-empty">
          No finished games yet. Solve some equations and the result will show
          up here.
        </p>
      ) : (
        <table className="history-table">
          <caption>Closed games, newest first</caption>
          <thead>
            <tr>
              <th scope="col">Operation</th>
              <th scope="col">Score</th>
              <th scope="col">Answered</th>
              <th scope="col">Questions</th>
              <th scope="col">Finished</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((game) => (
              <tr key={game.id} data-testid="history-row">
                <td>{TYPE_LABEL[game.type]}</td>
                <td>{game.score}</td>
                <td>{getAnsweredCount(game)}</td>
                <td>{game.questionCount}</td>
                <td>{formatTimestamp(game.finishedAt)}</td>
                <td className={"history-status history-status-" + game.status}>
                  {STATUS_LABEL[game.status]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;