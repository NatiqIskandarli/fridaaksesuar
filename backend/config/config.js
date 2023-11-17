const {Sequelize} = require("sequelize")
require("dotenv").config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        dialect : 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
            max: 5,     
            min: 0,     
            acquire: 30000,  
            idle: 10000  
        },
        dialectOptions: {
            ssl: {
                require: true, 
                rejectUnauthorized: false
            }
        }
    }
)

module.exports = sequelize