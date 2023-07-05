import React, { useState, useEffect } from 'react';
import './gamelist.css'

const GameList = ( ) => {
  const [games, setGames] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch games from the backend
    fetch('http://localhost:3000/games')
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.log(error));
  }, []);

  const handleJoinGame = (gameId) => {
    if (!playerName) {
      setErrorMessage('Please enter your in-game name');
      return;
    }

    // Create user in the backend
    const user_id = createUser(playerName);

    const player_id = createPlayer(gameId, user_id, playerName);
    // Save player ID, game ID, user ID, and name in localStorage
    localStorage.setItem('gameId', gameId);
    localStorage.setItem('name', playerName);

    // Redirect to the game lobby page
    window.location.href = '/game-lobby';
    
  };

  // Filter games with state "not initiated"
  const notInitiatedGames = games.filter(game => game.state === 'notinitiate');

  return (
    <div className='gameList'>
      <input
        type="text"
        value={playerName}
        onChange={e => setPlayerName(e.target.value)}
        placeholder="Enter your in-game name"
      />

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={handleNewGame}>Crear nueva partida</button>
      <ul className="game-list">
        {notInitiatedGames.map(game => {
          return (
          <li key={game.id} className="game-item">
            <h3>Juego #{game.id}</h3>
            <p>Estado del juego: {game.state}</p>
            <p>Jugadores: {game.turn_list.length}/4</p>
            <button onClick={() => handleJoinGame(game.id)}>Join Game</button>
          </li>
          )}
        )}
      </ul>
    </div>
  );
};

const createUser = (playerName) => {
  // Create user in the backend
  const data = {
    username: playerName,
    password: 'your-password',
    mail: playerName + '@gangster.io'
  };

  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the backend if needed
      console.log(data);
      if (data.name === 'SequelizeUniqueConstraintError') {
        console.log('User already exists');
      } else {
        console.log('User created' + data.id);
        localStorage.setItem('userId', data.id);
      }
    })
    .catch(error => {
      console.log(error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        console.log('User already exists');
      }
    });
  
  return data.id;
};

const createPlayer = (gameId, userId, playerName) => {
  // Send player details to the backend
  const data = {
    "userId": userId,
    "gameId": gameId,
    "name": playerName,
    "resources": 100,
    "state": "active"
  };

  fetch('http://localhost:3000/players', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the backend if needed
      console.log(data);
      console.log('Player created' + data.id);
      localStorage.setItem('playerId', data.id);
    })
    .catch(error => console.log(error));
  
};

const handleNewGame = () => {
  // Create new game in the backend
  const data = {
    "state": "notinitiated",
    "winner": "None",
    "turn": 1
  }
  fetch('http://localhost:3000/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response from the backend if needed
    console.log(data);
  })
  .catch(error => console.log(error));
};

export default GameList;
