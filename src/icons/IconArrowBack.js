import React, { Component } from 'react';

class IconArrowBack extends Component {
    state = {}
    render() {
        return (
            <svg id='arrow-back' xmlns="http://www.w3.org/2000/svg"
                width="18" height="18"
                viewBox="0 0 18 18">
                <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" />
            </svg>
        );
    }
}

export default IconArrowBack;