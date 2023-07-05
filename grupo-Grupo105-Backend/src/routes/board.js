const Router = require('koa-router');

const router = new Router();

router.post("boards.create", "/", async(ctx) =>{
    try{
        const board = await ctx.orm.Board.create(ctx.request.body)
        ctx.body = board;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("boards.list", "/", async(ctx)=>{
    try{
        const boards = await ctx.orm.Board.findAll();
        ctx.body = boards
        ctx.status = 200
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("boards.show", "/:id", async(ctx)=>{
    try{
        const board = await ctx.orm.Board.findByPk(ctx.params.id);
        ctx.body = board
        ctx.status = 200
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("boards.show.by_game", "/by_game/:id" , async(ctx)=>{
    try{
        const game = await ctx.orm.Game.findByPk(ctx.params.id)
        const board = await ctx.orm.Board.findOne({
            where: {
                gameId: game.id
            }
        }); 
        ctx.body = board
        ctx.status = 200
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.delete("boards.destroy", "/:id", async (ctx) => {
    try {
      const board = await ctx.orm.Board.findByPk(ctx.params.id);
      if (!board) {
        ctx.status = 404;
        ctx.body = "El board no existe";
        return;
      }
  
      await board.destroy();
  
      ctx.status = 200;
      ctx.body = "El board ha sido eliminado correctamente";
    } catch (error) {
      ctx.status = 400;
      ctx.body = error;
    }
});

module.exports = router;