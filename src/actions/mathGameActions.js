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


export const NEW_GAME = 'gd:NEW_GAME';
/**
 * Creates the NEW_GAME action object
 * @param {object} config game configuration object
 * @param {object} config.general general settings
 * @param {number} config.general.questionCount how many questions to ask
 * @param {number} config.general.from lower range of tested numbers
 * @param {number} config.general.to upper range of tested numbers
 */
export const newGame = (config) => ({
    type:NEW_GAME,
    config
});



export const NEXT_QUESTION = 'gd:NEXT_QUESTION';
/** Creates NEXT_QUESTION action object */
export const nextQuestion = () => ({
    type:NEXT_QUESTION
});


export const ANSWER_QUESTION = 'gd:ANSWER_QUESTION';
/**
 * Creates ANSWER_QUESTION action object
 * @param {number} answer user answer
 * @param {number} optionId selected option id
 */
export const answerQuestion = (answer, optionId) => ({
    type: ANSWER_QUESTION,
    answer,
    optionId
})


export const ANSWER_RESULT = 'gd:ANSWER_RESULT';
/**
 * Creates ANSWER_RESULT action object
 * @param {boolean} result User answered correctly or not
 * @param {boolean} finished Default false. Was it the last question that was answered
 */
export const answerResult = (result, finished=false) => ({
    type:ANSWER_RESULT,
    result,
    finished
});
export const REPLAY_GAME = 'gd:REPLAY_GAME';
/** Creates REPLAY_GAME action object */
export const replayGame = () => ({
    type:REPLAY_GAME
});