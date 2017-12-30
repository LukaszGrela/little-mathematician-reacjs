import React, { Component } from 'react';

import './About.css'

class About extends Component {
    state = {}
    render() {
        return (
            <div className='about'>
                <div className='title'>Little Mathematician</div>
                <div className='content'>
                    Simple Math game for children made in ReactJS to learn this framework.
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