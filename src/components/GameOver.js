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

import './GameOver.css'
import IconReplay from '../icons/IconReplay';
import IconMenu from '../icons/IconMenu';

class GameOver extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(action) {
        this.props.onAction && this.props.onAction(action);
    }
    render() {
        return (
            <div className='game-over'>
                <div className='title'><span className='p1'>Game </span><span className='p2'>Over</span><span className='p3'>!</span></div>
                <div className='content'>You have resolved {this.props.hudCorrectAnswers} equation{this.props.hudCorrectAnswers === 1 ? '' : 's'} correctly.</div>
                <div className='footer'>
                    <button
                        className='replay-button'
                        onClick={() => {
                            this.handleClick('replay')
                        }}><IconReplay /></button>
                    <button
                        className='menu-button'
                        onClick={() => {
                            this.handleClick('menu')
                        }}><IconMenu /></button>
                </div>
            </div>
        );
    }
}

export default GameOver;