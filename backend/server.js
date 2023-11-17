const express = require("express")
const cors = require("cors")
const sequelize = require("./config/config")
const router = require("./routes/index")
const fileUpload = require('express-fileupload')
require("dotenv").config()
require("./relation")
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'uploads')))
app.use(fileUpload({}))

app.use("/api",router)

sequelize.authenticate()
.then(()=>{
    console.log('Database connected..')
    return sequelize.sync()
}).then(()=>{
    app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))
}).catch(err=>console.log(err))

///en sonda index-lesme edersen db-de

//module.exports = app//vercel ucun

