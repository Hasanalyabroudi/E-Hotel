module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
      SIN: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      HotelID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Hotel', // Assuming you have a Hotel model defined elsewhere
          key: 'HotelID'
        }
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'Employee'
    });
  
    return Employee;
  };
  