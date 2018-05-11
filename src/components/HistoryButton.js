import React from 'react';
import { connect } from 'react-redux';
import MenuButton from './MenuButton';

const mapStateToProps = (state, props) => {
    const { game } = state;
    const { history = [] } = game;
    return {
        disabled: history.length === 0
    };
}

export default connect(mapStateToProps)(MenuButton);