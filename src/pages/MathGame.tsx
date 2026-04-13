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

import "./MathGame.scss";
import { useCallback, useEffect, type FC } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import GameHud from "../components/GameHud";
import GameAnswers from "../components/GameAnswers";
import Equation from "../components/Equation";
import Feedback from "../components/Feedback";
import { answerQuestion, nextQuestion } from "../actions/mathGameActions";
import type { TGameType } from "../gameTypes";
import { type TAppDispatch, type TRootState } from "../store/types";

export const MathGame: FC = () => {
  const navigate = useNavigate();
  const match = useMatch("/game/:type");
  const type = match?.params.type as TGameType | undefined;

  const dispatch = useDispatch<TAppDispatch>();

  const game = useSelector((state: TRootState) => state.game.currentGame);

  const hudQuestionCurrent = useSelector(
    (state: TRootState) => state.game.currentGame?.hudQuestionCurrent ?? 0,
  );

  const questionCount = useSelector(
    (state: TRootState) => state.game.currentGame?.questionCount ?? 0,
  );

  const feedbackActionHandler = useCallback(() => {
    dispatch(nextQuestion());
  }, [dispatch]);

  const gameAnswerSelectionHandler = useCallback(
    (answer: number, optionId: number) => {
      dispatch(answerQuestion(answer, optionId));
    },
    [dispatch],
  );

  const getNextEquationView = useCallback(() => {
    if (!game || !hudQuestionCurrent) return null;

    const { operation, questions } = game;
    const current = questions[hudQuestionCurrent - 1];
    if (!current) return null;

    return <Equation {...current} operation={operation} />;
  }, [game, hudQuestionCurrent]);

  const gameView = useCallback(() => {
    if (!game || !hudQuestionCurrent) return null;

    const { hudCorrectAnswers, questionCount, questions } = game;
    const current = questions[hudQuestionCurrent - 1];

    return (
      <div className="game-view">
        <GameHud
          hudCorrectAnswers={hudCorrectAnswers}
          hudQuestionCurrent={hudQuestionCurrent}
          questionCount={questionCount}
          type={type}
        />
        {getNextEquationView()}
        {
          /* show feedback panel if question has user answer */
          current && current.answer ? (
            <Feedback
              answer={current.answer!}
              correct={current.correct}
              onAction={feedbackActionHandler}
            />
          ) : null
        }
        {current && (
          <GameAnswers
            selectionId={current.answer ? current.answer.selectionId : null}
            options={current.distractors}
            onSelection={gameAnswerSelectionHandler}
          />
        )}
      </div>
    );
  }, [
    feedbackActionHandler,
    game,
    gameAnswerSelectionHandler,
    getNextEquationView,
    type,
    hudQuestionCurrent,
  ]);

  const isGameOver = hudQuestionCurrent > questionCount;

  useEffect(() => {
    if (isGameOver) {
      navigate(`/game/${type}/game-over`, {
        replace: true,
      });
    }
  }, [isGameOver, navigate, type]);

  return (
    <div className={"game game-" + type?.split(":").join("")}>
      {!isGameOver && gameView()}
    </div>
  );
};

export default MathGame;
