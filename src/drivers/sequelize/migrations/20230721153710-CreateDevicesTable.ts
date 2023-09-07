const table = 'devices'

const migration = {
  up: async (queryInterface: any, Sequelize: any) =>
    Promise.all([
      queryInterface
        .createTable(table, {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          ref_id: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: null,
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          deleted_at: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: null,
          },
        })
        .then(() => {
          ;['ref_id'].forEach((field) => {
            queryInterface.addIndex(table, {
              fields: [field],
              name: `${table}_${field}_index`,
            })
          })
        }),
    ]),

  down: async (queryInterface: any) =>
    Promise.all([queryInterface.dropTable(table)]),
}

export = migration
