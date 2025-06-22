// server/models/booking.js
module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
        BookingID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        RegisterDate: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        StartDate: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        EndDate: {
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
        tableName: 'Booking'
    });

    return Booking;
};
