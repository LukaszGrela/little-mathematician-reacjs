import React, { Component } from 'react';

import './NoMatch.css'

class NoMatch extends Component {
    state = {}
    render() {
        return (
            <div className='no-match-404'>
                <div className='title'>
                    <span className='digit d1'>4</span>
                    <span className='sign'> - </span>
                    <span className='digit d2'>0</span>
                    <span className='sign'> = </span>
                    <span className='digit d3'>4</span>
                </div>

                <div className='content'>Sorry, we can't find result you were counting on...</div>
            </div>
        );
    }
}

export default NoMatch;