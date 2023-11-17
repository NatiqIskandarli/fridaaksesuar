const {DataTypes} = require("sequelize")
const sequelize = require("../config/config")

const UserModel = sequelize.define("user",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    sponsorId:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{
    indexes :[
        { unique: false, fields:['email']}
    ]
}) 

// UserModel.belongsTo(UserModel, { as: 'Sponsor', foreignKey: 'sponsorId' });
// UserModel.hasMany(UserModel, { as: 'SponsoredUsers', foreignKey: 'sponsorId' });

module.exports = UserModel