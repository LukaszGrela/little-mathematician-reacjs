import React, { Component } from 'react';

import './Equation.css'

class Equation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log('Equation#constructor', props);
    }
    render() {
        const { operandA, operandB, result, ask, operation } = this.props;
        return (
            <div className="equation">
                <div className={"part operand-a" + (ask === 'a' ? ' question' : '')}>{ask === 'a' ? '?' : operandA}</div>
                <div className={"part operation"}>{operation}</div>
                <div className={"part operand-b" + (ask === 'b' ? ' question' : '')}>{ask === 'b' ? '?' : operandB}</div>
                <div className={"part equation"}>=</div>
                <div className={"part result" + (ask === 'result' ? ' question' : '')}>{ask === 'result' ? '?' : result}</div>
            </div>
        );
    }
}

export default Equation;