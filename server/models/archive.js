// server/models/archive.js
module.exports = (sequelize, DataTypes) => {
    const Archive = sequelize.define('Archive', {
        ArchiveID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        BookingID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        CustomerSIN: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        RentalID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        RoomNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'Archive'
    });

    return Archive;
};
