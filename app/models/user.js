const Sequelize = require("sequelize");

module.exports = function (sequelize, Sequelize) {

    var User = sequelize.define("user", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            login: {
                type: Sequelize.STRING,
                allowNull: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'user',
            createdAt: false,
            updatedAt: false
        });


    return User;

}