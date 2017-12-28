import React, { Component } from 'react';

import './GameAnswers.css'

class GameAnswers extends Component {
    state = {}
    constructor(props) {
        super(props);
        console.log("GameAnswers", props);
    }

    shuffle(array) {
        let m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }

    generateAnswers() {
        let i = 0;
        let options = this.props.options;

        options = this.shuffle(options);

        return options.map((option) => <button className="answer"
            key={i++}
            onClick={() => {
                this.props.onSelection && this.props.onSelection(option);
            }}>{option}</button>);
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