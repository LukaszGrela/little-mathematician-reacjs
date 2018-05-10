import React from 'react';
import { connect } from 'react-redux';
import GameHistory from './GamesHistory';

const mapStateToProps = (state) => ({
    games: state.game.history
});

export default connect(mapStateToProps)(GameHistory);