import reducer from "../../reducers/scoreReducer";

const defaultState = {
    addScore: 0,
    subScore: 0,
    mulScore: 0,
    divScore: 0
};

test('Should scoreReducer set default state', () => {
    const state = reducer(undefined, {type: '@@INIT'});

    expect(state).toEqual(defaultState);
})