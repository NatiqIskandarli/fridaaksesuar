const {DataTypes} = require("sequelize")
const sequelize = require("../config/config")

const ShoppingCartModel = sequelize.define("Shopping_cart",{
    cartId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pricePerUnit:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalAmount:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

//userid fk
//product id fk

module.exports = ShoppingCartModel