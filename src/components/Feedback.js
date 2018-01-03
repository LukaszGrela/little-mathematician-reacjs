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
                            ['Not so, correct answer is ',<span key='correct-span' className='correct-answer'>{correct}</span>]
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
