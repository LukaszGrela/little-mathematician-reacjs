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

import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import GameOver from "../components/GameOver";
import type { TAppDispatch, TRootState } from "../store/types";
import { gameOver, newGame } from "../actions/mathGameActions";
import { isGameType } from "../gameTypes";

const GameOverPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<TAppDispatch>();
  const hudCorrectAnswers = useSelector(
    (state: TRootState) => state.game.currentGame?.hudCorrectAnswers ?? 0,
  );
  const type = useSelector((state: TRootState) => state.game.currentGame?.type);
  const gameType = isGameType(type) ? type : undefined;
  const config = useSelector((state: TRootState) => state.config);

  const gameOverActionHandler = useCallback(
    (action: "replay" | "menu") => {
      // the score is already added when MathGame marks the game as finished,
      // here we only archive the game (a game that finished keeps its status)
      if (gameType) {
        dispatch(gameOver());
      }

      if (action === "replay" && gameType) {
        dispatch(
          newGame({
            type: gameType,
            ...config,
          }),
        );
        navigate(`/game/${gameType}`, { replace: true });
      } else if (action === "menu") {
        navigate("/");
      }
    },
    [config, dispatch, gameType, navigate],
  );

  return (
    <GameOver
      onAction={gameOverActionHandler}
      hudCorrectAnswers={hudCorrectAnswers ?? 0}
    />
  );
};

export default GameOverPage;
