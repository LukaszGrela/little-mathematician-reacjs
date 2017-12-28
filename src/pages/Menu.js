import React, { Component } from 'react';

import './Menu.css'

class Menu extends Component {
    state = {}
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(action) {
        this.props.onAction && this.props.onAction(action);
    }


    render() {
        return (
            <div className="menu">
                <div className="row">
                    <button onClick={() => {
                        this.handleClick("plus");
                    }}>
                        <img src='./assets/button-icons-plus.svg' />
                    </button>
                    <button onClick={() => {
                        this.handleClick("minus");
                    }}>
                        <img src='./assets/button-icons-minus.svg' />
                    </button>
                </div>
                <div className="row">
                    <button onClick={() => {
                        this.handleClick("multiply");
                    }}>
                        <img src='./assets/button-icons-multiply.svg' />
                    </button>
                    <button onClick={() => {
                        this.handleClick("divide");
                    }}>
                        <img src='./assets/button-icons-divide.svg' />
                    </button>
                </div>
            </div>
        );
    }
}

export default Menu;