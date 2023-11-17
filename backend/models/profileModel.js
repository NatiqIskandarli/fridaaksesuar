const {DataTypes} = require("sequelize")
const sequelize = require("../config/config")

const ProfileModel = sequelize.define("Profile",{
    profileId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    adress:{
        type: DataTypes.STRING,
        allowNull: false
    },
    // userId:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
})

//userid ni hasone ederik

module.exports = ProfileModel