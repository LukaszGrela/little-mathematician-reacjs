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

import IconGrade from '../icons/IconGrade';

import './GameHud.css'

class GameHud extends Component {
    state = {
        scored: false
    }

    componentWillReceiveProps(nextProps) {

        //if (nextProps.hudCorrectAnswers !== this.props.hudCorrectAnswers) {
        //}
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

    render() {
        return (
            <div className={'game-hud '
                + this.props.type.split(':').join('')
                + (this.props.hudCorrectAnswers > 0 ?
                    ' gain-' + (this.props.hudCorrectAnswers % 2 ? 'even' : 'odd')
                    :''
                )
            }>
                <div className='container'>
                    <div className='question-counter'>{this.props.hudQuestionCurrent} / {this.props.questionCount}</div>
                    <div className='correct-answers'>
                        <IconGrade className='icon-grade' />
                        <span className='label'>{this.props.hudCorrectAnswers}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameHud;