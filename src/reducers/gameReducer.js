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

import { NEW_GAME, GAME_OVER, QUIT_GAME } from "../actions/mathGameActions";
import { generateGameObject } from "../gamelogic/gamelogic";

const DEFAULT_STATE = {
    history: [],
    currentGame: null,
    historyLengthCap: 10
};
export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case NEW_GAME:
            // create current game object
            return { ...state, currentGame: generateGameObject(action.config) };

            break;
        case GAME_OVER:
            // add current game object to the history and nullify the currentGame
            const newState = {
                ...state,
                history: [state.currentGame, ...state.history],
                currentGame: null
            };
            const { historyLengthCap: cap } = newState;
            // cap
            if (newState.history.length > cap) {
                newState.history.splice(cap, newState.history.length - cap);
            }
            //
            return newState;
            break;
        case QUIT_GAME:
            // dispose current game object
            return { ...state, currentGame: null };
            break;
        default:
            break;
    }
    return state;
};