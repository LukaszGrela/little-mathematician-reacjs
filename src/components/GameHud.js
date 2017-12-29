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