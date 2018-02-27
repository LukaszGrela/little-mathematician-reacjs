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

import './Equation.scss'

class Equation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log('Equation#constructor', props);
    }
    render() {
        const { operandA, operandB, result, ask, operation, answer } = this.props;
        let userAnswer = answer ? answer.user : '?';
        return (
            <div className={"equation " + (
                answer ? (
                    answer.correct ? 'correct' : 'incorrect'
                ) : ''
            )}>
                <div className={'wrapper'}>
                    <div className={"part operand-a" + (ask === 'a' ? ' question' : '')}>{ask === 'a' ? userAnswer : operandA}</div>
                    <div className={"part operation"}>{operation}</div>
                    <div className={"part operand-b" + (ask === 'b' ? ' question' : '')}>{ask === 'b' ? userAnswer : operandB}</div>
                    <div className={"part equation"}>=</div>
                    <div className={"part result" + (ask === 'result' ? ' question' : '')}>{ask === 'result' ? userAnswer : result}</div>
                </div>
            </div>
        );
    }
}

export default Equation;
