const { Sequelize } = require("sequelize")

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './databaser.sqlite'
})

module.exports = { sequelize }