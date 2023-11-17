const express = require("express")
const router = express.Router()
const multer = require('multer');
const productController = require("../controllers/productController")
const upload = multer({ storage: multer.memoryStorage() });

router.post('/add',productController.createProduct)
router.get('/getListProducts',productController.getAllProducts)
router.get('/getAllProductsBySub/:id',productController.getAllProductsBySub)
router.get('/getOneProduct/:id',productController.getProductById)
router.get('/getOneProductImages/:id',productController.getOneProductImages)
router.post('/updProduct',productController.updateProduct)
router.delete('/deleteOneProduct/:id',productController.deleteProduct)
router.delete('/deleteImageByProd/:id',productController.deleteImageByProd)
router.post('/deleteMultipleProduct',productController.deleteMultipleProduct)

module.exports = router
