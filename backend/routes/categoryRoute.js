const express = require("express")
const router = express.Router()
const categoryController = require("../controllers/categoryController")

router.post("/create", categoryController.createCat)
router.get("/getAllCategories", categoryController.getAllCategory)
router.get("/getOneCategory/:id", categoryController.getOneCategory)
router.put("/updateCategoryTitle", categoryController.updateCategoryTitle)
router.delete("/deleteOneCategory/:id", categoryController.deleteOneCategory)
router.post("/deleteMultipleCategory", categoryController.deleteMultipleCategory)

module.exports = router