import React from 'react';
import PropTypes from 'prop-types';

class GameHistory extends React.Component {
    render = () => {
        const { games = [] } = this.props;
        return (
            <div className="game-history">
                You have played {games.length} games.
            </div>
        );
    }
}

GameHistory.propTypes = {
    games: PropTypes.array.isRequired
};

export default GameHistory;