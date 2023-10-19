const { sequelize } = require("../database/database");
const Sequelize = require("sequelize");
const Ticket = require("./ticket");

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  technician: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

User.hasMany(Ticket)

module.exports = User;