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

class LogoIcon extends Component {
    state = {}
    render() {
        return (
            <svg id="logo-icon" xmlns="http://www.w3.org/2000/svg"
                viewBox="-50 -50 150 150">
                <g>
                    <path d="M89.975-45h-53.13c-2.872,0-5.021,2.199-5.021,5.13v54.242c0,2.199,2.149,5.13,5.021,5.13h53.13 c2.873,0,5.025-2.931,5.025-5.13V-39.87C95-42.801,92.848-45,89.975-45z M69.151-27.408c0,8.063-11.483,8.063-11.483,0 S69.151-35.471,69.151-27.408z M57.668,1.912c0-8.063,11.483-8.063,11.483,0S57.668,9.975,57.668,1.912z M75.612-9.084H51.207 c-4.312,0-4.312-7.33,0-7.33h24.405C80.641-16.414,80.641-9.084,75.612-9.084z"
                    />
                    <path d="M13.154-45h-53.129C-42.846-45-45-42.801-45-39.87v54.242c0,2.199,2.154,5.13,5.025,5.13h53.129 c2.154,0,5.025-2.931,5.025-5.13V-39.87C18.179-42.801,15.308-45,13.154-45z M5.974,1.912c3.591,3.664-1.436,8.794-5.025,5.13 L-13.41-7.618l-15.077,14.66c-2.873,3.664-7.897-1.466-5.025-5.13l15.077-14.66l-15.077-15.393 c-2.873-2.933,2.152-8.063,5.025-5.132L-13.41-17.88L0.949-33.273c3.589-2.931,8.616,2.2,5.025,5.132L-8.385-12.748L5.974,1.912z"
                    />
                    <path d="M89.975,30.496h-53.13c-2.872,0-5.021,2.201-5.021,5.134v54.239c0,2.93,2.149,5.131,5.021,5.131h53.13 C92.848,95,95,92.799,95,89.869V35.63C95,32.697,92.848,30.496,89.975,30.496z M75.612,66.412H51.207c-4.312,0-4.312-7.328,0-7.328 h24.405C80.641,59.084,80.641,66.412,75.612,66.412z"
                    />
                    <path d="M13.154,30.496h-53.129c-2.871,0-5.025,2.201-5.025,5.134v54.239c0,2.93,2.154,5.131,5.025,5.131h53.129 c2.154,0,5.025-2.201,5.025-5.131V35.63C18.179,32.697,15.308,30.496,13.154,30.496z M4.538,66.412H-9.821v14.663 c0,5.127-7.18,5.127-7.18,0V66.412h-15.077c-4.307,0-4.307-7.328,0-7.328H-17V43.689c0-4.396,7.18-4.396,7.18,0v15.395H4.538 C9.565,59.084,9.565,66.412,4.538,66.412z"
                    />
                </g>
            </svg>
        );
    }
}

export default LogoIcon;