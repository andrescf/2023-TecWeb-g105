const Router = require('koa-router')
const jwtMiddleware = require('koa-jwt')
const users = require('./routes/users.js')
const players = require('./routes/player.js')
const npcs = require('./routes/npc.js')
const hexagons = require('./routes/hexagon.js')
const games = require('./routes/game.js')
const buildings = require('./routes/building.js')
const boards = require('./routes/board.js')
const auth = require('./routes/authentication.js')
const dotenv = require('dotenv')

dotenv.config()


const router = new Router()

router.use('/users', users.routes());
router.use('/players', players.routes());
router.use('/npcs', npcs.routes());
router.use('/hexagons', hexagons.routes());
router.use('/games', games.routes());
router.use('/buildings', buildings.routes());
router.use('/boards', boards.routes());
router.use(auth.routes());
router.use(jwtMiddleware( { secret: process.env.JWT_SECRET}))

module.exports = router