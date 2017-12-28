import React, { Component } from 'react';

import './GameHud.css'

class GameHud extends Component {
    state = {}
    render() {
        return (
            <div className='game-hud'>
                <div className='container'>
                    <div className='question-counter'>{this.props.hudQuestionCurrent} / {this.props.questionCount}</div>
                    <div className='correct-answers'>{this.props.hudCorrectAnswers}</div>
                    <div className='timer'></div>
                </div>
            </div>
        );
    }
}

export default GameHud;