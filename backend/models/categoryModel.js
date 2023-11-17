const {DataTypes} = require("sequelize")
const sequelize = require("../config/config")

const CategoryModel = sequelize.define("Category",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = CategoryModel;