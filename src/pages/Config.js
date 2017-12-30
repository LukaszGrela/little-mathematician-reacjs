import React, { Component } from 'react';

import './Config.css'

class Config extends Component {


    constructor(props) {
        super(props);
        this.state = Object.assign({}, props);
        /*{
            general: {
                questionCount: 10,
                from: 0,
                to: 10
            }
        };*/
    }

    getSettings() {
        return Object.assign({}, this.state);
    }



    handleChange(field, value) {
        let _val = parseInt(value, 10);
        let gCount = this.state.general.questionCount;
        let gFrom = this.state.general.from;
        let gTo = this.state.general.to;
        switch (field) {
            case 'general-qn':
                this.setState({ general: { questionCount: _val, from:gFrom, to:gTo } });
                break;
            case 'general-rf':
                if (_val >= gTo) {
                    gTo = _val + 10;
                }
                this.setState({ general: { from: _val, to:gTo, questionCount:gCount } });
                break;
            case 'general-rt':
                if (_val <= gFrom) {
                    gFrom = _val - 10;
                }
                this.setState({ general: { to: _val, from:gFrom, questionCount:gCount } });
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
                            <select value={this.state.general.questionCount}
                                onChange={(e) => this.handleChange('general-qn', e.target.value)}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </label>
                        <label>
                            Number range from:
                            <select value={this.state.general.from}
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
                            <select value={this.state.general.to}
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

export default Config;