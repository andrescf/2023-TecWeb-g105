module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Games', [
    {
      state: 'notinitiate',
      winner: 'none',
      turn: 1,
      turn_list: [1],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      state: 'notinitiate',
      winner: 'none',
      turn: 1,
      turn_list: [1],
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Games', null, {}),
}
