import {
    prepareQuestionsAddition, prepareQuestionsSubtraction,
    prepareQuestionsMultiplication, prepareQuestionsDivision,
    prepareQuestions,
    mergeSettings,
    generateGameObject
} from "../../gamelogic/gamelogic";
import { GAME_SUBTRACTION, GAME_ADDITION, GAME_MULTIPLICATION, GAME_DIVISION } from "../../gameTypes";

jest.mock('../../utils/math');

test('Should prepareQuestionsAddition return correct data object', () => {
    const result = {
        id: 0,
        operandA: 0,
        operandB: 0,
        result: 0,
        ask: 'result',
        correct: 0,
        distractors: [0, 1, 4, -1],
        operation: '+',
    }
    const question = prepareQuestionsAddition(0, 10, 10);
    expect(question).toHaveLength(10);
    expect(question[0]).toEqual(result);
});

test('Should prepareQuestionsSubtraction return correct data object', () => {
    const question = prepareQuestionsSubtraction(0, 10, 10);
    expect(question).toHaveLength(10);
    expect(question[0].operation).toEqual('-');
});

test('Should prepareQuestionsMultiplication return correct data object', () => {
    const question = prepareQuestionsMultiplication(0, 10, 10);
    expect(question).toHaveLength(10);
    expect(question[0].operation).toEqual('x');
});

test('Should prepareQuestionsDivision return correct data object', () => {
    const question = prepareQuestionsDivision(0, 10, 10);
    expect(question).toHaveLength(10);
    expect(question[0].operation).toEqual('/');
});

test('Should prepareQuestions call correct function', () => {
    let questions = prepareQuestions(0, 10, 10, GAME_SUBTRACTION);
    expect(questions).toHaveLength(10);
    expect(questions[0].operation).toEqual('-');

    questions = prepareQuestions(0, 10, 10, GAME_MULTIPLICATION);
    expect(questions).toHaveLength(10);
    expect(questions[0].operation).toEqual('x');

    questions = prepareQuestions(0, 10, 10, GAME_DIVISION);
    expect(questions).toHaveLength(10);
    expect(questions[0].operation).toEqual('/');

    questions = prepareQuestions(0, 10, 10, GAME_ADDITION);
    expect(questions).toHaveLength(10);
    expect(questions[0].operation).toEqual('+');

    questions = prepareQuestions(0, 10, 10);
    expect(questions).toHaveLength(10);
    expect(questions[0].operation).toEqual('+');
});

test('Should mergeSettings return correct values', () => {
    const config = {
        general: {
            questionCount: 10,
            from: 0,
            to: 10
        },
        [GAME_ADDITION]: {
            questionCount: 20,
        },
        [GAME_SUBTRACTION]: {
            from: 20
        },
        [GAME_MULTIPLICATION]: {
            to: 30
        },
        [GAME_DIVISION]: {
            questionCount: 11,
            from: 1,
            to: 2
        },
    };

    let settings = mergeSettings(config);//general - no merging
    expect(settings).toEqual(config.general);

    settings = mergeSettings(config, GAME_ADDITION);//GAME_ADDITION - merge
    expect(settings).toEqual({ ...config.general, ...config[GAME_ADDITION] });

    settings = mergeSettings(config, GAME_SUBTRACTION);//GAME_SUBTRACTION - merge
    expect(settings).toEqual({ ...config.general, ...config[GAME_SUBTRACTION] });

    settings = mergeSettings(config, GAME_MULTIPLICATION);//GAME_MULTIPLICATION - merge
    expect(settings).toEqual({ ...config.general, ...config[GAME_MULTIPLICATION] });

    settings = mergeSettings(config, GAME_DIVISION);//GAME_DIVISION - merge
    expect(settings).toEqual({ ...config.general, ...config[GAME_DIVISION] });


});

test('Should generateGameObject return correct data object', () => {
    const config = {
        general: {
            questionCount: 10,
            from: 0,
            to: 10
        },
        type:GAME_ADDITION
    };
    const gameObject = generateGameObject(config);
    
    expect(gameObject.questions).toHaveLength(10);
    expect(gameObject.type).toBe(GAME_ADDITION);
    expect(gameObject.operation).toBe('+');
});