module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Players', [
    {
      userId: 1,
      gameId: 1,
      name: "wrapper_gaj",
      resources: 100,
      state: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 2,
      gameId: 1,
      name: 'wrapper',
      resources: 100,
      state: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 3,
      gameId: 1,
      name: "wropper_gaj",
      resources: 100,
      state: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 4,
      gameId: 1,
      name: "wripper_gaj",
      resources: 100,
      state: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Players', null, {}),
}
