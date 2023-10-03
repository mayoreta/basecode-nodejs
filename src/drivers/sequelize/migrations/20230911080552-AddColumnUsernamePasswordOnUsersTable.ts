const table = 'users'

const migration = {
  up: async (queryInterface: any, Sequelize: any) =>
    Promise.all([
      queryInterface.addColumn(table, 'username', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn(table, 'password', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]).then(() => {
      ;['username'].forEach((field) => {
        queryInterface.addIndex(table, {
          fields: [field],
          name: `${table}_${field}_index`,
        })
      })
    }),
  down: async (queryInterface: any) =>
    Promise.all([
      queryInterface.removeColumn(table, 'username'),
      queryInterface.removeColumn(table, 'password'),
    ]),
}

export = migration
