import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import GameHistoryRow from '../components/GameHistoryRow';

const dummy = {
    "questionCount": 10, "from": 0, "to": 10, "type": ":addition",
    "history": [
        {"id": 0, "operandA": 2, "operandB": 0, "result": 2, "ask": "a", "correct": 2, "distractors": [5, 2, -3, 8], "operation": "+", "answer": { "user": 2, "correct": true, "selectionId": 2 } },
        {"id": 1, "operandA": 3, "operandB": 0, "result": 3, "ask": "b", "correct": 0, "distractors": [3, 0, -1, 6], "operation": "+", "answer": { "user": 0, "correct": true, "selectionId": 2 }}, 
        { "id": 2, "operandA": 9, "operandB": 3, "result": 12, "ask": "a", "correct": 9, "distractors": [16, 9, 3, 11], "operation": "+", "answer": { "user": 3, "correct": false, "selectionId": 3 } },
        { "id": 3, "operandA": 9, "operandB": 9, "result": 18, "ask": "a", "correct": 9, "distractors": [14, 12, 9, 2], "operation": "+", "answer": { "user": 9, "correct": true, "selectionId": 3 } }, 
        { "id": 4, "operandA": 1, "operandB": 7, "result": 8, "ask": "result", "correct": 8, "distractors": [6, 10, 8, 13], "operation": "+", "answer": { "user": 8, "correct": true, "selectionId": 3 } }, 
        { "id": 5, "operandA": 10, "operandB": 8, "result": 18, "ask": "a", "correct": 10, "distractors": [3, 14, 11, 10], "operation": "+", "answer": { "user": 10, "correct": true, "selectionId": 4 } }, 
        { "id": 6, "operandA": 7, "operandB": 5, "result": 12, "ask": "a", "correct": 7, "distractors": [10, 14, 2, 7], "operation": "+", "answer": { "user": 2, "correct": false, "selectionId": 3 } }, 
        { "id": 7, "operandA": 9, "operandB": 8, "result": 17, "ask": "b", "correct": 8, "distractors": [8, 12, 11, 5], "operation": "+", "answer": { "user": 11, "correct": false, "selectionId": 3 } }, 
        { "id": 8, "operandA": 2, "operandB": 1, "result": 3, "ask": "result", "correct": 3, "distractors": [6, 3, 8, 2], "operation": "+", "answer": { "user": 3, "correct": true, "selectionId": 2 } }, 
        { "id": 9, "operandA": 9, "operandB": 4, "result": 13, "ask": "b", "correct": 4, "distractors": [6, 8, 1, 4], "operation": "+", "answer": { "user": 4, "correct": true, "selectionId": 4 } }],
    "hudQuestionCurrent": 11,
    "hudCorrectAnswers": 7,
    "questions": [],
    "operation": "+",
    "started": 1526366278291,
    "finished": 1526366381458
};

class GameHistory extends React.Component {
    duration = (started, finished) => {
        const elapsed = moment.duration(moment(finished).diff(started));
        if (elapsed.seconds() < 120) {
            return `${elapsed.seconds()} s`;
        }
        return `${elapsed.minutes()} m`
    }
    renderHistoryRow = (game) => {
        const { started, finished, hudCorrectAnswers } = game;
        console.log(game);
        return <GameHistoryRow key={game.finished}
            type={game.type}
            duration={this.duration(started, finished)}
            correctAnswers={game.hudCorrectAnswers}
            questionCount={game.questionCount} />
    }
    render = () => {
        const { games = [] } = this.props;
        console.log('render', games);
        if(games.length===0) games.push(dummy);
        return (
            <div className="game-history">
                <ul>
                    {
                        games.map(this.renderHistoryRow)
                    }
                </ul>
            </div>
        );
    }
}

GameHistory.propTypes = {
    games: PropTypes.array.isRequired
};

export default GameHistory;