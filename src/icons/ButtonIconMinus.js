import React, { Component } from 'react';

class ButtonIconMinus extends Component {
    state = {}
    render() {
        return (
            <svg id="button-icon-minus" xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                viewBox="0 0 50 50">
                <path d="M45.182,1H4.817C2.633,1,1,2.639,1,4.82v40.361C1,47.361,2.633,49,4.815,49h40.367C47.363,49,49,47.361,49,45.182V4.82	C49,2.639,47.363,1,45.182,1z M34.271,27.727H15.727c-3.275,0-3.275-5.452,0-5.452h18.544C38.09,22.273,38.09,27.727,34.271,27.727z"
                />
            </svg>
        );
    }
}

export default ButtonIconMinus;