module.exports = (sequelize, DataTypes) => {
    const HotelChain = sequelize.define('HotelChain', {
      ChainID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // if ChainID is auto-incrementing
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
      }
    }, {
      tableName: 'HotelChain'
    });
  
    return HotelChain;
  };
  