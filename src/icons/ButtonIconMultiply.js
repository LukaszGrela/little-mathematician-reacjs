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

class ButtonIconMultiply extends Component {
    state = {}
    render() {
        return (
            <svg id="button-icon-multiply" xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                viewBox="0 0 50 50">
                <path d="M45.182,1H4.82C2.637,1,1,2.637,1,4.818v40.366C1,46.82,2.637,49,4.819,49h40.363C46.818,49,49,46.818,49,45.184V4.818	C49,2.637,46.818,1,45.182,1z M39.729,35.909c2.729,2.727-1.092,6.545-3.818,3.817L25,28.818L13.546,39.727	c-2.183,2.728-6.001-1.092-3.817-3.817L21.182,25L9.729,13.545c-2.184-2.182,1.636-6,3.817-3.819L25,21.182L35.91,9.727	c2.727-2.182,6.545,1.637,3.816,3.819L28.818,25L39.729,35.909z"
                />
            </svg>
        );
    }
}

export default ButtonIconMultiply;