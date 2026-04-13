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

import { INCREASE_SCORE_OF_GAME, type TScoreActions } from "../actions/actions";
import {
  GAME_SUBTRACTION,
  GAME_ADDITION,
  GAME_DIVISION,
  GAME_MULTIPLICATION,
} from "../gameTypes";

export type TScoreState = {
  addScore: number;
  subScore: number;
  mulScore: number;
  divScore: number;
};

export default function reducer(
  state: TScoreState = {
    addScore: 0,
    subScore: 0,
    mulScore: 0,
    divScore: 0,
  },
  action: TScoreActions | { type: "@@INIT"; payload?: unknown },
) {
  if (action.type === INCREASE_SCORE_OF_GAME) {
    const { payload } = action;
    let o = {};
    switch (payload.game) {
      case GAME_SUBTRACTION:
        o = { subScore: state.subScore + payload.score };
        break;

      case GAME_MULTIPLICATION:
        o = { mulScore: state.mulScore + payload.score };
        break;

      case GAME_DIVISION:
        o = { divScore: state.divScore + payload.score };
        break;

      case GAME_ADDITION:
        o = { addScore: state.addScore + payload.score };
        break;
    }
    return Object.assign({}, state, o);
  }
  return state;
}
