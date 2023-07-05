const Router = require('koa-router');

const router = new Router();

router.post("users.create", "/", async(ctx) =>{
    try{
        const user = await ctx.orm.User.create(ctx.request.body)
        ctx.body = user;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("users.list", "/", async(ctx)=>{
    try{
        const users = await ctx.orm.User.findAll();
        ctx.body = users
        ctx.status = 200
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("users.show", "/:id", async(ctx)=>{
    try{
        const user = await ctx.orm.User.findByPk(ctx.params.id);
        ctx.body = user
        ctx.status = 200
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.delete("users.destroy", "/:id", async (ctx) => {
    try {
      const user = await ctx.orm.User.findByPk(ctx.params.id);
      if (!user) {
        ctx.status = 404;
        ctx.body = "El usuario no existe";
        return;
      }
  
      await user.destroy();
  
      ctx.status = 200;
      ctx.body = "El usuario ha sido eliminado correctamente";
    } catch (error) {
      ctx.status = 400;
      ctx.body = error;
    }
});
module.exports = router;