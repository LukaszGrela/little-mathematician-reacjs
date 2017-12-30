import React, { Component } from 'react';

import './About.css'

class About extends Component {
    state = {  }
    render() {
        return (
            <div className='about'>
                Simple Math game made in ReactJS.
                Icons in menu (and logo) by Leona Grande from the Noun Project.
                Other icons from material ui icons, www.materialui.co/
            </div>
        );
    }
}

export default About;