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
import { connect } from 'react-redux';

import './Config.scss'
import { changeNumberOfQuestions, ConfigType, changeRangeTo, changeRangeFrom } from '../actions/actions';

export class Config extends Component {




    handleChange = (field, value) => {
        let _val = parseInt(value, 10);
        let gFrom = this.props.config.general.from;
        let gTo = this.props.config.general.to;

        const { changeNumberOfQuestions, changeRangeFrom, changeRangeTo } = this.props;

        switch (field) {
            case 'general-qn':
                changeNumberOfQuestions(_val, ConfigType.GENERAL);
                break;
            case 'general-rf':
                if (_val >= gTo) {
                    changeRangeTo(_val + 10, ConfigType.GENERAL);
                }
                //this.setState({ general: { from: _val, to: gTo, questionCount: gCount } });
                changeRangeFrom(_val, ConfigType.GENERAL);
                break;
            case 'general-rt':
                if (_val <= gFrom) {
                    changeRangeFrom(_val - 10, ConfigType.GENERAL);
                }
                //this.setState({ general: { to: _val, from: gFrom, questionCount: gCount } });
                changeRangeTo(_val, ConfigType.GENERAL);
                break;
            default:
                break;
        }
    }


    render() {
        const { config } = this.props;
        return (
            <div className='config'>
                <form>
                    <div className='general'>
                        <label>
                            Number of questions:
                            <select
                                id='general-questions'
                                value={config.general.questionCount}
                                onChange={(e) => this.handleChange('general-qn', e.target.value)}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </label>
                        <label>
                            Number range from:
                            <select
                                id='general-range-from'
                                value={config.general.from}
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
                            <select
                                id='general-range-to'
                                value={config.general.to}
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

const mapStateToProps = (state) => ({
    config: { ...state.config }
});

const mapDispatchToProps = (dispatch) => ({
    changeNumberOfQuestions: (count, type) => dispatch(changeNumberOfQuestions(count, type)),
    changeRangeFrom: (value, type) => dispatch(changeRangeFrom(value, type)),
    changeRangeTo: (value, type) => dispatch(changeRangeTo(value, type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Config);
