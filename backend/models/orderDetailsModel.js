const {DataTypes} = require("sequelize")
const sequelize = require("../config/config")

const OrderDetailsModel = sequelize.define("OrderDetails",{
    id: {
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
        allowNull: true
    },
    totalAmount:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    productId:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    orderId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }

})

//orderid forein key
//product id forein key

module.exports = OrderDetailsModel