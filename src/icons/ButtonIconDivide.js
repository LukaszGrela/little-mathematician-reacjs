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

import React from "react";
import PropTypes from "prop-types";

const ButtonIconDivide = ({ className }) => (
  <svg
    className={className}
    id="button-icon-divide"
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 50 50"
  >
    <path d="M45.182,1H4.817C2.633,1,1,2.637,1,4.818v40.366C1,46.82,2.633,49,4.816,49h40.366C47.365,49,49,46.818,49,45.184V4.818	C49,2.637,47.365,1,45.182,1z M29.361,14.091c0,6-8.726,6-8.726,0C20.636,8.091,29.361,8.091,29.361,14.091z M20.636,35.909	c0-5.999,8.727-5.999,8.727,0C29.361,41.91,20.636,41.91,20.636,35.909z M34.271,27.729H15.727c-3.275,0-3.275-5.456,0-5.456h18.544	C38.09,22.272,38.09,27.729,34.271,27.729z" />
  </svg>
);
ButtonIconDivide.defaultProps = {
  className: undefined
};
ButtonIconDivide.propTypes = {
  className: PropTypes.string
};

export default ButtonIconDivide;
