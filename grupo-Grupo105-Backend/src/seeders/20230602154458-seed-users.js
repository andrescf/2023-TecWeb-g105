module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      username: 'wrapper_gaj',
      password: 'lolazo',
      mail: 'wrapper@sos.cl',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'wrapper',
      password: 'lolazos',
      mail: 'wrapper_2@sos.cl',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'wrapp',
      password: 'leloalsz',
      mail: 'wrapp@ses.cl',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'wrip',
      password: 'qweasda',
      mail: 'adasd@sos.cl',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
}