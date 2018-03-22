import {
    generateGameObject
} from '../../gamelogic/gamelogic';
import { GAME_DIVISION } from "../../gameTypes";


test('Should generateGameObject return GAME_DIVISION data object without 0 as divisor', () => {    
    const config = {
        general: {
            questionCount: 1000,
            from: 0,
            to: 10
        },
        type: GAME_DIVISION
    };
    const gameObject = generateGameObject(config);

    expect(gameObject.questions).toHaveLength(1000);
    expect(gameObject.type).toBe(GAME_DIVISION);
    expect(gameObject.operation).toBe('/');

    expect(gameObject.questions.filter(question => question.operandB === 0)).toHaveLength(0);
});