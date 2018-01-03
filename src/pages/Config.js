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

import './Config.css'
import connect from 'react-redux/lib/connect/connect';
import { changeNumberOfQuestions,ConfigType, changeRangeTo, changeRangeFrom } from '../actions/actions';

class Config extends Component {


    constructor(props) {
        super(props);
        this.state = Object.assign({}, props);
    }



    handleChange(field, value) {
        let _val = parseInt(value, 10);
        let gCount = this.props.general.questionCount;
        let gFrom = this.props.general.from;
        let gTo = this.props.general.to;
        const { dispatch } = this.props;
        switch (field) {
            case 'general-qn':
                dispatch(changeNumberOfQuestions(_val, ConfigType.GENERAL));
                break;
            case 'general-rf':
                if (_val >= gTo) {
                    dispatch(changeRangeTo(_val + 10, ConfigType.GENERAL));
                }
                //this.setState({ general: { from: _val, to: gTo, questionCount: gCount } });
                dispatch(changeRangeFrom(_val, ConfigType.GENERAL));
                break;
            case 'general-rt':
                if (_val <= gFrom) {
                    dispatch(changeRangeFrom(_val - 10, ConfigType.GENERAL));
                }
                //this.setState({ general: { to: _val, from: gFrom, questionCount: gCount } });
                dispatch(changeRangeTo(_val, ConfigType.GENERAL));
                break;
            default:
                break;
        }
    }


    render() {
        return (
            <div className='config'>
                <form>
                    <div className='general'>
                        <label>
                            Number of questions:
                            <select value={this.props.general.questionCount}
                                onChange={(e) => this.handleChange('general-qn', e.target.value)}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </label>
                        <label>
                            Number range from:
                            <select value={this.props.general.from}
                                onChange={(e) => this.handleChange('general-rf', e.target.value)}>
                                <option value="0">0</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                            </select>
                        </label>
                        <label>
                            Number range to:
                            <select value={this.props.general.to}
                                onChange={(e) => this.handleChange('general-rt', e.target.value)}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                            </select>
                        </label>
                    </div>
                    <div className='addition'></div>
                    <div className='subtraction'></div>
                    <div className='multiplication'></div>
                    <div className='division'></div>
                </form>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    console.log('Config#mapStateToProps', state);
    const config = Object.assign({}, state.config);
    return config;
}

export default connect(mapStateToProps)(Config);