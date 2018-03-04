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
import { newGame, quitGame } from '../actions/mathGameActions';

export class MathGame extends Component {

    componentDidMount() {
        this.props.newGame(this.props.config);
    }

    render() {
        const { type } = this.props;
        return (
            <div className={'game game-' + type.split(':').join('')}>

            </div>
        );
    }
}

MathGame.propTypes = {
    type: PropTypes.string.isRequired,
    newGame: PropTypes.func.isRequired,
    quitGame: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => ({
    config: { ...state.config, type: props.type },
    game: { ...state.currentGame }
});

const mapDispatchToProps = (dispatch) => ({
    newGame: (config) => dispatch(newGame(config)),
    quitGame: () => dispatch(quitGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MathGame);