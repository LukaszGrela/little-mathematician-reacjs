import React, { Component } from 'react';

import './Config.css'

class Config extends Component {
    state = {}
    render() {
        return (
            <div className='config'>
                <form>
                    <div className='general'>

                    </div>
                    <div className='addition'></div>
                    <div className='subtraction'></div>
                    <div className='multiplication'></div>
                    <div className='division'></div>
                </form>
            </div>
        );
    }
}

export default Config;