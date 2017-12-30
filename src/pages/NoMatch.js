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