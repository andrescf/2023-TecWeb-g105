const Router = require('koa-router');

const router = new Router();

router.post("buildings.create", "/", async(ctx) =>{
    try{
        const { playerId, ...buildingData } = ctx.request.body
        const player = await ctx.orm.Player.findByPk(playerId)
        const game = await ctx.orm.Game.findByPk(player.gameId)
        const hexagon = await ctx.orm.Hexagon.findByPk(buildingData.hexagonId)
        const requiredResources = 10

        
        if (!player) {
            ctx.status = 404;
            ctx.body = { error: "Jugador no encontrado" };
            return;
        }

        if (player.state != "active") {
            ctx.status = 400
            ctx.body = { error: "No estas activo, no puedes jugar"}
            return
        }

        if (player.id != game.turn) {
            ctx.status = 404;
            ctx.body = { error: "Este no es tu turno" };
            return;
        }

        if (!hexagon) {
            ctx.status = 404;
            ctx.body = { error: "Hexagono no encontrado" };
            return;
        }

        const playerOwnerId = hexagon.playerId

        if (playerId != playerOwnerId) {
            ctx.status = 400;
            ctx.body = { error: "Este hexagono no le pertenece al jugador" };
            return;
          }

        if (player.resources < requiredResources) {
            ctx.status = 400;
            ctx.body = { error: "Recursos insuficientes" };
            return;
        }

        const existingBuilding = await ctx.orm.Building.findOne({
            where: {
              hexagonId: hexagon.id
            }
            });

        if (existingBuilding) {
            ctx.status = 400;
            ctx.body = { error: "Ya hay un edificio en este hexágono" };
            return;
        }

        const building = await ctx.orm.Building.create(buildingData)
        player.resources -= requiredResources;
        await player.save();
        ctx.body = building;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

router.patch("buildings.updateLevel", "/:id", async(ctx) => {
    try {
        const building = await ctx.orm.Building.findByPk(ctx.params.id);
        const player = await ctx.orm.Player.findByPk(ctx.request.body.playerId)
        const game = await ctx.orm.Game.findByPk(player.gameId)
        const hexagon = await ctx.orm.Hexagon.findOne({
            where: {
                id: building.hexagonId
            }
        })

        if (!player) {
            ctx.status = 404
            ctx.body = { error: "Jugador no encontrado"}
            return;
        }

        if (player.id != game.turn) {
            ctx.status = 404;
            ctx.body = { error: "Este no es tu turno" };
            return;
        }

        if (!building) {
            ctx.status = 404
            ctx.body = { error: "Edificio no encontrado"}
            return;
        }

        if (!hexagon) {
            ctx.status = 404
            ctx.body = { error: "Hexagono no encontrado"}
            return;
        }

        if (player.id != hexagon.playerId) {
            ctx.status = 400;
            ctx.body = { error: "Este hexagono no le pertenece al jugador" };
            return;
        }

        if (player.state != "active") {
            ctx.status = 400
            ctx.body = { error: "No estas activo, no puedes jugar"}
            return
        }

        const buildingLevel = building.level
        const requiredResources = buildingLevel*10

        if (player.resources >= requiredResources) {
            building.level++;
            building.currentCapacity = building.currentCapacity*2
            player.resources -= requiredResources;
            await building.save();
            await player.save();
            ctx.body = building;
            ctx.status = 200;
        } else {
            ctx.status = 400;
            ctx.body = { error: "Recursos insuficientes" };
            return;
        }
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("buildings.list", "/", async(ctx)=>{
    try{
        const buildings = await ctx.orm.Building.findAll();
        ctx.body = buildings
        ctx.status = 200
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("buildings.show", "/:id", async(ctx)=>{
    try{
        const building = await ctx.orm.Building.findByPk(ctx.params.id);
        ctx.body = building
        ctx.status = 200
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.delete("buildings.destroy", "/:id", async (ctx) => {
    try {
        const building = await ctx.orm.Building.findByPk(ctx.params.id);
        const hexagon = await ctx.orm.Hexagon.findByPk(building.hexagonId)
        const player = await ctx.orm.Player.findByPk(hexagon.playerId)
        const game = await ctx.orm.Game.findByPk(player.gameId)

        if (!building) {
            ctx.status = 404;
            ctx.body = "El building no existe";
            return;
        }

        if (player.id != game.turn) {
            ctx.status = 404;
            ctx.body = { error: "Este no es tu turno" };
            return;
        }
    
        await building.destroy();
    
        ctx.status = 200;
        ctx.body = "El building ha sido eliminado correctamente";
    } catch (error) {
        ctx.status = 400;
        ctx.body = error;
    }
});

module.exports = router;