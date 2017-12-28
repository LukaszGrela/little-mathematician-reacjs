import React, { Component } from 'react';

/**
 * Generate a list of questions, then present it one by one. Measure time and log mistakes.
 * Component: InputEquation, a, operation, b, result
 */

import GameHud from '../components/GameHud'
import GameAnswers from '../components/GameAnswers'
import Equation from '../components/Equation'
import GameOver from '../components/GameOver'


import { randomRange, randomOption } from "../utils/math";


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
        this.getNextEquation = this.getNextEquation.bind(this);
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


            case ':addition':
            default:
                return this.prepareQuestionsAddition(from, to, questionCount);

        }
    }

    prepareQuestionsSubtraction(from, to, questionCount) {

        // initiate the game 
        let questions = [];
        for (let index = 0; index < questionCount; index++) {
            let a = randomRange(from, to),
                b = randomRange(from, to);
            a = Math.max(a, b);
            b = Math.min(a, b);
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
                distractors: distractors,
                correct: distractors[0],
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
                distractors: distractors,
                correct: distractors[0],
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
            gameOver: false
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


    /**
     * Handles action on the GameAnswer object
     * @param {number} answer User selected answer
     */
    handleAnswerSelection(answer) {
        console.log("MathGame#handleAnswerSelection", answer);
        let questions = this.state.questions,
            distractors = [],
            hudQuestionCurrent = this.state.hudQuestionCurrent,
            hudCorrectAnswers = this.state.hudCorrectAnswers,
            gameOver = false;
        //remove used question
        let answeredQuestion = questions.shift();

        answeredQuestion.answer = {
            user: answer,
            correct: answer === answeredQuestion.correct
        };
        if (answeredQuestion.answer.correct) hudCorrectAnswers++;

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
            hudCorrectAnswers,
            questions: questions,
            answerOptions: distractors,
            gameOver
        });
    }

    /**
     * Returns question (equation) fragment
     */
    getNextEquation() {
        if (this.state.questions.length === 0) return null;
        const questions = this.state.questions;
        const current = questions[0];

        return <Equation operation={this.state.operation} {...current} />;
    }

    /**
     * Returns game fragment
     */
    gameView() {
        return (
            <div className='game-view'>
                <GameHud {...this.state} />
                {
                    this.getNextEquation()
                }
                {
                    this.state.questions.length > 0 ?
                        <GameAnswers
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
            <GameOver {...this.state} onAction={this.handleNavigation} />
        )
    }



    render() {
        return (
            <div className='game game-addition'>
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