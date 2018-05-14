import React from 'react';
import PropTypes from 'prop-types';
import { GAME_ADDITION, GAME_DIVISION, GAME_SUBTRACTION, GAME_MULTIPLICATION } from '../gameTypes';
import ButtonIconPlus from '../icons/ButtonIconPlus';
import ButtonIconMinus from '../icons/ButtonIconMinus';
import ButtonIconMultiply from '../icons/ButtonIconMultiply';
import ButtonIconDivide from '../icons/ButtonIconDivide';

const GameTypeIcon = ({ type }) => {
    switch (type) {
        case GAME_MULTIPLICATION:
            return <ButtonIconMultiply />;
        case GAME_DIVISION:
            return <ButtonIconDivide />;
        case GAME_SUBTRACTION:
            return <ButtonIconMinus />;
        case GAME_ADDITION:
        default:
            return <ButtonIconPlus />;
    }
};

GameTypeIcon.propTypes = {
    type: PropTypes.string.isRequired
};

export default GameTypeIcon;