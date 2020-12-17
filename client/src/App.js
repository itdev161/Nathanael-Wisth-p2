import React from 'react';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import CreateGame from './components/CreateGame';
import EditGame from './components/EditGame';
import GameList from './components/GameList';
import Game from './components/Game';

class App extends  React.Component{
  state = {
    games: [],
    game: null
  };

  componentDidMount(){
    this.loadData()
  }

  loadData = () => {
    axios
      .get('http://localhost:5000/api/games')
      .then(response => {
        this.setState({
          games: response.data
        });
      })
      .catch(error => {
        console.error(`Error fetching data: ${error}`);
      });
  }

  viewGame = game => {
    console.log(`view ${game.name}`);
    this.setState({
      game: game
    });
  };

  deleteGame = game => {
    axios
      .delete(`http://localhost:5000/api/games/${game._id}`)
      .then(response => {
        const newGames = this.state.games.filter(g => g._id !== game._id);
        this.setState({
          games: [...newGames]
        });
      })
      .catch(error => {
        console.error(`Error deleting game: ${error}`);
      });
  };

  editGame = game => {
    this.setState({
      game: game
    });
  };

  onGameCreated = game => {
    const newGames = [...this.state.games, game];

    this.setState({
      games: newGames
    });
  };

  onGameUpdated = game => {
    console.log('updated game: ', game);
    const newGames = [...this.state.games];
    const index = newGames.findIndex(g => g._id === game._id);

    newGames[index] = game;

    this.setState({
      games: newGames
    });
  };

  render(){
    let {games, game} = this.state;

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>VGList</h1>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/add">Add New</Link>
              </li>
            </ul>
          </header>
          <main>
            <Switch>
              <Route exact path="/">
                <GameList 
                  games={games}
                  clickGame={this.viewGame}
                  deleteGame={this.deleteGame}
                  editGame={this.editGame}
                />
              </Route>
              <Route path="/games/:gameId">
                <Game game={game}/>
              </Route>
              <Route path="/add">
                <CreateGame onGameCreated={this.onGameCreated}/>
              </Route>
              <Route path="/edit/:gameId">
                <EditGame 
                  game={game}
                  onGameUpdated={this.onGameUpdated}
                />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
