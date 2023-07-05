import React, { useState, useEffect } from 'react';
import './gamelobby.css';

const GameLobby = () => {
  const [players, setPlayers] = useState([]);
  const [localGameId, setLocalGameId] = useState('');
  const [isPatchSuccess, setIsPatchSuccess] = useState(false);
  const [hexagons, setHexagons] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [playerColors, setPlayerColors] = useState({});
  const [game, setGame] = useState({});
  const [selectedHexagon0, setSelectedHexagon0] = useState(null);
  const [selectedHexagon1, setSelectedHexagon1] = useState(null);
  const [error, setError] = useState('');
  const [gold, setGold] = useState(0);

  const building_images = {
    'Base': 'https://upload.wikimedia.org/wikipedia/commons/7/78/Branford%2C_Connecticut_town_hall_and_courthouse.jpg',
    'gimnasio': 'https://www.theshirtlist.com/wp-content/uploads/2018/11/Barbarian-Gym.jpg',
    'licoreria': 'https://licoreriacercademi.com/wp-content/uploads/2022/03/licoreria-cerca-de-mi-2.jpg',
  };


  useEffect(() => {
    // Get the gameId from localStorage or any other source
    const gameId = localStorage.getItem('gameId');
    setLocalGameId(gameId);
    fetch(`http://localhost:3000/players?gameId=${gameId}`)
      .then(response => response.json())
      .then(data => setPlayers(data))
      .catch(error => console.log(error));

    fetch(`http://localhost:3000/games/${gameId}`)
      .then(response => response.json())
      .then(data => {
        if (data.state === 'ingame') {
          fetch(`http://localhost:3000/hexagons/by_board/${gameId}`)
          .then(response => response.json())
          .then(data => {
            setIsPatchSuccess(true);
            setHexagons(data.sort((a, b) => a.id - b.id));
            })
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  }, []);

  const handlePatchRequest = () => {
    // Your PATCH request code goes here
    fetch('http://localhost:3000/games/initiate/' + localGameId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ state: 'active' })
    })
    .then(response => response.json())
    .then(data => {
      // Access the response data here and perform necessary checks
      if (data.error) {
        // Handle the error case, e.g., display an error message
        console.log(data.error);
      } else {
        // Success case, proceed to another page or perform further actions
        console.log('Game initiated successfully');
        setIsPatchSuccess(true);
        setHexagons(data.hexagons);
      }
    })
      .catch(error => {
        // Handle network errors or display error message
        console.log(error);
      });
  };

  const lobbyPlayers = players.filter(player => player.gameId.toString() === localGameId );

  const setGamedata = () => {
    console.log('Setting game data');
    fetch(`http://localhost:3000/games/${localGameId}`)
        .then(response => response.json())
        .then(data => {
          setGame(data);
        }
      )
        .catch(error => console.log(error));
    window.location.reload()
  };

  useEffect(() => {
    if (isPatchSuccess) {
      const colors = ['red', 'yellow', 'blue', 'green'];
      const colorsLength = colors.length;
      const assignedColors = {};
      lobbyPlayers.forEach((player, index) => {
        assignedColors[player.id] = colors[index % colorsLength];
      });
      setPlayerColors(assignedColors);

      fetch(`http://localhost:3000/games/${localGameId}`)
        .then(response => response.json())
        .then(data => {
          setGame(data);
        })
        .catch(error => console.log(error));
      
      fetch(`http://localhost:3000/players/resources/${localStorage.getItem('playerId')}`,
        {method: 'PATCH'})
        .then(response => response.json())
        .then(data => {
          setGold(data.resources);
        }
      )
    }
  }, [isPatchSuccess]);

  const switchTurn = () => {
    // Your PATCH request code goes here
    fetch('http://localhost:3000/players/resources/' + game.turn_list[game.turn], {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        // Handle the error case, e.g., display an error message
        console.log('Error: ' + data.error);
        setError(data.error);
      }
    })
    .catch(error => {
      // Handle network errors or display error message
      console.log(error);
    }
    );

    fetch('http://localhost:3000/games/turn/' + localGameId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        // Handle the error case, e.g., display an error message
        console.log('Error: ' + data.error);
        setError(data.error);
      } else {
        console.log('Turn switched');
        console.log(data); 
      }
    })
    .catch(error => {
      // Handle network errors or display error message
      console.log(error);
    }
    );
    setGamedata();
  };

  const handleHexagonClick = (hexagon) => {
    // Check if the hexagon is selectable
    if (hexagon.playerId && hexagon.playerId.toString() === localStorage.getItem('playerId')) {
      setSelectedHexagon0(hexagon); // Update the selected hexagon state
      console.log('My hexagon selected');
    } else {
      setSelectedHexagon1(hexagon); // Update the selected hexagon state
      console.log('Enemy/Empty hexagon selected');
    }
  };

  const handleHexConquer = () => {
    // Your POST request code goes here
    console.log('Building creating');
    if (!selectedHexagon0 || !selectedHexagon1) return;
    const data = {"hexagonId": selectedHexagon1.id};
    fetch('http://localhost:3000/hexagons/' + selectedHexagon0.id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        // Handle the error case, e.g., display an error message
        console.log('Error: ' + data.error);
        setError(data.error);
      } else {
        console.log('Building created');
        console.log(data);
        setSelectedHexagon0(null);
        setSelectedHexagon1(null);
        switchTurn();
      }
    })
    .catch(error => {
      // Handle network errors or display error message
      console.log(error);
    }
    );
  
  };

  const handleBuildingDestroy = () => {
    // Your DELETE request code goes here
    console.log('Building destroying');
    fetch('http://localhost:3000/buildings/' + selectedHexagon0.Building.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        // Handle the error case, e.g., display an error message
        console.log('Error: ' + data.error);
        setError(data.error);
      } else {
        console.log('Building destroyed');
        console.log(data);
        setSelectedHexagon0(null);
        setSelectedHexagon1(null);
        switchTurn();
      }
    })
  };
  
  const handleBuildingUpgrade = () => {
    // Your PATCH request code goes here
    console.log('Building upgrading');
    console.log('Actual building: ' + selectedHexagon0.Building.id);
    const data = {"playerId": selectedHexagon0.playerId.toString()};
    console.log('Data: ' + data.playerId);
    fetch('http://localhost:3000/buildings/' + selectedHexagon0.Building.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        // Handle the error case, e.g., display an error message
        console.log('Error: ' + data.error);
        setError(data.error);
      } else {
        console.log('Building upgraded');
        console.log(data);
        setSelectedHexagon0(null);
        setSelectedHexagon1(null);
        switchTurn();
      }
    })
    .catch(error => {
      // Handle network errors or display error message
      console.log(error);
    }
    );
  };

  const handleBuildingLicoreria = () => {
    // Your PATCH request code goes here
    console.log('Building Licoreria');
    const data = {
      "playerId": selectedHexagon0.playerId,
      "type": "licoreria",
      "occupiedCapacity": 0,
      "currentCapacity": 20,
      "level": 1,
      "hexagonId": selectedHexagon0.id,
    }
    fetch('http://localhost:3000/buildings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          // Handle the error case, e.g., display an error message
          console.log('Error: ' + data.error);
          setError(data.error);
        } else {
          console.log('Building created');
          console.log(data);
          setSelectedHexagon0(null);
          setSelectedHexagon1(null);
          switchTurn();
        }
      }
      )
      .catch(error => {
        // Handle network errors or display error message
        console.log(error);
      }
      );

  };

  const handleBuildingGimnasio = () => {
    // Your PATCH request code goes here
    console.log('Building Gimnasio in hex ' + selectedHexagon0.id);
    const data = {
      "playerId": selectedHexagon0.playerId,
      "type": "gimnasio",
      "occupiedCapacity": 0,
      "currentCapacity": 20,
      "level": 1,
      "hexagonId": selectedHexagon0.id,
    }
    fetch('http://localhost:3000/buildings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          // Handle the error case, e.g., display an error message
          console.log('Error: ' + data.error);
          setError(data.error);
        } else {
          console.log('Building created');
          console.log(data);
          setSelectedHexagon0(null);
          setSelectedHexagon1(null);
          switchTurn();
        }
      }
      )
      .catch(error => {
        // Handle network errors or display error message
        console.log(error);
      }
      );
  };

  const handleEnemyAttack = () => {
    // Your PATCH request code goes here
    console.log('Attack enemy');
    if (!selectedHexagon0 || !selectedHexagon1) return;
    const data = {"hexagonId": selectedHexagon1.id};
    fetch('http://localhost:3000/hexagons/' + selectedHexagon0.id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        // Handle the error case, e.g., display an error message
        console.log('Error: ' + data.error);
        setError(data.error);
      } else {
        console.log('Hexagon attacked');
        console.log(data);
        setSelectedHexagon0(null);
        setSelectedHexagon1(null);
        switchTurn();
      }
    })
    .catch(error => {
      // Handle network errors or display error message
      console.log(error);
    }
    );

  };

  const handleTrainNpc = () => {
    // Your PATCH request code goes here
    console.log('NPC training');
    const data = {
      "playerId": selectedHexagon0.playerId,
      "npcNumber": 10,
      "type": "npc",
      "buildingId": selectedHexagon0.Building.id,
    }
    fetch('http://localhost:3000/npcs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          // Handle the error case, e.g., display an error message
          console.log('Error: ' + data.error);
          setError(data.error);
        } else {
          console.log('NPC trained');
          console.log(data);
          setSelectedHexagon0(null);
          setSelectedHexagon1(null);
          switchTurn();
        }
      }
      )
  };

  return (
    <div className="game-lobby">
      {!isPatchSuccess ? (
        <div>
          <h2>Game Lobby #{localGameId}</h2>
          <ul className="player-list">
            {lobbyPlayers.map(player => (
              <li key={player.id} className="player-item">
                {player.name}
              </li>
            ))}
          </ul>
          <button onClick={handlePatchRequest}>Initiate Game</button>
        </div>
      ) : (
        <div className="game">
          <h2 className='gameTitle'>Game in Progress</h2>
          <div className="turn-info" style={
            {backgroundColor: playerColors[game.turn]}
          }>
            <p>Turno del jugador: {game.turn}</p>
            <p>Recursos propios: {gold}</p>
          </div>
          <p className='errorLog'>{error?('¡Error!: ' + error):('')}</p>
          <div className='gameLayout'>
            <div className="options ally">
              {selectedHexagon0 && (
                <div className="selected-hexagon">
                  <p className='hexTitle'>Hexagono Aliado</p>
                    {selectedHexagon0.Building && selectedHexagon0.playerId.toString() === localStorage.getItem('playerId') && (
                      <div className="building">
                        <div className="building-info">
                          <img src={building_images[selectedHexagon0.Building.type]} alt={selectedHexagon0.Building.type} className='buildingImage'/>
                          <p>Tipo: {(selectedHexagon0.Building.type === 'licoreria')?('Licoreria'):(selectedHexagon0.Building.type === 'licoreria'?'Gimnasio':'Base')}</p>
                          <p>Level: {selectedHexagon0.Building.level}</p>
                          <p>NPCs: {selectedHexagon0.Building.occupiedCapacity}/{selectedHexagon0.Building.currentCapacity}</p>
                        </div>
                        <div className="building-options">
                          <button onClick={handleTrainNpc} className='gameButton'>Entrenar Unidades</button>
                          <button onClick={handleBuildingDestroy} className='gameButton'>Destruir</button>
                          <button onClick={handleBuildingUpgrade} className='gameButton'>Mejorar Edificio ({(selectedHexagon0.Building.level + 1) * 10} oro)</button>
                        </div>
                      </div>
                    )}
                    {selectedHexagon0.Building === null && selectedHexagon0.playerId.toString() === localStorage.getItem('playerId') && (
                      <div className="newBuild">
                          <p>Construir</p>
                        <ul className="building-options">
                          <li>
                            <button onClick={handleBuildingLicoreria} className='gameButton'>Licoreria</button>
                            <p>Precio: 10 oro</p>
                          </li>
                          <li>
                            <button onClick={handleBuildingGimnasio} className='gameButton'>Gimnasio</button>
                            <p>Precio: 10 oro</p>
                          </li>
                        </ul>
                      </div>
                    )}
                </div>
              )}
            </div>
            <div className="game-board">
              {
                hexagons.map((hexagon, index) => (
                  <svg
                    key={hexagon.id}
                    className={`hexagon ${selectedHexagon0 === hexagon ? 'selected-green' : ''} ${selectedHexagon1 === hexagon ? 'selected-red' : ''}`}
                    onClick={() => handleHexagonClick(hexagon)}
                    viewBox="0 -50 100 100" // Adjust the viewBox to fit the hexagon tightly
                    width="100" // Adjust the width to set the size of each hexagon
                    height="100" // Adjust the height to set the size of each hexagon
                    x={index % 8 * 120} // Adjust the x position based on the index
                    y={Math.floor(index / 8) * 100} // Adjust the y position based on the index
                  >
                    <polygon
                      points="30 -50 70 -50 100 0 70 50 30 50 0 0" // Adjust the points for a smaller hexagon shape
                      style={{ fill: playerColors[hexagon.playerId], stroke: 'black' }} // Apply the fill and stroke styles
                    />
                  </svg>
                ))
              }
            </div>
            <div className="options enemy">
              {selectedHexagon1 && (
                <div className="selected-hexagon">
                    {selectedHexagon1.playerId && selectedHexagon1.Building && selectedHexagon1.playerId.toString() !== localStorage.getItem('playerId') && (
                      <div className="building">
                        <p className='hexTitle'>Hexagono Enemigo</p>
                        <div className="building-info">
                          <img src={building_images[selectedHexagon1.Building?(selectedHexagon1.Building.type):('')]} alt={'Edificio'} className='buildingImage'/>
                          <p>Tipo: {(selectedHexagon1.Building.type === 'licoreria')?('Licoreria'):('Gimnasio')}</p>
                          <p>Level: {selectedHexagon1.Building.level}</p>
                        </div>
                        <div className="building-options">
                          <button onClick={handleEnemyAttack} className='gameButton'>Atacar</button>
                        </div>
                      </div>
                    )}
                    {!selectedHexagon1.playerId && (
                      <div className="building">
                        <p>Hexagono Vacio</p>
                        <div className="building-options">
                          <button onClick={handleHexConquer} className='gameButton'>Conquistar</button>
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameLobby;
