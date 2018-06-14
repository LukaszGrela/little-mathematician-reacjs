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

import './About.scss'
import GitHubIcon from '../icons/GitHubIcon';

class About extends Component {
    state = {}
    render() {
        return (
            <div className='about'>
                <div className='title'>Little Mathematician</div>
                <div className='content'>
                    Simple Maths game for children made in ReactJS with aim to explore this framework.
                </div>
                <div className='git-source'>
                    <GitHubIcon/><a href="https://github.com/LukaszGrela/little-mathematician-reacjs" 
                    target='_blank' 
                    rel="noopener noreferrer">LukaszGrela/little-mathematician-reacjs</a>
                </div>
                <div className='acknowledgement'>
                    <ul>
                        <li>Icons in menu (and logo) by Leona Grande from the Noun Project, thenounproject.com/</li>
                        <li>Other icons came from material ui icons, www.materialui.co/</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default About;
