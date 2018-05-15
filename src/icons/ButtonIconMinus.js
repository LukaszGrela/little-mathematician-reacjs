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

const ButtonIconMinus = ({ className }) => (
  <svg
    className={className}
    id="button-icon-minus"
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 50 50"
  >
    <path d="M45.182,1H4.817C2.633,1,1,2.639,1,4.82v40.361C1,47.361,2.633,49,4.815,49h40.367C47.363,49,49,47.361,49,45.182V4.82	C49,2.639,47.363,1,45.182,1z M34.271,27.727H15.727c-3.275,0-3.275-5.452,0-5.452h18.544C38.09,22.273,38.09,27.727,34.271,27.727z" />
  </svg>
);
ButtonIconMinus.defaultProps = {
  className: undefined
};
ButtonIconMinus.propTypes = {
  className: PropTypes.string
};
export default ButtonIconMinus;
