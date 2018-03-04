import gameReducer from "../../reducers/gameReducer";
import { quitGame, gameOver, newGame } from "../../actions/mathGameActions";
import { GAME_ADDITION } from "../../gameTypes";
import { generateGameObject } from "../../gamelogic/gamelogic";
jest.mock('../../gamelogic/gamelogic');

const defaultState = {
    history: [],
    currentGame: null,
    historyLengthCap: 10
};
test('Should gameReducer set default state', () => {
    const state = gameReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(defaultState);
});

test('Should set currentGame to null for QUIT_GAME action', () => {
    const state = gameReducer({ currentGame: { test: 'my game' } }, quitGame());
    expect(state.currentGame).toBeNull();
});

test('should add currentGame to history and set currentGame to null for GAME_OVER action', () => {
    const currentGame = {
        game: 'my game'
    };
    const state = gameReducer({
        ...defaultState,
        currentGame
    }, gameOver());

    expect(state.currentGame).toBeNull();

    expect(state.history.length).toBeGreaterThan(0);

    expect(state.history[0]).toEqual(currentGame);
});

test('should add currentGame to history keep history within historyLengthCap limit for GAME_OVER action', () => {
    const currentGame = {
        game: 'my game'
    };
    const state = gameReducer({
        ...defaultState,
        history: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        currentGame
    }, gameOver());

    expect(state.currentGame).toBeNull();

    expect(state.history.length).toBe(defaultState.historyLengthCap);

    expect(state.history[0]).toEqual(currentGame);
});

test('should set currentGame to be a new game object', () => {
    const config = {
        type: GAME_ADDITION,
        general: {
            questionCount: 10,
            from: 0,
            to: 10
        }
    };

    const state = gameReducer(defaultState, newGame(config));
    //
    expect(state.currentGame).toEqual(generateGameObject(config));

});
