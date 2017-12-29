import React, { Component } from 'react';
import MoodIcon from '../icons/MoodIcon';

import './Feedback.css'
import ButtonIconNext from '../icons/ButtonIconNext';

class Feedback extends Component {
    state = {}
    render() {
        const { answer, correct } = this.props;
        return (
            <div className={'feedback' + (answer.correct ? ' correct' : ' incorrect')}>
                <MoodIcon isGood={answer.correct} />
                <div className='message'>
                    {
                        answer.correct ?
                            'Well done!'
                            :
                            'Not so, correct answer is ' + correct
                    }
                </div>
                <button onClick={() => {
                    this.props.onAction && this.props.onAction();
                }}><ButtonIconNext /></button>
            </div>
        );
    }
}

export default Feedback;