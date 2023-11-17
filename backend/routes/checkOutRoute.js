const express = require("express")
const router = express.Router()
const checkOutController = require("../controllers/checkOutController")
const checkOutAndRegisterController = require("../controllers/checkOutAndRegisterController")
const checkOutSponsorLimit = require("../middleware/checkOutSponsorLimit")

router.post('/checkOut',checkOutController.moveOrderFromCartToOrders)
router.post('/checkOutRegister',checkOutSponsorLimit,checkOutAndRegisterController.checkOutRegister)

module.exports = router
