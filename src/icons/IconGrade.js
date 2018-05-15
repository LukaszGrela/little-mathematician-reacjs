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
import PropTypes from 'prop-types';

class IconGrade extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.className !== this.props.className;
    }
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg"
                className={this.props.className}
                id='icon-grade'
                width="24" height="24"
                viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
        );
    }
}
IconGrade.propTypes = {
    className: PropTypes.string.isRequired
};
export default IconGrade;