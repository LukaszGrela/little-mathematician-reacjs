import React from 'react';
import PropTypes from 'prop-types';
import GameTypeIcon from './GameTypeIcon';

const GameHistoryRow = ({ type, correctAnswers, duration, questionCount }) => (
    <li><GameTypeIcon type={type} /><span>{ `${correctAnswers}/${questionCount} correct answers. It took you ${duration} to finish.`}</span></li>
);

GameHistoryRow.propTypes = {
    type: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    correctAnswers: PropTypes.number.isRequired,
    questionCount: PropTypes.number.isRequired,
};

export default GameHistoryRow;