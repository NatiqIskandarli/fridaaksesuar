const express = require("express")
const router = express.Router()
const subCategoryController = require("../controllers/subCategoryController")

router.post("/create", subCategoryController.createSub)
router.get("/getAllSubCategories", subCategoryController.getAllSubCategory)
router.get("/getOneSubCategory/:id", subCategoryController.getOneSubCategory)
router.get("/getOneEditSubCategory/:id", subCategoryController.getOneEditSubCategory)
router.put("/updateSubCategoryTitle", subCategoryController.updateSubCategoryTitle)
router.delete("/deleteOneSubCategory/:id", subCategoryController.deleteOneSubCategory)
router.post("/deleteMultipleSubCategory", subCategoryController.deleteMultipleSubCategory)

module.exports = router