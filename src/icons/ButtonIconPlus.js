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

const ButtonIconPlus = ({ className }) => (
  <svg
    className={className}
    id="button-icon-plus"
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 50 50"
  >
    <path d="M45.184,1H4.818C2.637,1,1,2.638,1,4.82v40.362C1,47.361,2.637,49,4.818,49h40.366C46.818,49,49,47.361,49,45.182V4.82	C49,2.638,46.818,1,45.184,1z M38.637,27.727H27.729v10.912c0,3.814-5.456,3.814-5.456,0V27.727H10.818	c-3.272,0-3.272-5.453,0-5.453h11.454V10.818c0-3.271,5.455-3.271,5.455,0v11.456h10.91C42.456,22.273,42.456,27.727,38.637,27.727z" />
  </svg>
);
ButtonIconPlus.defaultProps = {
  className: undefined
};
ButtonIconPlus.propTypes = {
  className: PropTypes.string
};

export default ButtonIconPlus;
