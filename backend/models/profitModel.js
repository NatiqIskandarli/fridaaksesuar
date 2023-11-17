const {DataTypes} = require("sequelize")
const sequelize = require("../config/config")

const ProfitModel = sequelize.define("Profit",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    levelName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    earnedMoney:{
        type: DataTypes.DECIMAL,
        allowNull: true
    }
}, {
    timestamps: true
})

//userid foreign key
// refer id foreign key
// order id foreign key

module.exports = ProfitModel