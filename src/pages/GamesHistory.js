import React from 'react';
import PropTypes from 'prop-types';

class GameHistory extends React.Component {
    render = () => {
        const { games = [] } = this.props;
        return (
            <div className="game-history">
                <ul>
                    {
                        games.map(game => <li key={game.finished}>{`Game ${game.type}, ${game.hudCorrectAnswers}/${game.questionCount} correct answers.`}</li>)
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