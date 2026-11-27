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
  NEW_GAME,
  GAME_OVER,
  QUIT_GAME,
  ANSWER_QUESTION,
  NEXT_QUESTION,
  FINISH_GAME,
  type TGameActions,
} from "../actions/mathGameActions";
import { generateGameObject } from "../gamelogic/gamelogic";
import type { TGameObject, TGameStatus, TQuestion } from "../types";

export type TGameState = {
  history: TGameObject[];
  currentGame: null | TGameObject;
  historyLengthCap: number;
};

/**
 * Returns a closed (finished or abandoned) copy of the game: lifecycle status,
 * finish timestamp and the frozen score. The questions are dropped - a history
 * entry only keeps the summary of the game.
 * An already closed game keeps its own status, time and score, so finishing a
 * game twice (e.g. the effect and the game-over click) cannot overwrite them.
 * @param {object} game game to close
 * @param {string} status status to set when the game is still in-progress
 */
const closeGame = (
  game: TGameObject,
  status: Exclude<TGameStatus, "in-progress">,
): TGameObject => {
  const isOpen = game.status === "in-progress";
  return {
    ...game,
    status: isOpen ? status : game.status,
    finishedAt: game.finishedAt ?? Date.now(),
    score: isOpen ? game.hudCorrectAnswers : game.score,
    questions: [],
  };
};

const DEFAULT_STATE: TGameState = {
  history: [],
  currentGame: null,
  historyLengthCap: 10,
};
export default (
  state = DEFAULT_STATE,
  action: TGameActions | { type: "@@INIT"; payload?: unknown },
) => {
  switch (action.type) {
    case NEW_GAME:
      // create current game object
      return { ...state, currentGame: generateGameObject(action.config) };

    case FINISH_GAME: {
      const currentGame = state.currentGame;
      // no game or an already closed one - nothing to mark (idempotent)
      if (!currentGame || currentGame.status !== "in-progress") {
        return state;
      }
      return {
        ...state,
        currentGame: closeGame(currentGame, "finished"),
      };
    }

    case GAME_OVER: {
      const currentGame = state.currentGame;
      if (!currentGame) {
        return state;
      }
      // add a snapshot of the finished game to the history and nullify the
      // currentGame; the snapshot must be a new object - clearing the questions
      // in place would mutate the previous state (state.currentGame)
      const finishedGame: TGameObject = closeGame(currentGame, "finished");
      const { historyLengthCap: cap } = state;
      // cap with a new array, no in-place splice
      const history = [finishedGame, ...state.history].slice(0, cap);
      //
      return { ...state, history, currentGame: null };
    }

    case ANSWER_QUESTION: {
      const currentGame = state.currentGame;
      if (!currentGame) {
        return state;
      }
      const questionIndex = currentGame.hudQuestionCurrent - 1;
      const currentQuestion = currentGame.questions[questionIndex];
      // nothing to answer (e.g. a game without questions) - keep the state
      if (!currentQuestion) {
        return state;
      }
      // validate answer
      const isCorrect = action.answer === currentQuestion.correct;
      // a new question object and a copied questions array - assigning the
      // answer in place would mutate the previous state (Redux immutability)
      const answeredQuestion: TQuestion = {
        ...currentQuestion,
        answer: {
          user: action.answer,
          correct: isCorrect,
          selectionId: action.optionId,
        },
      };
      const questions = [...currentGame.questions];
      questions[questionIndex] = answeredQuestion;

      return {
        ...state,
        currentGame: {
          ...currentGame,
          questions,
          // score
          hudCorrectAnswers:
            currentGame.hudCorrectAnswers + (isCorrect ? 1 : 0),
        },
      };
    }

    case NEXT_QUESTION: {
      const currentGame = state.currentGame;
      if (!currentGame) {
        return state;
      }
      const questionIndex = currentGame.hudQuestionCurrent - 1;
      // move current question to the history stack
      const currentQuestion = currentGame.questions[questionIndex];
      // nothing to advance (e.g. a game without questions) - keep the state
      if (!currentQuestion) {
        return state;
      }
      // new arrays instead of push/null assignment on the previous state
      const questions = [...currentGame.questions];
      // nullify current question array slot
      questions[questionIndex] = null;

      return {
        ...state,
        currentGame: {
          ...currentGame,
          history: [...currentGame.history, currentQuestion],
          questions,
          // increase question number
          hudQuestionCurrent: currentGame.hudQuestionCurrent + 1,
        },
      };
    }
    case QUIT_GAME: {
      const currentGame = state.currentGame;
      if (!currentGame) {
        return state;
      }
      // quitting mid-game marks it as abandoned; a game that already finished
      // keeps its status and is only stored for the record
      const abandonedGame = closeGame(currentGame, "abandoned");
      const { historyLengthCap: cap } = state;
      return {
        ...state,
        history: [abandonedGame, ...state.history].slice(0, cap),
        currentGame: null,
      };
    }

    default:
      return state;
  }
};
