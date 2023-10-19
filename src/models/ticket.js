const { sequelize } = require("../database/database");
const Sequelize = require("sequelize");

const Ticket = sequelize.define('tickets', {
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
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  observation: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  detail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  technicalId: {
    type: Sequelize.NUMBER,
    allowNull: true
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'Aberto'
  },
  open: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Ticket;