métodos get

Board:

boards.list: muestra todos los objetos boards

HTTPrequest: "http://localhost:3000/boards/"

json devuelto ejemplo: 

[
    {
        "id": 1,
        "gameId": 1,
        "createdAt": "2023-07-02T23:23:21.953Z",
        "updatedAt": "2023-07-02T23:23:21.953Z"
    }
]

boards.show: muestra el objeto board de id "id"

HTTPrequest: "http://localhost:3000/boards/:id"

json devuelto ejemplo: 

{
    "id": 1,
    "gameId": 1,
    "createdAt": "2023-07-02T23:23:21.953Z",
    "updatedAt": "2023-07-02T23:23:21.953Z"
}

boards.show.by_game: muestra el objeto board con gameId "id"

HTTPrequest: "http://localhost:3000/boards/by_game/:id"

json devuelto ejemplo: 

{
    "id": 1,
    "gameId": 1,
    "createdAt": "2023-07-02T23:23:21.953Z",
    "updatedAt": "2023-07-02T23:23:21.953Z"
}

Building:

buildings.list: devuelve todos los objetos Building

HTTPrequest: "http://localhost:3000/buildings/"

json devuelto ejemplo: 

[
    {
        "id": 1,
        "type": "Base",
        "occupiedCapacity": 0,
        "currentCapacity": 20,
        "level": 1,
        "hexagonId": 1,
        "createdAt": "2023-07-02T23:23:22.135Z",
        "updatedAt": "2023-07-02T23:23:22.135Z"
    },
    {
        "id": 5,
        "type": "gimnasio",
        "occupiedCapacity": 6,
        "currentCapacity": 20,
        "level": 1,
        "hexagonId": 65,
        "createdAt": "2023-07-02T23:24:45.047Z",
        "updatedAt": "2023-07-02T23:25:19.231Z"
    }
]

buildings.show: muestra el objeto building de id "id"

HTTPrequest: "http://localhost:3000/buildings/1"

json devuelto ejemplo: 

{
    "id": 1,
    "type": "Base",
    "occupiedCapacity": 0,
    "currentCapacity": 20,
    "level": 1,
    "hexagonId": 1,
    "createdAt": "2023-07-02T23:23:22.135Z",
    "updatedAt": "2023-07-02T23:23:22.135Z"
}

Game:

games.list: muestra todos los objetos Game

HTTPrequest: "http://localhost:3000/games/"

json devuelto ejemplo: 

[
    {
        "id": 2,
        "state": "notinitiate",
        "winner": "none",
        "turn": 1,
        "turn_list": [
            1
        ],
        "createdAt": "2023-07-02T23:21:05.653Z",
        "updatedAt": "2023-07-02T23:21:05.653Z"
    },
    {
        "id": 1,
        "state": "finished",
        "winner": "wrapper_gaj",
        "turn": 1,
        "turn_list": [
            1
        ],
        "createdAt": "2023-07-02T23:21:05.653Z",
        "updatedAt": "2023-07-03T00:23:18.037Z"
    }
]

games.show: muestra el objeto Game de id "id"

HTTPrequest: "http://localhost:3000/games/:id"

json devuelto ejemplo: 

[
    {
        "id": 2,
        "state": "notinitiate",
        "winner": "none",
        "turn": 1,
        "turn_list": [
            1
        ],
        "createdAt": "2023-07-02T23:21:05.653Z",
        "updatedAt": "2023-07-02T23:21:05.653Z"
    }
]

hexagons.list: muestra todos los objetos Hexagons

HTTPrequest: "http://localhost:3000/hexagons/"

json devuelto ejemplo: 

[
    {
        "id": 1,
        "boardId": 1,
        "playerId": 1,
        "position": 1,
        "height": 1,
        "createdAt": "2023-07-02T23:23:21.961Z",
        "updatedAt": "2023-07-02T23:23:21.961Z"
    },
    {
        "id": 2,
        "boardId": 1,
        "playerId": null,
        "position": 1,
        "height": 2,
        "createdAt": "2023-07-02T23:23:21.965Z",
        "updatedAt": "2023-07-02T23:23:21.965Z"
    }
]

hexagons.list.by_board: muestra todos los objetos Hexagons con boardId "id", 
                        incluyendo su edificio en caso de existir

HTTPrequest: "http://localhost:3000/hexagons/by_board/1"

json devuelto ejemplo: 

[
    {
        "id": 1,
        "boardId": 1,
        "playerId": 1,
        "position": 1,
        "height": 1,
        "Building": {
            "id": 1,
            "type": "Base",
            "occupiedCapacity": 0,
            "currentCapacity": 20,
            "level": 1,
            "hexagonId": 1
        }
    },
    {
        "id": 2,
        "boardId": 1,
        "playerId": null,
        "position": 1,
        "height": 2,
        "Building": null
    }
]

hexagons.show: muestra objeto Hexagon con id "id"

HTTPrequest: "http://localhost:3000/hexagons/1"

json devuelto ejemplo: 

{
    "id": 1,
    "boardId": 1,
    "playerId": 1,
    "position": 1,
    "height": 1,
    "createdAt": "2023-07-02T23:23:21.961Z",
    "updatedAt": "2023-07-02T23:23:21.961Z"
}

npcs.list: muestra todos los objeto NPC

HTTPrequest: "http://localhost:3000/npcs/"

npcs.show: muestra el objeto NPC con id "id"

HTTPrequest: "http://localhost:3000/npcs/:id"


