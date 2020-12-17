import React from 'react';
import GameListItem from './GameListItem';

const GameList = props => {
    const {games, clickGame, deleteGame, editGame} = props;
    return games.map(game => (
        <GameListItem
            key={game._id}
            game={game}
            clickGame={clickGame}
            deleteGame={deleteGame}
            editGame={editGame}
        />
    ));
};

export default GameList;