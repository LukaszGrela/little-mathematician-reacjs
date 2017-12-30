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