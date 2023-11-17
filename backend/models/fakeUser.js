const {DataTypes} = require("sequelize")
const sequelize = require("../config/config")

const fakeUserModel = sequelize.define("fakeUser",{
    fakeid:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user:{
        type:DataTypes.STRING,
        allowNull: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: true
    },
    vezifesi:{
        type: DataTypes.STRING,
        allowNull: true
    },
    ad:{
        type: DataTypes.STRING,
        allowNull: true
    },
    id:{
        type: DataTypes.INTEGER
    },
    soyad:{
        type: DataTypes.STRING,
        allowNull: true
    },
    vesiqeFin:{
        type: DataTypes.STRING,
        allowNull: true
    },
    telefon:{
        type: DataTypes.STRING,
        allowNull: true
    },
    kiminqrupu:{
        type: DataTypes.STRING,
        allowNull: true
    },
    maas:{
        type: DataTypes.STRING,
        allowNull: true
    },
    maasdanfaiz:{
        type: DataTypes.STRING,
        allowNull: true
    },
    daxiletpulcemi:{
        type: DataTypes.STRING,
        allowNull: true
    },
    
}) 


module.exports = fakeUserModel