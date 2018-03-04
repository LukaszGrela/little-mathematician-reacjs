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
import { GAME_ADDITION, GAME_SUBTRACTION, GAME_MULTIPLICATION, GAME_DIVISION } from '../gameTypes';
import { randomRange, randomOption, shuffle } from '../utils/math';

export const generateGameObject = (config) => {
    //transform config
    const settings = mergeSettings(config, config.type);
    const questions = prepareQuestions(settings.from, settings.to, settings.questionCount, config.type);
    return {
        ...settings,
        type: config.type,
        history: [],
        hudQuestionCurrent: 1,
        hudCorrectAnswers: 0,
        questions,
        operation: questions[0].operation
    };
};

/**
 * Merges the general settings with settings specified by the game type (if exists).
 * @param {object} config game settings
 * @param {string} type Game type id
 */
export const mergeSettings = (config, type) => {
    let sectionSettings;
    const { questionCount, from, to } = config.general;
    let settings = {
        questionCount,
        from,
        to,
    };

    switch (type) {
        case GAME_ADDITION:
        case GAME_SUBTRACTION:
        case GAME_MULTIPLICATION:
        case GAME_DIVISION:
            sectionSettings = config[type];
            break;

        default:
            break;
    }

    if (sectionSettings) {
        //combine if section settings exists
        settings = {
            ...settings,
            ...sectionSettings
        }
    }

    return settings;
};
/**
 * Prepares question list to answer
 * @param {number} from minimum value of equation operand
 * @param {number} to maximum value of equation operand
 * @param {number} count number of questions to generate
 * @param {string} type type of the game
 * @returns {array} List of questions
 */
export const prepareQuestions = (from, to, count, type) => {
    switch (type) {
        case GAME_SUBTRACTION:
            return prepareQuestionsSubtraction(from, to, count);

        case GAME_MULTIPLICATION:
            return prepareQuestionsMultiplication(from, to, count);

        case GAME_DIVISION:
            return prepareQuestionsDivision(from, to, count);

        case GAME_ADDITION:
        default:
            return prepareQuestionsAddition(from, to, count);
    }
}

export const prepareQuestionsDivision = (from, to, questionCount) => {

    // initiate the game 
    let questions = [];
    for (let index = 0; index < questionCount; index++) {
        let a = randomRange(from, to),
            b = randomRange(from, to)
            , mul = a * b
            , result = b
            , ask = randomOption(['result', 'a', 'b']),
            distractors = [];

        b = a;
        a = mul;


        if (ask === 'result') {

            distractors = [
                result,
                result + randomRange(1, 3),
                result + randomRange(4, 7),
                result - randomRange(1, 3),
            ]
        }
        else if (ask === 'a') {

            distractors = [
                a,
                a + randomRange(1, 3),
                a + randomRange(4, 7),
                a - randomRange(4, 7),
            ]
        }
        else {
            distractors = [
                b,
                b + randomRange(1, 3),
                b + randomRange(4, 7),
                b - randomRange(1, 3),
            ]
        }
        questions.push({
            id: index,
            operandA: a,
            operandB: b,
            result: result,
            ask: ask,
            correct: distractors[0],
            distractors: shuffle(distractors),
            operation: '/',
        });

    }
    return questions;
}
export const prepareQuestionsMultiplication = (from, to, questionCount) => {

    // initiate the game 
    let questions = [];
    for (let index = 0; index < questionCount; index++) {
        let a = randomRange(from, to),
            b = randomRange(from, to)
            , result = a * b
            , ask = randomOption(['result', 'a', 'b']),
            distractors = [];




        if (ask === 'result') {

            distractors = [
                result,
                result + randomRange(1, 3),
                result + randomRange(4, 7),
                result - randomRange(1, 3),
            ]
        }
        else if (ask === 'a') {

            distractors = [
                a,
                a + randomRange(1, 3),
                a + randomRange(4, 7),
                a - randomRange(4, 7),
            ]
        }
        else {
            distractors = [
                b,
                b + randomRange(1, 3),
                b + randomRange(4, 7),
                b - randomRange(1, 3),
            ]
        }
        questions.push({
            id: index,
            operandA: a,
            operandB: b,
            result: result,
            ask: ask,
            correct: distractors[0],
            distractors: shuffle(distractors),
            operation: 'x',
        });

    }
    return questions;
}


export const prepareQuestionsSubtraction = (from, to, questionCount) => {

    // initiate the game 
    let questions = [];
    for (let index = 0; index < questionCount; index++) {
        let a = randomRange(from, to),
            b = randomRange(from, to);

        if (a < b) {
            //swap
            // a = b + (b = a, 0);
            [a,b] = [b,a];
        }

        let result = a - b
            , ask = randomOption(['result', 'a', 'b']),
            distractors = [];




        if (ask === 'result') {

            distractors = [
                result,
                result + randomRange(1, 3),
                result + randomRange(4, 7),
                result - randomRange(1, 3),
            ]
        }
        else if (ask === 'a') {

            distractors = [
                a,
                a + randomRange(1, 3),
                a + randomRange(4, 7),
                a - randomRange(4, 7),
            ]
        }
        else {
            distractors = [
                b,
                b + randomRange(1, 3),
                b + randomRange(4, 7),
                b - randomRange(1, 3),
            ]
        }
        questions.push({
            id: index,
            operandA: a,
            operandB: b,
            result: result,
            ask: ask,
            correct: distractors[0],
            distractors: shuffle(distractors),
            operation: '-',
        });

    }
    return questions;
}
/**
 * Prepares question for addition to answer
 * @param {number} from minimum value of equation operand
 * @param {number} to maximum value of equation operand
 * @param {number} count number of questions to generate
 */
export const prepareQuestionsAddition = (from, to, count) => {
    // initiate the game 
    let questions = [];
    for (let index = 0; index < count; index++) {
        let a = randomRange(from, to),
            b = randomRange(from, to)
            , result = a + b
            , ask = randomOption(['result', 'a', 'b']),
            distractors = [];




        if (ask === 'result') {

            distractors = [
                result,
                result + randomRange(1, 3),
                result + randomRange(4, 7),
                result - randomRange(1, 3),
            ]
        }
        else if (ask === 'a') {

            distractors = [
                a,
                a + randomRange(1, 3),
                a + randomRange(4, 7),
                a - randomRange(4, 7),
            ]
        }
        else {
            distractors = [
                b,
                b + randomRange(1, 3),
                b + randomRange(4, 7),
                b - randomRange(1, 3),
            ]
        }
        questions.push({
            id: index,
            operandA: a,
            operandB: b,
            result: result,
            ask: ask,
            correct: distractors[0],
            distractors: shuffle(distractors),
            operation: '+',
        });

    }
    return questions;
};
