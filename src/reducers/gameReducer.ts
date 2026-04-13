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

type TGameState = {
  history: TGameObject[];
  currentGame: null | TGameObject;
  historyLengthCap: number;
};

const DEFAULT_STATE: TGameState = {
  history: [],
  currentGame: null,
  historyLengthCap: 10,
};
export default (state = DEFAULT_STATE, action: TGameActions) => {
  let newState: TGameState, currentQuestion: TQuestion;
  switch (action.type) {
    case NEW_GAME:
      // create current game object
      return { ...state, currentGame: generateGameObject(action.config) };

    case GAME_OVER: {
      if (!state.currentGame) {
        return state;
      }
      // add current game object to the history and nullify the currentGame

      newState = {
        ...state,
        history: [state.currentGame, ...state.history],
        currentGame: null,
      };
      // clear questions list
      newState.history[0].questions.length = 0;
      //
      const { historyLengthCap: cap } = newState;
      // cap
      if (newState.history.length > cap) {
        newState.history.splice(cap, newState.history.length - cap);
      }
      //
      return newState;
    }

    case ANSWER_QUESTION: {
      newState = { ...state };
      if (newState.currentGame) {
        newState.currentGame = { ...newState.currentGame };

        currentQuestion =
          newState.currentGame.questions[
            newState.currentGame.hudQuestionCurrent - 1
          ]!;
        // validate answer
        currentQuestion.answer = {
          user: action.answer,
          correct: action.answer === currentQuestion.correct,
          selectionId: action.optionId,
        };
        newState.currentGame.questions[
          newState.currentGame.hudQuestionCurrent - 1
        ] = currentQuestion;
        // score
        if (currentQuestion.answer.correct)
          newState.currentGame.hudCorrectAnswers += 1;
        //
      }
      return newState;
    }

    case NEXT_QUESTION: {
      newState = { ...state };
      if (newState.currentGame) {
        // move current question to the history stack
        currentQuestion =
          newState.currentGame.questions[
            newState.currentGame.hudQuestionCurrent - 1
          ]!;
        newState.currentGame.history.push(currentQuestion);

        // nullify current question array slot
        newState.currentGame.questions[
          newState.currentGame.hudQuestionCurrent - 1
        ] = null;
        // increase question number
        newState.currentGame.hudQuestionCurrent += 1;
      }
      return newState;
    }
    case QUIT_GAME:
      // dispose current game object
      return { ...state, currentGame: null };

    default:
      return state;
  }
};
