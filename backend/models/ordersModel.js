const {DataTypes} = require("sequelize")
const sequelize = require("../config/config")

const OrdersModel = sequelize.define("Orders",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    orderStatus: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    shippingAddress: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

//userid forein key

module.exports = OrdersModel;