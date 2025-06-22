module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('Room', {
      RoomNumber: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      Price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Amenities: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      RoomView: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Extendable: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      Damages: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      HotelID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Hotel',
          key: 'HotelID'
        }
      }
    }, {
      tableName: 'Room'
    });
  
    return Room;
  };
  