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
import { useCallback, useEffect, useRef, type FC } from "react";
import { Navigate, useMatch, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import GameHud from "../components/GameHud";
import GameAnswers from "../components/GameAnswers";
import Equation from "../components/Equation";
import Feedback from "../components/Feedback";
import {
  answerQuestion,
  finishGame,
  nextQuestion,
} from "../actions/mathGameActions";
import { increaseScoreOfGame } from "../actions/actions";
import { isGameType } from "../gameTypes";
import { type TAppDispatch, type TRootState } from "../store/types";

export const MathGame: FC = () => {
  const navigate = useNavigate();
  const match = useMatch("/game/:type");
  const rawType = match?.params.type;
  const type = isGameType(rawType) ? rawType : undefined;

  const dispatch = useDispatch<TAppDispatch>();

  const game = useSelector((state: TRootState) => state.game.currentGame);

  const hudQuestionCurrent = useSelector(
    (state: TRootState) => state.game.currentGame?.hudQuestionCurrent ?? 0,
  );

  const questionCount = useSelector(
    (state: TRootState) => state.game.currentGame?.questionCount ?? 0,
  );

  const hudCorrectAnswers = useSelector(
    (state: TRootState) => state.game.currentGame?.hudCorrectAnswers ?? 0,
  );

  const gameStatus = game?.status;
  const isGameOver = hudQuestionCurrent > questionCount;

  // Focus targets: the "next question" control after answering and the first
  // answer button after a question change, so a keyboard player never has to
  // hunt for the next control with Tab.
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstAnswerRef = useRef<HTMLButtonElement | null>(null);

  const feedbackActionHandler = useCallback(() => {
    dispatch(nextQuestion());
  }, [dispatch]);

  const gameAnswerSelectionHandler = useCallback(
    (answer: number, optionId: number) => {
      dispatch(answerQuestion(answer, optionId));
    },
    [dispatch],
  );

  const currentQuestion = game?.questions[hudQuestionCurrent - 1];
  const answerLocked = Boolean(currentQuestion?.answer);
  const distractors = currentQuestion?.distractors;

  // Keyboard shortcuts: 1-4 pick the matching answer while the question is
  // still open. The listener exists only for that window - once feedback is
  // shown (or the question changes) the effect re-runs and the old handler is
  // removed, so no stale listener survives an unmount either.
  useEffect(() => {
    if (!type || answerLocked || !distractors?.length) return;
 
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

      const index = Number(event.key);
      if (
        !Number.isInteger(index) ||
        index < 1 ||
        index > distractors.length
      ) {
        return;
      }

      const option = distractors[index - 1];
      if (option === undefined) return;

      event.preventDefault();
      gameAnswerSelectionHandler(option, index);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [answerLocked, distractors, gameAnswerSelectionHandler, type]);

  // Enter advances to the next question once the answer is known. Safe by
  // construction: it only listens while feedback is visible, ignores modifier
  // keys and key repeats, and steps aside when focus is already on an
  // interactive element (there the browser fires a native click instead, so a
  // single Enter can never advance twice).
  useEffect(() => {
    if (!type || !answerLocked) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" || event.repeat) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      // `event.target` is not always a DOM node (e.g. the window itself when
      // the key comes from a synthetic dispatch), so check the type first.
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest(
          'button, a[href], input, select, textarea, [role="menuitem"], [contenteditable="true"]',
        )
      ) {
        return;
      }

      event.preventDefault();
      feedbackActionHandler();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [answerLocked, feedbackActionHandler, type]);

  // Move focus to the "next question" button when the feedback appears.
  useEffect(() => {
    if (!answerLocked) return;
    nextButtonRef.current?.focus();
  }, [answerLocked, hudQuestionCurrent]);

  // ...and back to the answers when the next question is shown. The first
  // question is skipped so mounting the game does not steal focus.
  useEffect(() => {
    if (isGameOver || answerLocked || hudQuestionCurrent <= 1) return;
    firstAnswerRef.current?.focus();
  }, [answerLocked, hudQuestionCurrent, isGameOver]);

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
              nextButtonRef={nextButtonRef}
            />
          ) : null
        }
        {current && (
          <GameAnswers
            selectionId={current.answer ? current.answer.selectionId : null}
            options={current.distractors}
            onSelection={gameAnswerSelectionHandler}
            firstAnswerRef={firstAnswerRef}
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

  // The end of the game is derived from the state, not from a click: once the
  // last question is behind us the game is marked as finished (exactly once -
  // the reducer ignores a game that is no longer in-progress) and its score is
  // added to the totals. The game-over screen can still read the game, because
  // FINISH_GAME keeps it as the current game.
  useEffect(() => {
    if (!isGameOver || !type) return;
    if (gameStatus !== "in-progress") return;

    dispatch(finishGame());
    dispatch(increaseScoreOfGame(hudCorrectAnswers, type));
  }, [dispatch, gameStatus, hudCorrectAnswers, isGameOver, type]);

  useEffect(() => {
    if (isGameOver && type) {
      navigate(`/game/${type}/game-over`, {
        replace: true,
      });
    }
  }, [isGameOver, navigate, type]);

  // unknown type in the URL - leave the game area instead of rendering it
  if (!type) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={"game game-" + type.split(":").join("")}>
      {!isGameOver && gameView()}
    </div>
  );
};

export default MathGame;
