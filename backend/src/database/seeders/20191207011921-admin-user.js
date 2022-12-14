const bcrypt = require('bcryptjs')

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'Administrador',
        email: 'admin@gympoint.com',
        password_hash: bcrypt.hashSync('123456789', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users')
  },
}
