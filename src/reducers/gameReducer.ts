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
  type TGameActions,
} from "../actions/mathGameActions";
import { generateGameObject } from "../gamelogic/gamelogic";
import type { TGameObject, TQuestion } from "../types";

export type TGameState = {
  history: TGameObject[];
  currentGame: null | TGameObject;
  historyLengthCap: number;
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

    case GAME_OVER: {
      const currentGame = state.currentGame;
      if (!currentGame) {
        return state;
      }
      // add a snapshot of the finished game to the history and nullify the
      // currentGame; the snapshot must be a new object - clearing the questions
      // in place would mutate the previous state (state.currentGame)
      const finishedGame: TGameObject = { ...currentGame, questions: [] };
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
    case QUIT_GAME:
      // dispose current game object
      return { ...state, currentGame: null };

    default:
      return state;
  }
};
