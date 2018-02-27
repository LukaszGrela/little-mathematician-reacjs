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

import './Menu.scss'
import ButtonIconPlus from '../icons/ButtonIconPlus';
import ButtonIconMinus from '../icons/ButtonIconMinus';
import ButtonIconMultiply from '../icons/ButtonIconMultiply';
import ButtonIconDivide from '../icons/ButtonIconDivide';
import { connect } from 'react-redux';

class Menu extends Component {
    state = {};
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(action) {
        this.props.onAction && this.props.onAction(action);
    }


    componentWillMount() {
        console.log('Menu#componentWillMount', this.props);
    }

    componentWillUnmount() {
        console.log('Menu#componentWillUnmount');
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

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state);
    return {
        stats: {
            division: state.score.divScore,
            multiplication: state.score.mulScore,
            subtraction: state.score.subScore,
            addition: state.score.addScore,
        }
    }
}

export default connect(mapStateToProps)(Menu);
