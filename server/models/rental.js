// server/models/rental.js
module.exports = (sequelize, DataTypes) => {
    const Rental = sequelize.define('Rental', {
        RentalID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        BookingID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        CheckInDate: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        CheckOutDate: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        CustomerSIN: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Customer',
                key: 'SIN'
            }
        },
        RoomNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Room',
                key: 'RoomNumber'
            }
        },
        EmployeeSIN: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Employee',
                key: 'SIN'
            }
        }
    }, {
        tableName: 'Rental'
    });

    return Rental;
};
