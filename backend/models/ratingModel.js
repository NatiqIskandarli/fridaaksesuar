const {DataTypes} = require("sequelize")
const sequelize = require("../config/config")

const RatingModel = sequelize.define('Rating',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

module.exports = RatingModel