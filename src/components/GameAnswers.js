import React, { Component } from 'react';

import './GameAnswers.css'

class GameAnswers extends Component {
    answered = false;
    constructor(props) {
        super(props);
        this.state = {};
        console.log("GameAnswers", props);
    }



    shouldComponentUpdate(nextProps, nextState) {

        // do not render when options hasn't changed
        if (nextProps.options && this.compare(nextProps.options, this.props.options)) return false;

        return true;
    }

    compare(arrA, arrB) {
        if (!arrA || !arrB) return false;

        if (arrA.length !== arrB.length) return false;

        for (let index = 0; index < arrA.length; index++) {
            const elementA = arrA[index];
            if (elementA !== arrB[index]) return false;
        }

        return true;
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

        this.answered = false;
        return options.map((option) => <button className="answer"
            key={i++}
            onClick={(e) => {
                if (this.answered) return;
                const button = e.target;
                if (button.className.indexOf('hidden') === -1)
                    button.className += ' hidden';

                this.props.onSelection && this.props.onSelection(option, i);
                this.answered = true;
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