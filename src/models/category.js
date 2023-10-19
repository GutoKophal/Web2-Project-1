const { sequelize } = require("../database/database");
const Sequelize = require("sequelize");

const Category = sequelize.define('categories', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Category;