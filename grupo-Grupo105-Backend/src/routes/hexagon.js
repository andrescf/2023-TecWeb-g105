const Router = require('koa-router');

const router = new Router();

router.post("hexagons.create", "/", async(ctx) =>{
    try{
        const hexagon = await ctx.orm.Hexagon.create(ctx.request.body)
        ctx.body = hexagon;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

router.post("hexagons.attack", '/:id', async(ctx) => {
    try{
        const ownHexagon = await ctx.orm.Hexagon.findByPk(ctx.params.id)
        const player = await ctx.orm.Player.findByPk(ownHexagon.playerId)
        const game = await ctx.orm.Game.findByPk(player.gameId)
        const ownBuilding = await ctx.orm.Building.findOne({
            where: { hexagonId : ownHexagon.id } })
        const attackHexagon = await ctx.orm.Hexagon.findByPk(ctx.request.body.hexagonId)
        const attackBuilding = await ctx.orm.Building.findOne({
            where: { hexagonId : attackHexagon.id } })
        
        
        if (!ownHexagon) {
            ctx.status = 404
            ctx.body = { error: "Hexagono propio no encontrado"}
            return;
        }

        if (player.id != game.turn) {
            ctx.status = 404;
            ctx.body = { error: "Este no es tu turno" };
            return;
        }

        if (player.state != "active") {
            ctx.status = 400
            ctx.body = { error: "No estas activo, no puedes jugar"}
            return
        }

        if (!attackHexagon) {
            ctx.status = 404
            ctx.body = { error: "Hexagono rival no encontrado"}
            return;
        }

        if (!ownBuilding) {
            ctx.status = 404
            ctx.body = { error: "Edificio propio no encontrado"}
            return;
        }

        if (ownHexagon.playerId == attackHexagon.playerId) {
            ctx.status = 400
            ctx.body = { error: "No puedes atacar tus propios hexagonos"}
            return;
        }

        if (Math.abs(parseInt(ownHexagon.position) - parseInt(attackHexagon.position)) > 1) {
            ctx.status = 400
            ctx.body = { error: "Edificio rival no colinda con propio por position"}
            return;
        }

        if (Math.abs(parseInt(ownHexagon.height) - parseInt(attackHexagon.height)) > 1) {
            ctx.status = 400
            ctx.body = { error: "Edificio rival no colinda con propio por height"}
            return;
        }

        if (!attackBuilding) {
            attackHexagon.playerId = ownHexagon.playerId
            await attackHexagon.save()
            ctx.body = attackHexagon
            ctx.status = 201
            return;
        }

        const ownAttackNpcs = await ctx.orm.NPC.findAll({
            where: {
                type: 'gimnasio',
                buildingId: ownBuilding.id
            }
        })

        const rivalAttackNpcs = await ctx.orm.NPC.findAll({
            where: {
                type: 'gimnasio',
                buildingId: attackBuilding.id
            }
        })

        const ownNpcsNumber = ownAttackNpcs.length
        const rivalNpcsNumber = rivalAttackNpcs.length

        if (ownNpcsNumber > rivalNpcsNumber) {
            const ownNpcsRemove = ownAttackNpcs.slice(0, rivalNpcsNumber).map(npc => npc.id)
            await ctx.orm.NPC.destroy({
                where: {
                    id: ownNpcsRemove
                }
            })

            await ctx.orm.NPC.destroy({
                where: {
                    buildingId: attackBuilding.id
                }
            })

            if (attackBuilding.type == 'Base') {
                const playerAttacked = await ctx.orm.Player.findByPk(attackHexagon.playerId)
                const turnoIndex = game.turn_list.indexOf(playerAttacked.id)
                playerAttacked.state = 'lost'
                game.turn_list = game.turn_list.slice(0, turnoIndex).concat(game.turn_list.slice(turnoIndex + 1))
                
                await playerAttacked.save()
                await game.save()
            }

            await attackBuilding.destroy()

            attackHexagon.playerId = ownHexagon.playerId
            await attackHexagon.save()

            ownBuilding.occupiedCapacity -= rivalNpcsNumber
            await ownBuilding.save()

            ctx.body = attackHexagon
            ctx.status = 201
            return;
        } else {
            ctx.status = 400
            ctx.body = {error: 'No tienes suficientes matones para atacar este hexágono'}
            return;
        }
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("hexagons.list", "/", async(ctx)=>{
    try{
        const hexagons = await ctx.orm.Hexagon.findAll();
        ctx.body = hexagons
        ctx.status = 200
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("hexagons.list.by_board", "/by_board/:id", async(ctx)=>{
    try{
        const board = await ctx.orm.Board.findByPk(ctx.params.id)
        const hexagons = await ctx.orm.Hexagon.findAll({
            where: {
              boardId: board.id
            },
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
        });
    
        const hexagonIds = hexagons.map(hexagon => hexagon.id);
        const buildings = await ctx.orm.Building.findAll({
        where: {
            hexagonId: hexagonIds
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
        });
    
        const hexagonsWithBuildings = hexagons.map(hexagon => {
            const building = buildings.find(b => b.hexagonId === hexagon.id);
            return {
                ...hexagon.toJSON(),
                Building: building ? building.toJSON() : null
            };
        });
        ctx.body = hexagonsWithBuildings
        ctx.status = 200
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("hexagons.show", "/:id", async(ctx)=>{
    try{
        const hexagon = await ctx.orm.Hexagon.findByPk(ctx.params.id);
        ctx.body = hexagon
        ctx.status = 200
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.delete("hexagons.destroy", "/:id", async (ctx) => {
    try {
      const hexagon = await ctx.orm.Hexagon.findByPk(ctx.params.id);
      if (!hexagon) {
        ctx.status = 404;
        ctx.body = "El hexagon no existe";
        return;
      }
  
      await hexagon.destroy();
  
      ctx.status = 200;
      ctx.body = "El hexagon ha sido eliminado correctamente";
    } catch (error) {
      ctx.status = 400;
      ctx.body = error;
    }
});

module.exports = router;