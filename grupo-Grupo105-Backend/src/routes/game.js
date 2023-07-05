const Router = require('koa-router');

const router = new Router();

router.post("games.create", "/", async(ctx) =>{
    try{
        const game = await ctx.orm.Game.create(ctx.request.body)
        ctx.body = game;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

router.patch("games.win", "/win/:id", async(ctx) => {
    try{ 
        const game = await ctx.orm.Game.findByPk(ctx.params.id)
        
        if (game.turn_list.length == 1 ) {
            game.state = "finished"
            const player = await ctx.orm.Player.findOne({
                where: {
                    id: game.turn_list[0]
                }
            })
            game.winner = player.name
            player.state = 'winner'

            await game.save()
            await player.save()

            ctx.body = { game, player };
            ctx.status = 200;
        } else {
            ctx.body = { error: "aun no termina la partida sigue asi" };
            ctx.status = 400;
        }
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})
router.patch("games.switchturn", "/turn/:id", async(ctx)=>{
    try{
        const game = await ctx.orm.Game.findByPk(ctx.params.id);
        const turnoIndex = game.turn_list.indexOf(game.turn)

        if (!game){
            ctx.body = { error: "No se encontro la partida" };
            ctx.status = 400;
            return
        }

        if (game.state != 'ingame') {
            ctx.body = { error: "El juego no ha empezado aun" };
            ctx.status = 400;
            return
        }

        const nextTurnIndex = (turnoIndex + 1) % game.turn_list.length;
        const nextTurn = game.turn_list[nextTurnIndex];

        game.turn = nextTurn;
        await game.save();
    
        ctx.body = game;
        ctx.status = 200;

    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.patch("games.initiate", "/initiate/:id", async(ctx)=>{
    try{
        const game = await ctx.orm.Game.findByPk(ctx.params.id);
        const players = await ctx.orm.Player.findAll({
            where: {
                gameId: game.id
            }
        })
        
        if (players.length == 4) {
            game.state = 'ingame'
            game.turn_list = []
            game.turn_list = players.map(player => player.id)
            game.turn = game.turn_list[0]
            await game.save();

            const board = await ctx.orm.Board.create({ gameId: game.id });

            const hexagons = [];
            const buildings = []
            const listaId = []

            for (let i = 1; i < 9; i++) {
                for (let j = 1; j < 9; j++) {
                    let comparador = false
                    let playerId = null;

                    if ((i === 1 && j === 1)) {
                        playerId = game.turn_list[0];
                        comparador = true
                    } else if ((i === 1 && j === 8)) {
                        playerId = game.turn_list[1];
                        comparador = true
                    } else if ((i === 8 && j === 1)) {
                        playerId = game.turn_list[2];
                        comparador = true
                    } else if ((i === 8 && j === 8)) {
                        playerId = game.turn_list[3];
                        comparador = true
                    }

                    const hexagon = await ctx.orm.Hexagon.create({
                        boardId: board.id,
                        position: i,
                        height: j,
                        playerId: playerId,
                    });

                    if (comparador) {
                        listaId.push(hexagon.id)
                    }

                    hexagons.push(hexagon);
                }
            }

            for (let i = 0; i < 4; i++) {
                const building = await ctx.orm.Building.create({
                    type: "Base",
                    occupiedCapacity: 0,
                    currentCapacity: 20,
                    level: 1,
                    hexagonId: listaId[i]
                })
                
                buildings.push(building)
            }

            ctx.body = { game, board, hexagons, buildings} ;
            ctx.status = 200;
        } else {
            console.log(players.length)
        ctx.body = "Debe haber exactamente 4 jugadores en el juego";
        ctx.status = 400;
        }
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("games.list", "/", async(ctx)=>{
    try{
        const games = await ctx.orm.Game.findAll();
        ctx.body = games
        ctx.status = 200
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("games.show", "/:id", async(ctx)=>{
    try{
        const game = await ctx.orm.Game.findByPk(ctx.params.id);
        ctx.body = game
        ctx.status = 200
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.delete("games.destroy", "/:id", async (ctx) => {
    try {
      const game = await ctx.orm.Game.findByPk(ctx.params.id);
      if (!game) {
        ctx.status = 404;
        ctx.body = "El juego no existe";
        return;
      }
  
      await game.destroy();
  
      ctx.status = 200;
      ctx.body = "El juego ha sido eliminado correctamente";
    } catch (error) {
      ctx.status = 400;
      ctx.body = error;
    }
});

module.exports = router;