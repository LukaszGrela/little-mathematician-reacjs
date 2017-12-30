import React, { Component } from 'react';

import './Footer.css'

class Footer extends Component {
    state = {
        currentYear: (new Date()).getFullYear()
    }
    render() {
        return (
            <footer>GrelaDesign (c) {this.state.currentYear}</footer>
        );
    }
}

export default Footer;