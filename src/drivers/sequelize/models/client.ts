import { Table, Model, Column, DataType } from 'sequelize-typescript'

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  engine: 'InnoDB',
  charset: 'utf8',
  tableName: 'clients',
})
class Client extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  refId!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string
}

export = Client
