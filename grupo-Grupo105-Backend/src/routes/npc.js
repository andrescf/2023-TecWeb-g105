const Router = require('koa-router');

const router = new Router();

router.post("npcs.create", "/", async(ctx) =>{
    try{
        const { playerId, npcNumber, ...npcData } = ctx.request.body
        const player = await ctx.orm.Player.findByPk(playerId)
        const game = await ctx.orm.Game.findByPk(player.gameId)
        const building = await ctx.orm.Building.findByPk(npcData.buildingId)
        const npcCost = 1

        if (!player) {
            ctx.status = 404;
            ctx.body = { error: "Jugador no encontrado" };
            return;
        }

        if (player.id != game.turn) {
            ctx.status = 404;
            ctx.body = { error: "Este no es tu turno" };
            return;
        }
        
        if (!building) {
            ctx.status = 404;
            ctx.body = { error: "Edificio no encontrado" };
            return;
        }

        if (player.state != "active") {
            ctx.status = 400
            ctx.body = { error: "No estas activo, no puedes jugar"}
            return
        }
        
        if (player.resources < npcCost*npcNumber) {
            ctx.status = 400;
            ctx.body = { error: "Recursos insuficientes" };
            return;
        }

        if (parseInt(building.currentCapacity) - parseInt(building.occupiedCapacity) < npcNumber) {
            ctx.status = 400;
            ctx.body = { error: "Edificio no tiene suficiente espacio" };
            return;
        }

        for (let i = 0; i < npcNumber; i++){
            const npc = await ctx.orm.NPC.create(ctx.request.body)
            await npc.save();
        }

        building.occupiedCapacity = parseInt(building.occupiedCapacity) + npcNumber
        await building.save()

        player.resources = parseInt(player.resources) - npcNumber*npcCost
        await player.save()

        ctx.body = { success: "Creados correctamente los " +
         npcNumber + " personajes"};
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("npcs.list", "/", async(ctx)=>{
    try{
        const npcs = await ctx.orm.NPC.findAll();
        ctx.body = npcs
        ctx.status = 200
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("npcs.show", "/:id", async(ctx)=>{
    try{
        const npc = await ctx.orm.NPC.findByPk(ctx.params.id);
        ctx.body = npc
        ctx.status = 200
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.delete("npcs.destroy", "/:id", async (ctx) => {
    try {
      const npc = await ctx.orm.NPC.findByPk(ctx.params.id);
      if (!npc) {
        ctx.status = 404;
        ctx.body = "El npc no existe";
        return;
      }
  
      await npc.destroy();
  
      ctx.status = 200;
      ctx.body = "El npc ha sido eliminado correctamente";
    } catch (error) {
      ctx.status = 400;
      ctx.body = error;
    }
});

module.exports = router;