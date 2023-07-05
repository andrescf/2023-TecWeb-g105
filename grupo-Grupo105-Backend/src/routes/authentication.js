const Router = require('koa-router')
var jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const router = new Router()

router.post('authentication.signup', '/signup', async(ctx) => {
    const authInfo = ctx.request.body
    let user = await ctx.orm.User.findOne( {
        where: {
            mail: authInfo.mail
        }
    })

    if (user) {
        ctx.body = { error: "Un usuario con este correo ya existe" }
        ctx.status = 400
        return
    }

    try {
        user = await ctx.orm.User.create({
            username: authInfo.username,
            password: authInfo.password,
            mail: authInfo.mail
        })
    } catch (error) {
        ctx.body = error
        ctx.status = 400
        return
    }

    ctx.body = {
        username: user.username,
        mail: user.mail
    }
    ctx.status = 201
})

router.post('authentication.login', '/login', async(ctx) => {
    let user
    const authInfo = ctx.request.body

    try {
        user = await ctx.orm.User.findOne( {
            where: {
                mail: authInfo.mail
            }
        })
    } catch (error) {
        ctx.body = error
        ctx.status = 400
        return
    }

    if (!user) {
        ctx.body = { error: "Un usuario con este correo no fue encontrado" }
        ctx.status = 400
        return
    }

    if (user.password == authInfo.password) {
        ctx.body = {
            username: user.username,
            mail: user.mail
        }
        ctx.status = 200
    } else {
        ctx.body = { error: "Contrasena incorrecta" }
        ctx.status = 400
    }

    const expirationSeconds = 1 * 60 * 60 * 24
    const JWT_PRIVATE_KEY = process.env.JWT_SECRET
    var token = jwt.sign(
        { scope: ['user'] },
        JWT_PRIVATE_KEY,
        { subject: user.id.toString() },
        { expiresIn: expirationSeconds}
    )

    ctx.body = {
        "access_token": token,
        "token_type": "Bearer",
        "expires_in": expirationSeconds
    }
    ctx.status = 200
})

module.exports = router