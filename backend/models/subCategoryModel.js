const {DataTypes} = require("sequelize")
const sequelize = require("../config/config")

const subCategoryModel = sequelize.define("SubCategory",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    categoryId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

//hasone category

module.exports = subCategoryModel