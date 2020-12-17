import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
});

const Game = mongoose.model('game', GameSchema);

export default Game;