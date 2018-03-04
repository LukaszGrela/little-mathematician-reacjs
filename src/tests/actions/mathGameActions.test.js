import {
    newGame, NEW_GAME,
    nextQuestion, NEXT_QUESTION,
    answerQuestion, ANSWER_QUESTION,
    quitGame, QUIT_GAME,
    gameOver, GAME_OVER
} from "../../actions/mathGameActions";

test('should generate initGame action object', () => {
    const config = { config: 'config' };
    const action = newGame(config);
    expect(action).toEqual({
        type: NEW_GAME,
        config
    });
});

test('should generate nextQuestion action object', () => {
    const action = nextQuestion();
    expect(action).toEqual({
        type: NEXT_QUESTION
    });
});

test('should generate answerQuestion action object', () => {
    const answer = 1;
    const optionId = 2;
    const action = answerQuestion(answer, optionId);
    expect(action).toEqual({
        type: ANSWER_QUESTION,
        answer,
        optionId
    });
});
test('should generate quitGame action object', () => {
    const action = quitGame();
    expect(action).toEqual({
        type: QUIT_GAME
    });
});
test('should generate gameOver action object', () => {
    const action = gameOver();
    expect(action).toEqual({
        type: GAME_OVER
    });
});