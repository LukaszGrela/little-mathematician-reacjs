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

import './GameAnswers.css'

class GameAnswers extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        console.log("GameAnswers", props);
    }






    generateAnswers() {
        let i = 0;
        const options = this.props.options;

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
            <div className={"game-answers" + (this.props.selectionId  ? ' locked':'')}>
                <hr />
                {
                    this.generateAnswers()
                }
            </div>
        );
    }
}

export default GameAnswers;
