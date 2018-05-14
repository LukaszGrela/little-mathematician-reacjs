import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import GameHistoryRow from '../components/GameHistoryRow';

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