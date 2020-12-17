import React from 'react';
import {useHistory} from 'react-router-dom';
import slugify from 'slugify';
import './styles.css';

const GameListItem = props => {
    const {game, clickGame, deleteGame, editGame} = props;
    const history = useHistory();

    const handleClickGame = game => {
        const slug = slugify(game.name, {lower: true});

        clickGame(game);
        history.push(`/games/${slug}`);
    };

    const handleEditGame = game => {
        editGame(game);
        history.push(`/edit/${game._id}`);
    };

    return(
        <div className="gameListItem">
            <div onClick={() => handleClickGame(game)}>
                <h2>{game.name}</h2>
                <p>{game.year}</p>
            </div>
            <div className="gameControls">
                <button onClick={() => deleteGame(game)}>Delete</button>
                <button onClick={() => handleEditGame(game)}>Edit</button>
            </div>
        </div>
    );
};

export default GameListItem;