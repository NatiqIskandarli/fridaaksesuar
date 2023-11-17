const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const checkSponsorLimit = require("../middleware/checkSponsorLimit")

router.post('/register',checkSponsorLimit,userController.register)
router.post('/addNetwork',checkSponsorLimit,userController.addNetwork)
router.get('/list',userController.getAll)
router.get('/getUser',userController.getOneUser)
router.get('/getMyAdress/:id',userController.getMyAdress)
router.get('/getMyPass/:id',userController.getMyPass)
router.get('/:userId/downline', userController.getUserDownline);
router.post('/saveAdress',userController.saveAdress)
router.post('/saveMyPass',userController.saveMyPass)

router.get('/inteqrasiya',userController.inteqrasiya)

module.exports = router
