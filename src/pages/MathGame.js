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
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import GameHud from '../components/GameHud'
import GameAnswers from '../components/GameAnswers'
import Equation from '../components/Equation'
import GameOver from '../components/GameOver'
import Feedback from '../components/Feedback'

import './MathGame.scss';
import { newGame, quitGame, answerQuestion, nextQuestion, gameOver } from '../actions/mathGameActions';

export class MathGame extends Component {

    componentDidMount() {
        this.props.newGame(this.props.config);
    }

    gameOverActionHandler = (action) => {

        const { hudQuestionCurrent, questionCount } = this.props.game;
        this.props.gameOver();
    }
    feedbackActionHandler = () => {
        this.props.nextQuestion();
    }
    gameAnswerSelectionHandler = (option, id) => {
        this.props.answerQuestion(option, id);
    }





    gameOverView = () => {
        const { hudCorrectAnswers } = this.props.game;
        return (
            <GameOver onAction={this.gameOverActionHandler}
                hudCorrectAnswers={hudCorrectAnswers} />
        )
    }
    getNextEquationView = () => {
        const { type, game } = this.props;
        const { operation, questions, hudQuestionCurrent } = game;
        const current = questions[hudQuestionCurrent - 1];
        return <Equation
            {...current}
            operation={operation} />;
    }
    gameView = () => {
        const { type, game } = this.props;
        const { hudCorrectAnswers, hudQuestionCurrent, questionCount, questions } = game;
        const current = questions[hudQuestionCurrent - 1];
        console.log('current', current);
        return (
            <div className='game-view'>
                <GameHud
                    hudCorrectAnswers={hudCorrectAnswers}
                    hudQuestionCurrent={hudQuestionCurrent}
                    questionCount={questionCount}
                    type={type} />
                {
                    this.getNextEquationView()
                }
                {
                    /* show feedback panel if question has user answer */
                    current && current.answer ?
                        <Feedback {...current}
                            onAction={this.feedbackActionHandler} /> : null
                }
                <GameAnswers
                    selectionId={current.answer ? current.answer.selectionId : null}
                    options={current.distractors}
                    onSelection={this.gameAnswerSelectionHandler} />
            </div>
        );
    }

    render() {
        const { type, game } = this.props;
        console.log(game);
        if (game.hasOwnProperty('questionCount') === false) return null;
        const { hudQuestionCurrent, questionCount } = game;
        const isGameOver = hudQuestionCurrent > questionCount;
        return (
            <div className={'game game-' + type.split(':').join('')}>
                {
                    isGameOver ? this.gameOverView() : this.gameView()
                }
            </div>
        );
    }
}

MathGame.propTypes = {
    type: PropTypes.string.isRequired,
    newGame: PropTypes.func.isRequired,
    quitGame: PropTypes.func.isRequired,
    answerQuestion: PropTypes.func.isRequired,
    nextQuestion: PropTypes.func.isRequired,
    gameOver: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => ({
    config: { ...state.config, type: props.type },
    game: { ...state.game.currentGame }
});

const mapDispatchToProps = (dispatch) => ({
    newGame: (config) => dispatch(newGame(config)),
    quitGame: () => dispatch(quitGame()),
    answerQuestion: (answer, optionId) => dispatch(answerQuestion(answer, optionId)),
    nextQuestion: () => dispatch(nextQuestion()),
    gameOver: () => dispatch(gameOver()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MathGame);