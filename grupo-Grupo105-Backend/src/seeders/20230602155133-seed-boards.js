module.exports = {
  up: (queryInterface) => {
    // queryInterface.bulkInsert('Boards', [
    //   {
    //     gameId: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ]),
  },
  down: (queryInterface) => queryInterface.bulkDelete('Boards', null, {}),
};

