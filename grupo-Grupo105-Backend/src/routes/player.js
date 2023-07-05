const Router = require('koa-router');

const router = new Router();

router.post("players.create", "/", async(ctx) =>{
    try{
        const players = await ctx.orm.Player.findAll({
            where: {
                gameId: ctx.request.body.gameId
        }})

        if (players.length < 4) {
            const player = await ctx.orm.Player.create(ctx.request.body)
            ctx.body = player;
            ctx.status = 201;
        } else {
            ctx.body = { error: "Esta partida ya esta llena" }
            ctx.status = 400
        }
        
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

router.patch("players.updateResources", "/resources/:id", async(ctx) => {
    try{
        const player = await ctx.orm.Player.findByPk(ctx.params.id)
        const hexagons = await ctx.orm.Hexagon.findAll({
            where: {
              playerId: player.id,
            },
            include: {
              model: ctx.orm.Building,
              where: {
                type: 'licoreria',
              },
            },
        });

        if (!player) {
            ctx.status = 404;
            ctx.body = { error: "Jugador no encontrado" };
            return;
        }

        if (player.state != "active") {
            ctx.status = 400
            ctx.body = { error: "No estas activo, no puedes jugar"}
        }
        
        let numberOfBarman = 0
        
        for (const hexagon of hexagons) {
            let buildId = hexagon.Building.id;
            let npcs = await ctx.orm.NPC.findAll({
              where: {
                buildingId: buildId,
                type: "barman"
              }
            });
          
            numberOfBarman += npcs.length;
        }
        
        player.resources = parseInt(player.resources) + numberOfBarman*2 + 10
        await player.save()

        ctx.body = player ;
        ctx.status = 200;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.patch("players.updateState", "/state/:id", async(ctx) => {
    try{
        const player = await ctx.orm.Player.findByPk(ctx.params.id)
        const state = ctx.request.body.state.toString()
        const game = await ctx.orm.Game.findOne({
            where: { id: player.gameId }
        })

        if (!player) {
            ctx.status = 404;
            ctx.body = { error: "Jugador no encontrado" };
            return;
        }

        console.log(state)
        player.state = state
        await player.save()

        if (state == 'lost') {
            const turnoIndex = game.turn_list.indexOf(player.id)
            game.turn_list = game.turn_list.slice(0, turnoIndex).concat(game.turn_list.slice(turnoIndex + 1))
            await game.save()
        }

        ctx.body = player;
        ctx.status = 200;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("players.list", "/", async(ctx)=>{
    try{
        const players = await ctx.orm.Player.findAll();
        ctx.body = players
        ctx.status = 200
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("players.show", "/:id", async(ctx)=>{
    try{
        const player = await ctx.orm.Player.findByPk(ctx.params.id);
        ctx.body = player
        ctx.status = 200
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.delete("players.destroy", "/:id", async (ctx) => {
    try {
      const player = await ctx.orm.Player.findByPk(ctx.params.id);
      if (!player) {
        ctx.status = 404;
        ctx.body = "El player no existe";
        return;
      }
  
      await player.destroy();
  
      ctx.status = 200;
      ctx.body = "El player ha sido eliminado correctamente";
    } catch (error) {
      ctx.status = 400;
      ctx.body = error;
    }
});

module.exports = router;