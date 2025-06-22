const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ehotelsProject', 'postgres', 'hasanmsdm5', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

module.exports = sequelize;
