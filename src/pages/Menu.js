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