import React from 'react';
import PropTypes from 'prop-types';
import { GAME_ADDITION, GAME_DIVISION, GAME_SUBTRACTION, GAME_MULTIPLICATION } from '../gameTypes';
import ButtonIconPlus from '../icons/ButtonIconPlus';
import ButtonIconMinus from '../icons/ButtonIconMinus';
import ButtonIconMultiply from '../icons/ButtonIconMultiply';
import ButtonIconDivide from '../icons/ButtonIconDivide';

const GameTypeIcon = ({ type, className }) => {
    console.log(`GameTypeIcon ${type}, ${className}`);
    switch (type) {
        case GAME_MULTIPLICATION:
            return <ButtonIconMultiply className={className}/>;
        case GAME_DIVISION:
            return <ButtonIconDivide className={className} />;
        case GAME_SUBTRACTION:
            return <ButtonIconMinus className={className} />;
        case GAME_ADDITION:
        default:
            return <ButtonIconPlus className={className} />;
    }
};

GameTypeIcon.defaultProps = {
    className: undefined
};
GameTypeIcon.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default GameTypeIcon;