import React from 'react';
import PropTypes from 'prop-types';

const GameHistoryRow = ({ type, correctAnswers, duration, questionCount }) => (
    <li>{`Game ${type}, ${correctAnswers}/${questionCount} correct answers. It took you ${duration} to finish.`}</li>
);

GameHistoryRow.propTypes = {
    type: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    correctAnswers: PropTypes.number.isRequired,
    questionCount: PropTypes.number.isRequired,
};

export default GameHistoryRow;