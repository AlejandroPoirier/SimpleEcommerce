const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'BDcontra2022', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
