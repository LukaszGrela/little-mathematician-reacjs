import React, { Component } from 'react';

import './Menu.css'
import ButtonIconPlus from '../icons/ButtonIconPlus';
import ButtonIconMinus from '../icons/ButtonIconMinus';
import ButtonIconMultiply from '../icons/ButtonIconMultiply';
import ButtonIconDivide from '../icons/ButtonIconDivide';

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
                        <ButtonIconPlus />
                    </button>
                    <button onClick={() => {
                        this.handleClick("minus");
                    }}>
                        <ButtonIconMinus />
                    </button>
                </div>
                <div className="row">
                    <button onClick={() => {
                        this.handleClick("multiply");
                    }}>
                        <ButtonIconMultiply />
                    </button>
                    <button onClick={() => {
                        this.handleClick("divide");
                    }}>
                        <ButtonIconDivide />
                    </button>
                </div>
            </div>
        );
    }
}

export default Menu;