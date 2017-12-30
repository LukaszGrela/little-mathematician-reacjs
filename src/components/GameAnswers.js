import React, { Component } from 'react';

import './GameAnswers.css'

class GameAnswers extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        console.log("GameAnswers", props);
    }






    generateAnswers() {
        let i = 0;
        let options = this.props.options;

        return options.map((option) => {
            let id = ++i;
            let button = <button
                className={'answer option-' + id + (this.props.selectionId && this.props.selectionId === id ? ' hidden' : '')}
                key={id}
                onClick={(e) => {
                    this.props.onSelection && this.props.onSelection(option, id);
                }}>{option}</button>;

            return button;
        });
    }

    render() {
        return (
            <div className="game-answers">
                <hr />
                {
                    this.generateAnswers()
                }
            </div>
        );
    }
}

export default GameAnswers;