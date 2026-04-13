import reducer from "../../reducers/scoreReducer";
import { increaseScoreOfGame } from "../../actions/actions";
import {
    GAME_ADDITION,
    GAME_SUBTRACTION,
    GAME_MULTIPLICATION,
    GAME_DIVISION
} from "../../gameTypes";

const defaultState = {
    addScore: 0,
    subScore: 0,
    mulScore: 0,
    divScore: 0
};

test('Should scoreReducer set default state', () => {
    const state = reducer(undefined, { type: '@@INIT' });

    expect(state).toEqual(defaultState);
});

test('should add score to addition', () => {
    const value = 10;
    const type = GAME_ADDITION;
    const increaseAction = increaseScoreOfGame(value, type);
    const state = reducer(defaultState, increaseAction);

    expect(state).toEqual({
        ...defaultState,
        addScore: value
    });
});

test('should add score to subtraction', () => {
    const value = 10;
    const type = GAME_SUBTRACTION;
    const increaseAction = increaseScoreOfGame(value, type);
    const state = reducer(defaultState, increaseAction);

    expect(state).toEqual({
        ...defaultState,
        subScore: value
    });
});

test('should add score to multiplication', () => {
    const value = 10;
    const type = GAME_MULTIPLICATION;
    const increaseAction = increaseScoreOfGame(value, type);
    const state = reducer(defaultState, increaseAction);

    expect(state).toEqual({
        ...defaultState,
        mulScore: value
    });
});

test('should add score to division', () => {
    const value = 10;
    const type = GAME_DIVISION;
    const increaseAction = increaseScoreOfGame(value, type);
    const state = reducer(defaultState, increaseAction);

    expect(state).toEqual({
        ...defaultState,
        divScore: value
    });
});

test('should NOT change score at all', () => {
    const value = 10;
    const type = "not exists";
    const increaseAction = increaseScoreOfGame(value, type);
    const state = reducer(defaultState, increaseAction);

    expect(state).toEqual(defaultState);
});