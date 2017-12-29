import React, { Component } from 'react';

import './Equation.css'

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
                <div className={"part operand-a" + (ask === 'a' ? ' question' : '')}>{ask === 'a' ? userAnswer : operandA}</div>
                <div className={"part operation"}>{operation}</div>
                <div className={"part operand-b" + (ask === 'b' ? ' question' : '')}>{ask === 'b' ? userAnswer : operandB}</div>
                <div className={"part equation"}>=</div>
                <div className={"part result" + (ask === 'result' ? ' question' : '')}>{ask === 'result' ? userAnswer : result}</div>
            </div>
        );
    }
}

export default Equation;