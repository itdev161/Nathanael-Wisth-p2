import express from 'express';
import connectDatabase from './config/db';
import cors from 'cors';
import Game from './models/Game';
import { check, validationResult } from 'express-validator';

const app = express();

connectDatabase();

app.use(express.json({extended: false}));
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);

app.get('/', (req, res) =>
    res.send('http get request sent to root api endpoint')
);

//create game endpoint
app.post(
    '/api/games',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('year', 'Year is required')
            .isNumeric()
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors: errors.array()});
        }else{
            const {name, year} = req.body;
            try{
                const game = new Game({
                    name: name,
                    year: year
                });

                await game.save();

                res.json(game);
            }catch(error){
                console.error(error);
                res.status(500).send('Server error');
            }
        }
    }
);

//get games endpoint
app.get('/api/games', async(req, res) => {
    try{
        const games = await Game.find();

        res.json(games);
    }catch(error){
        console.error(error);
        res.status(500).send('Server error');
    }
});

//get game by id endpoint
app.get('/api/games/:id', async (req, res) => {
    try{
        const game = await Game.findById(req.params.id);

        if(!game){
            return res.status(404).json({msg: 'Game not found'});
        }

        res.json(game);
    }catch(error){
        console.error(error);
        res.status(500).send('Server error');
    }
});

//delete game endpoint
app.delete('/api/games/:id', async (req, res) => {
    try{
        const game = await Game.findById(req.params.id);

        if(!game){
            return res.status(404).json({msg: 'Game not found'});
        }

        await game.remove();

        res.json({msg: 'Game removed'});
    }catch(error){
        console.error(error);
        res.status(500).send('Server error');
    }
});

//update post endpoint
app.put('/api/games/:id', async (req, res) => {
    try{
        const {name, year} = req.body;
        const game = await Game.findById(req.params.id);

        if(!game){
            return res.status(404).json({msg: 'Game not found'});
        }

        game.name = name || game.name;
        game.year = year || game.year;

        await game.save();

        res.json(game);
    }catch(error){
        console.error(error);
        res.status(500).send('Server error');
    }
});

const port = 5000;
app.listen(port, () => console.log(`Express server running on port ${port}`));