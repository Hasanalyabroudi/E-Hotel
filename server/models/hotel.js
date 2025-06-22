module.exports = (sequelize, DataTypes) => {
    const Hotel = sequelize.define('Hotel', {
      HotelID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // if HotelID is auto-incrementing
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      PhoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      Rating: {
        type: DataTypes.INTEGER,
        validate: {
          max: 5 // Ensure the rating does not exceed 5
        }
      },
      ChainID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'HotelChain',
          key: 'ChainID'
        }
      }
    }, {
      tableName: 'Hotel'
    });
  
    return Hotel;
  };
  