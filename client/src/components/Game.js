import React from 'react';

const Game = props => {
    const {game} = props;

    return(
        <div className="game">
            <h1>{game.name}</h1>
            <h3>{"Released in " + game.year}</h3>
        </div>
    );
}

export default Game;