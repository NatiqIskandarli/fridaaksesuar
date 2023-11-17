const express = require("express")
const router = express.Router()

const addToBasketController = require("../controllers/addToBasketController")

router.post("/addToBasket",addToBasketController.addTo)

module.exports = router