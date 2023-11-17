const express = require("express")
const router = express.Router()
const profitController = require("../controllers/profitController")
const orderController = require("../controllers/orderController")

router.get('/getBalansById/:id',profitController.getBalansById)
router.get('/getMyOrders/:id',orderController.getMyOrders)
router.get('/getMyOrderById/:id/:userId',orderController.getMyOrderById)

module.exports = router
