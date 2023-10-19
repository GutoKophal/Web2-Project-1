const { sequelize } = require("../database/database");
const Sequelize = require("sequelize");

const Status = sequelize.define('status', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Status;