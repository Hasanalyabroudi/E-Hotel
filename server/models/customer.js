module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
      // Existing attributes
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
        type: DataTypes.TEXT,
        allowNull: false
      },
      RegistrationDate: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      // Add the Password field
      Password: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      // Model options
      tableName: 'Customer',
      timestamps: false, // if you don't have createdAt and updatedAt fields
    });
  
    return Customer;
  };
  