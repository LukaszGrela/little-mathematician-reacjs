import React, { Component } from 'react';

export class IconMore extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg"
                width="36" height="36"
                viewBox="0 0 36 36">
                <path d="M18 12c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 3c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            /*
            <svg xmlns="http://www.w3.org/2000/svg"
                width="18" height="18"
                viewBox="0 0 18 18">
                <path d="M9 5.5c.83 0 1.5-.67 1.5-1.5S9.83 2.5 9 2.5 7.5 3.17 7.5 4 8.17 5.5 9 5.5zm0 2c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S9.83 7.5 9 7.5zm0 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
            </svg>
            */
        )
    }
}

export default IconMore;