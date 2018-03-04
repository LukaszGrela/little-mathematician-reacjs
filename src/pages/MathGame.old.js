/*
   Copyright 2018 Łukasz 'Severiaan' Grela GrelaDesign

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

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


import './MathGame.scss'
import connect from 'react-redux/lib/connect/connect';
import { increaseScoreOfGame } from '../actions/actions';
import { GAME_ADDITION, GAME_DIVISION, GAME_MULTIPLICATION, GAME_SUBTRACTION } from '../gameTypes';

export class MathGameOld extends Component {

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
            this.props.onAction && this.props.onAction('/');
            
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
        let { questions, hudQuestionCurrent, hudCorrectAnswers } = this.state,
            distractors = [],
            gameOver = false,
            { dispatch } = this.props;

        // remove used question
        let answeredQuestion = questions.shift();

        // store answered question
        this.userAnswers.push(answeredQuestion);


        if (questions.length === 0) {
            //end of the game
            gameOver = true;
            // send score
            dispatch(increaseScoreOfGame(hudCorrectAnswers, this.state.type));
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



}

