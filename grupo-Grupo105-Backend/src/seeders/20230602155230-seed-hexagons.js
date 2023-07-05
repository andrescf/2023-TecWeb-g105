module.exports = {
  up: (queryInterface) => {
    // queryInterface.bulkInsert('Hexagons', 
    // {
    //   boardId: 1,
    //   playerId: 1,
    //   position: 10,
    //   height: 10,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },
    // {
    //   boardId: 1,
    //   playerId: 1,
    //   position: 10,
    //   height: 11,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },
    // {
    //   boardId: 1,
    //   playerId: 2,
    //   position: 11,
    //   height: 11,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },
    // {
    //   boardId: 1,
    //   playerId: 2,
    //   position: 9,
    //   height: 9,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },
    // {
    //   boardId: 1,
    //   playerId: 2,
    //   position: 13,
    //   height: 10,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },
    // {
    //   boardId: 1,
    //   playerId: 2,
    //   position: 10,
    //   height: 13,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },
    // {
    //   boardId: 1,
    //   playerId: 2,
    //   position: 11,
    //   height: 10,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // })
  },
  down: (queryInterface) => queryInterface.bulkDelete('Hexagons', null, {}),
}
