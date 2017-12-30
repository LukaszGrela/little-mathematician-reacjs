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
                    <button
                        className='addition'
                        onClick={() => {
                            this.handleClick("plus");
                        }}>
                        <span className="badge score">{this.props.stats.addition}</span>
                        <ButtonIconPlus />
                    </button>
                    <button
                        className='subtraction'
                        onClick={() => {
                            this.handleClick("minus");
                        }}>
                        <span className="badge score">{this.props.stats.subtraction}</span>
                        <ButtonIconMinus />
                    </button>
                </div>
                <div className="row">
                    <button
                        className='multiplication'
                        onClick={() => {
                            this.handleClick("multiply");
                        }}>
                        <span className="badge score">{this.props.stats.multiplication}</span>
                        <ButtonIconMultiply />
                    </button>
                    <button
                        className='division'
                        onClick={() => {
                            this.handleClick("divide");
                        }}>
                        <span className="badge score">{this.props.stats.division}</span>
                        <ButtonIconDivide />
                    </button>
                </div>
            </div>
        );
    }
}

export default Menu;