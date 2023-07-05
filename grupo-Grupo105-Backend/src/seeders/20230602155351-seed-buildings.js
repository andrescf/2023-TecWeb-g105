module.exports = {
  up: (queryInterface) => {
    // queryInterface.bulkInsert('Buildings', 
    // {
    //   type: "gimnasio",
    //   occupiedCapacity: 0,
    //   currentCapacity: 20,
    //   level: 1,
    //   hexagonId: 1,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },
    // {
    //   type: "gimnasio",
    //   occupiedCapacity: 0,
    //   currentCapacity: 20,
    //   level: 1,
    //   hexagonId: 2,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },
    // {
    //   type: "gimnasio",
    //   occupiedCapacity: 0,
    //   currentCapacity: 20,
    //   level: 1,
    //   hexagonId: 3,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },
    // {
    //   type: "gimnasio",
    //   occupiedCapacity: 0,
    //   currentCapacity: 20,
    //   level: 1,
    //   hexagonId: 5,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },
    // {
    //   type: "gimnasio",
    //   occupiedCapacity: 0,
    //   currentCapacity: 20,
    //   level: 1,
    //   hexagonId: 6,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },
    // {
    //   type: "gimnasio",
    //   occupiedCapacity: 0,
    //   currentCapacity: 20,
    //   level: 1,
    //   hexagonId: 7,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // })
  },
  down: (queryInterface) => queryInterface.bulkDelete('Buildings', null, {}),
}
