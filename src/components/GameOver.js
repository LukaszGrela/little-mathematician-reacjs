import React, { Component } from 'react';

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
                <div className='header'>Game Over!</div>
                <div className='content'>You have resolved {this.props.hudCorrectAnswers} equation{this.props.hudCorrectAnswers === 1 ? '' : 's'} correctly.</div>
                <div className='footer'>
                    <button onClick={() => {
                        this.handleClick('replay')
                    }}>Replay</button>
                    <button onClick={() => {
                        this.handleClick('menu')
                    }}>Menu</button>
                </div>
            </div>
        );
    }
}

export default GameOver;