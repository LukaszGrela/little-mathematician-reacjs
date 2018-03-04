import React from 'react';
import { shallow } from 'enzyme';
import { MathGame } from '../../pages/MathGame';
import { GAME_ADDITION } from '../../gameTypes';

let wrapper,
    game,
    newGame,
    quitGame,
    answerQuestion,
    gameOver,
    updateScore,
    nextQuestion,
    config,
    onAction;

beforeEach(() => {
    newGame = jest.fn();
    quitGame = jest.fn();
    answerQuestion = jest.fn();
    nextQuestion = jest.fn();
    gameOver = jest.fn();
    updateScore = jest.fn();
    onAction = jest.fn();
    config = {
        general: {
            "questionCount": 10,
            "from": 0,
            "to": 10,
        }
    };
    game = {
        "questionCount": 10,
        "from": 0,
        "to": 10,
        "type": ":addition",
        "history": [],
        "hudQuestionCurrent": 1,
        "hudCorrectAnswers": 0,
        "questions": [{ "id": 0, "operandA": 6, "operandB": 1, "result": 7, "ask": "b", "correct": 1, "distractors": [6, 3, 1, 0], "operation": "+" }, { "id": 1, "operandA": 2, "operandB": 7, "result": 9, "ask": "a", "correct": 2, "distractors": [2, 7, -3, 3], "operation": "+" }, { "id": 2, "operandA": 10, "operandB": 7, "result": 17, "ask": "result", "correct": 17, "distractors": [21, 19, 16, 17], "operation": "+" }, { "id": 3, "operandA": 9, "operandB": 3, "result": 12, "ask": "a", "correct": 9, "distractors": [9, 13, 4, 12], "operation": "+" }, { "id": 4, "operandA": 4, "operandB": 0, "result": 4, "ask": "result", "correct": 4, "distractors": [7, 2, 4, 9], "operation": "+" }, { "id": 5, "operandA": 6, "operandB": 1, "result": 7, "ask": "a", "correct": 6, "distractors": [7, 6, 10, 2], "operation": "+" }, { "id": 6, "operandA": 0, "operandB": 6, "result": 6, "ask": "b", "correct": 6, "distractors": [10, 7, 6, 4], "operation": "+" }, { "id": 7, "operandA": 6, "operandB": 7, "result": 13, "ask": "result", "correct": 13, "distractors": [10, 19, 13, 15], "operation": "+" }, { "id": 8, "operandA": 5, "operandB": 4, "result": 9, "ask": "a", "correct": 5, "distractors": [6, 0, 11, 5], "operation": "+" }, { "id": 9, "operandA": 2, "operandB": 0, "result": 2, "ask": "result", "correct": 2, "distractors": [6, 5, 1, 2], "operation": "+" }],
        "operation": "+"
    };

    wrapper = shallow(<MathGame
        config={config}
        game={game}
        type={GAME_ADDITION}
        newGame={newGame}
        quitGame={quitGame}
        answerQuestion={answerQuestion}
        nextQuestion={nextQuestion}
        gameOver={gameOver}
        updateScore={updateScore}
        onAction={onAction}
    />);

})

test('Should render MathGame correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should call the newGame method', () => {
    expect(newGame).toHaveBeenCalled();
});
test('Should answerQuestion be called', () => {
    wrapper.instance().gameAnswerSelectionHandler(6, 1);

    expect(answerQuestion).toHaveBeenLastCalledWith(6, 1);
});
test('Should updateScore, gameOver and newGame be called', () => {
    wrapper.instance().gameOverActionHandler('replay');

    expect(updateScore).toHaveBeenCalled();
    expect(gameOver).toHaveBeenCalled();
    expect(newGame).toHaveBeenLastCalledWith(config);
});
test('Should updateScore, gameOver and onAction be called', () => {
    wrapper.instance().gameOverActionHandler('menu');

    expect(updateScore).toHaveBeenCalled();
    expect(gameOver).toHaveBeenCalled();
    expect(onAction).toHaveBeenLastCalledWith('/');
});
test('Should nextQuestion to be called', () => {
    wrapper.instance().feedbackActionHandler();

    expect(nextQuestion).toHaveBeenCalled();

 });
// test('', () => { });