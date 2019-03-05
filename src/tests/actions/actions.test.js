import {
    GAME_ADDITION, 
    GAME_SUBTRACTION,
    GAME_MULTIPLICATION,
    GAME_DIVISION
} from "../../gameTypes";
import {
    ConfigType,
    increaseScoreOfGame, INCREASE_SCORE_OF_GAME,
    changeNumberOfQuestions, CHANGE_NUMBER_OF_QUESTIONS, 
    changeRangeFrom, CHANGE_RANGE_FROM, 
    changeRangeTo, CHANGE_RANGE_TO
} from "../../actions/actions";

test('should generate increaseScoreOfGame action object', () => {
    const payload = {
        score: 100,
        game: GAME_MULTIPLICATION
    };
    const action = increaseScoreOfGame(payload.score, payload.game);
    expect(action).toEqual({
        type: INCREASE_SCORE_OF_GAME,
        payload
    })
});

test('should generate changeNumberOfQuestions action object', () => {
    const payload = {
        questionCount: 25,
        configType: ConfigType.GENERAL
    };
    const action = changeNumberOfQuestions(payload.questionCount, payload.configType);

    expect(action).toEqual({
        type: CHANGE_NUMBER_OF_QUESTIONS,
        payload
    })
});


test('should generate changeRangeFrom action object', () => {
    const payload = {
        value: 25,
        configType: ConfigType.GENERAL
    };
    const action = changeRangeFrom(payload.value, payload.configType);

    expect(action).toEqual({
        type: CHANGE_RANGE_FROM,
        payload
    })
});

test('should generate changeRangeTo action object', () => {
    const payload = {
        value: 25,
        configType: ConfigType.GENERAL
    };
    const action = changeRangeTo(payload.value, payload.configType);

    expect(action).toEqual({
        type: CHANGE_RANGE_TO,
        payload
    })
});
