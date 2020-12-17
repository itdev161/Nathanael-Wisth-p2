import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import './styles.css';

const EditGame = ({game, onGameUpdated}) => {
    let history = useHistory();
    const[gameData, setGameData] = useState({
        name: game.name,
        year: game.year
    });
    const{name, year} = gameData;

    const onChange = e => {
        const {name, value} = e.target;

        setGameData({
            ...gameData,
            [name]: value
        });
    };

    const update = async () => {
        if(!name || !year){
            console.log('Name and year are required');
        }else{
            const newGame = {
                name: name,
                year: year
            };

            try{
                const config={
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                const body = JSON.stringify(newGame);
                const res = await axios.put(
                    `http://localhost:5000/api/games/${game._id}`,
                    body,
                    config
                );

                onGameUpdated(res.data);
                history.push('/');
            }catch(error){
                console.error(`Error creating post: ${error.response.data}`);
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Edit Game</h2>
            <input 
                name="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => onChange(e)}
            />
            <input 
                name="year"
                type="number"
                placeholder="Release Year"
                value={year}
                onChange={e => onChange(e)}
            />
            <button onClick={() => update()}>Submit</button>
        </div>
    );
};

export default EditGame;