import React from 'react';
import PropTypes from 'prop-types';
import GameTypeIcon from './GameTypeIcon';

const GameHistoryRow = ({ type, correctAnswers, duration, questionCount }) => (
    <li>
        <GameTypeIcon className={"game-type-icon"} type={type} />
        <span className="score">{`${correctAnswers}/${questionCount} correct answers.`}</span>
        <span className="duration">{`It took you ${duration} to finish.`}</span>
    </li>
);

GameHistoryRow.propTypes = {
    type: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    correctAnswers: PropTypes.number.isRequired,
    questionCount: PropTypes.number.isRequired,
};

export default GameHistoryRow;