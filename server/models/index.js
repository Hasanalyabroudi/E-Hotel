// server/models/index.js
const Sequelize = require('sequelize');
const sequelize = new Sequelize('ehotelsProject', 'postgres', 'hasanmsdm5', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

const models = {
  HotelChain: require('./hotelChain')(sequelize, Sequelize.DataTypes),
  Hotel: require('./hotel')(sequelize, Sequelize.DataTypes),
  Room: require('./room')(sequelize, Sequelize.DataTypes),
  Customer: require('./customer')(sequelize, Sequelize.DataTypes),
  Employee: require('./employee')(sequelize, Sequelize.DataTypes),
  Booking: require('./booking')(sequelize, Sequelize.DataTypes),
  Rental: require('./rental')(sequelize, Sequelize.DataTypes),
  Archive: require('./archive')(sequelize, Sequelize.DataTypes),
  // any other models
};

// Define associations here
models.Hotel.belongsTo(models.HotelChain, { foreignKey: 'ChainID' });
models.HotelChain.hasMany(models.Hotel, { foreignKey: 'ChainID' });
models.Hotel.hasMany(models.Room, { foreignKey: 'HotelID' });
models.Room.belongsTo(models.Hotel, { foreignKey: 'HotelID' });
models.Booking.belongsTo(models.Customer, { foreignKey: 'CustomerSIN' });
models.Booking.belongsTo(models.Employee, { foreignKey: 'EmployeeSIN' });
models.Rental.belongsTo(models.Employee, { foreignKey: 'EmployeeSIN' });

// Optionally, if you have other relations, define them here as well

// Sync models
async function syncModels() {
  try {
    // Sync models individually in the desired order
    await models.HotelChain.sync();
    await models.Hotel.sync();
    await models.Room.sync();
    await models.Customer.sync();
    await models.Employee.sync();
    await models.Booking.sync();
    await models.Rental.sync();
    await models.Archive.sync();
    console.log('All tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

syncModels();

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;