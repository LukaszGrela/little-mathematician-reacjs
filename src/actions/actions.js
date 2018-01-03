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
import { GAME_ADDITION, GAME_SUBTRACTION, GAME_MULTIPLICATION, GAME_DIVISION } from "../gameTypes";

export const INCREASE_SCORE_OF_GAME = 'INCREASE_SCORE_OF_GAME';



export function increaseScoreOfGame(score, game) {
    return {
        type: INCREASE_SCORE_OF_GAME,
        payload: {
            score,
            game
        }
    }
}



/**
 * Config actions
 */
export const ConfigType = {
    GENERAL: 'config:general',
    ADDITION: 'config' + GAME_ADDITION,
    SUBTRACTION: 'config' + GAME_SUBTRACTION,
    MULTIPLICATION: 'config' + GAME_MULTIPLICATION,
    DIVISION: 'config' + GAME_DIVISION,
};

export const CHANGE_NUMBER_OF_QUESTIONS = 'CHANGE_NUMBER_OF_QUESTIONS';

export function changeNumberOfQuestions(count, type = ConfigType.GENERAL) {
    return {
        type: CHANGE_NUMBER_OF_QUESTIONS,
        payload: { questionCount:count, configType:type }
    };
}
export const CHANGE_RANGE_FROM = 'CHANGE_RANGE_FROM';

export function changeRangeFrom(value, type = ConfigType.GENERAL) {
    return {
        type: CHANGE_RANGE_FROM,
        payload: { value, configType:type }
    };
}
export const CHANGE_RANGE_TO = 'CHANGE_RANGE_TO';

export function changeRangeTo(value, type = ConfigType.GENERAL) {
    return {
        type: CHANGE_RANGE_TO,
        payload: { value, configType:type }
    };
}