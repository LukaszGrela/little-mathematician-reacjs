import React, { Component } from 'react';

/**
 * Generate a list of questions, then present it one by one. Measure time and log mistakes.
 * Component: InputEquation, a, operation, b, result
 */

import GameHud from '../components/GameHud'
import GameAnswers from '../components/GameAnswers'
import Equation from '../components/Equation'
import GameOver from '../components/GameOver'
import Feedback from '../components/Feedback'


import { randomRange, randomOption, shuffle } from "../utils/math";


import './MathGame.css'

class MathGame extends Component {

    constructor(props) {
        super(props);

        //
        console.log('MathGame', props);

        // setup
        const questionCount = props.questionCount || 10,
            from = props.from || 1,
            to = props.to || 10,
            type = props.type || ':addition';

        // generate questions
        const q = this.prepareQuestions(from, to, questionCount, type);

        // prepare state
        this.state = {
            hudQuestionCurrent: 1,
            hudCorrectAnswers: 0,
            questionCount: questionCount,
            from: from,
            to: to,
            answerOptions: q[0].distractors,
            questions: q,
            gameOver: false,
            operation: q[0].operation,
            type
        }
        // user answers
        this.userAnswers = [];

        //
        this.handleAnswerSelection = this.handleAnswerSelection.bind(this);
        this.handleNavigation = this.handleNavigation.bind(this);
        this.getNextEquation = this.getNextEquationView.bind(this);
        this.handleFeedbackAction = this.handleFeedbackAction.bind(this);
    }

    /**
     * Prepares question list to answer
     * @param {number} from minimum value of equation operand
     * @param {number} to maximum value of equation operand
     * @param {number} questionCount number of questions to generate
     * @param {string} type type of the game
     * @returns {array} List of questions
     */
    prepareQuestions(from, to, questionCount, type) {
        console.log('MathGame#prepareQuestions', type);
        switch (type) {
            case ':subtraction':
                return this.prepareQuestionsSubtraction(from, to, questionCount);

            case ':multiplication':
                return this.prepareQuestionsMultiplication(from, to, questionCount);

            case ':division':
                return this.prepareQuestionsDivision(from, to, questionCount);

            case ':addition':
            default:
                return this.prepareQuestionsAddition(from, to, questionCount);

        }
    }
    prepareQuestionsDivision(from, to, questionCount) {

        // initiate the game 
        let questions = [];
        for (let index = 0; index < questionCount; index++) {
            let a = randomRange(from, to),
                b = randomRange(from, to)
                , mul = a * b
                , result = b
                , ask = randomOption(["result", "a", "b"]),
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
    prepareQuestionsMultiplication(from, to, questionCount) {

        // initiate the game 
        let questions = [];
        for (let index = 0; index < questionCount; index++) {
            let a = randomRange(from, to),
                b = randomRange(from, to)
                , result = a * b
                , ask = randomOption(["result", "a", "b"]),
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


    prepareQuestionsSubtraction(from, to, questionCount) {

        // initiate the game 
        let questions = [];
        for (let index = 0; index < questionCount; index++) {
            let a = randomRange(from, to),
                b = randomRange(from, to);

            if (a < b) {
                //swap
                a = b + (b = a, 0);
            }

            let result = a - b
                , ask = randomOption(["result", "a", "b"]),
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
     * Prepares question with addition to answer
     * @param {number} from minimum value of equation operand
     * @param {number} to maximum value of equation operand
     * @param {number} questionCount number of questions to generate
     */
    prepareQuestionsAddition(from, to, questionCount) {
        // initiate the game 
        let questions = [];
        for (let index = 0; index < questionCount; index++) {
            let a = randomRange(from, to),
                b = randomRange(from, to)
                , result = a + b
                , ask = randomOption(["result", "a", "b"]),
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
    }





    /**
     * Restarts the game
     */
    restartGame() {
        this.userAnswers = [];
        const q = this.prepareQuestions(this.state.from,
            this.state.to,
            this.state.questionCount,
            this.state.type);
        //
        this.setState({
            hudQuestionCurrent: 1,
            hudCorrectAnswers: 0,
            questions: q,
            answerOptions: q[0].distractors,
            gameOver: false,
            userAnswer: null,
            selectionId: null
        });
    }




    componentDidMount() {
        console.log('componentDidMount');
    }
    componentWillMount() {
        console.log('componentWillMount');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    /**
     * Handles action from the GameOver component
     * @param {string} action Action ID
     */
    handleNavigation(action) {
        if (action === 'replay') {
            this.restartGame();
        }
        else if (action === 'menu') {
            //
            this.props.onAction && this.props.onAction('/')
        }
    }


    handleFeedbackAction() {
        // next question
        this.nextQuestion();
    }

    /**
     * Handles action on the GameAnswer object
     * @param {number} answer User selected answer
     * @param {number} optionId key number of the clicked button
     */
    handleAnswerSelection(answer, optionId) {
        console.log("MathGame#handleAnswerSelection", answer);
        // assess answer
        let { questions, hudCorrectAnswers } = this.state,
            current = questions[0];

        if (!!current.answer) return;

        // record user answer
        current.answer = {
            user: answer,
            correct: answer === current.correct
        };
        if (current.answer.correct) hudCorrectAnswers++;
        questions[0] = current;

        //
        this.setState({
            hudCorrectAnswers,
            questions: questions,
            userAnswer: answer,
            selectionId: optionId
        });
    }

    nextQuestion() {
        let { questions, hudQuestionCurrent } = this.state,
            distractors = [],
            gameOver = false;

        // remove used question
        let answeredQuestion = questions.shift();

        // store answered question
        this.userAnswers.push(answeredQuestion);


        if (questions.length === 0) {
            //end of the game
            gameOver = true;
        } else {
            distractors = questions[0].distractors;
            hudQuestionCurrent++;
        }
        //
        this.setState({
            hudQuestionCurrent,
            questions: questions,
            answerOptions: distractors,
            gameOver,
            userAnswer: null,
            selectionId: null
        });
    }



    /**
     * Returns question (equation) fragment
     */
    getNextEquationView() {
        if (this.state.questions.length === 0) return null;
        const questions = this.state.questions;
        const current = questions[0];

        return <Equation
            operation={this.state.operation} {...current}
            userAnswer={this.state.userAnswer} />;
    }

    /**
     * Returns game fragment
     */
    gameView() {
        if (this.state.questions.length === 0) return null;
        const questions = this.state.questions;
        const current = questions[0];

        return (
            <div className='game-view'>
                <GameHud {...this.state} type={this.state.type} />
                {
                    this.getNextEquationView()
                }
                {
                    /* show feedback panel if question has user answer */
                    current.answer ? <Feedback {...current} onAction={this.handleFeedbackAction} /> : null
                }
                {
                    this.state.questions.length > 0 ?
                        <GameAnswers
                            selectionId={this.state.selectionId}
                            options={this.state.answerOptions}
                            onSelection={this.handleAnswerSelection} />
                        : null
                }
            </div>
        )
    }
    /**
     * Returns 'game over' fragment
     */
    gameOverView() {
        return (
            <GameOver {...this.state}
                userAnswers={this.userAnswers}
                onAction={this.handleNavigation} />
        )
    }



    render() {
        return (
            <div className={'game game-' + this.state.type.split(':').join('')}>
                {
                    this.state.gameOver ?
                        this.gameOverView()
                        :
                        this.gameView()
                }
            </div>
        );
    }
}

export default MathGame;