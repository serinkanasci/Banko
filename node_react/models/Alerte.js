const Sequelize = require('sequelize');
const db = require('../database/db.js');

module.exports = db.sequelize.define(
  'alerte',
  {
    idalerte: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    iduser: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    },
    creationdate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)