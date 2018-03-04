export const generateGameObject = (config) => {
    //transform config
    const questions = prepareQuestions();
    return {
        from: 0,
        to: 10,
        questionCount: 10,
        type: config.type,
        history: [],
        hudQuestionCurrent: 1,
        hudCorrectAnswers: 0,
        questions,
        operation: questions[0].operation,
        isGameOver: false
    };
};
export const prepareQuestions = () => {
    return [{ id: 0, operation: '+' }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 },];
}