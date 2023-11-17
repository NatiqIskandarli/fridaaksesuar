const express = require("express")
const route = express.Router()
const userRoute = require("./userRoute")
const productRoute = require("./productRoute")
const checkOutRoute = require("./checkOutRoute")
const addToBasketRoute = require("./addToBasket")
const categoryRoute = require("./categoryRoute")
const subCategoryRoute = require("./subCategoryRoute")
const profitRoute = require("./profitRoute")

route.use("/user",userRoute)
route.use("/product",productRoute)
route.use("/product",checkOutRoute)
route.use("/product",addToBasketRoute)
route.use("/category",categoryRoute)
route.use("/subcat",subCategoryRoute)
route.use("/profit",profitRoute)

module.exports = route