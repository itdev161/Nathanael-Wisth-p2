import axios from 'axios';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './styles.css'

const CreateGame = ({onGameCreated}) => {
    let history = useHistory();
    const [gameData, setGameData] = useState({
        name: '',
        year: 0
    });
    const {name, year} = gameData;

    const onChange = e => {
        const {name, value} = e.target;

        setGameData({
            ...gameData,
            [name]: value
        });
    };

    const create = async () => {
        if(!name || !year){
            console.log('Name and year are required.');
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
                const res = await axios.post(
                    'http://localhost:5000/api/games',
                    body,
                    config
                );

                onGameCreated(res.data);
                history.push('/');
            }catch(error){
                console.error(`Error creating game: ${error.response.data}`);
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Add New Game</h2>
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
            <button onClick={() => create()}>Submit</button>
        </div>
    );
}

export default CreateGame;