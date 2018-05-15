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

import IconGrade from '../icons/IconGrade';

import './GameHud.scss'

class GameHud extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.type !== this.props.type) return true;
        if (nextProps.hudQuestionCurrent !== this.props.hudQuestionCurrent) return true;
        if (nextProps.hudCorrectAnswers !== this.props.hudCorrectAnswers) return true;
        if (nextProps.questionCount !== this.props.questionCount) return true;

        return false;
    }
    render() {
        const { type, hudQuestionCurrent, hudCorrectAnswers, questionCount } = this.props;
        return (
            <div className={'game-hud '
                + type.split(':').join('')
                + (hudCorrectAnswers > 0 ?
                    ' gain-' + (hudCorrectAnswers % 2 === 0 ? 'even' : 'odd')
                    : ''
                )
            }>
                <div className='container'>
                    <div className='question-counter'>{hudQuestionCurrent} / {questionCount}</div>
                    <div className='correct-answers'>
                        <IconGrade className='icon-grade' />
                        <span className='label'>{hudCorrectAnswers}</span>
                    </div>
                </div>
            </div>
        );
    }
}

GameHud.propTypes = {
    type: PropTypes.string.isRequired,
    hudQuestionCurrent: PropTypes.number.isRequired,
    hudCorrectAnswers: PropTypes.number.isRequired,
    questionCount: PropTypes.number.isRequired,
}

export default GameHud;
