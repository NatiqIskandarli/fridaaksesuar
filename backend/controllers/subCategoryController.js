const CategoryModel = require("../models/categoryModel")
const subCategoryModel = require("../models/subCategoryModel")

class SubCategoryController{
    //create
    async createSub(req,res){
        const {title, categoryId} = req.body
        if(!title){
            return res.json({message: "Alt Kateqoriya adini mutleq yazmaq lazimdir"})
        }

        if(!categoryId){
            return res.json({message: "Kateqoriya secimi etmemisiz"})
        }

        try {
            await subCategoryModel.create({title, categoryId})
            return res.status(200).json({message: "Alt Kateqoriya elave edildi"})
        } catch (error) {
            return res.json({message: "Elave edilmedi"})
        }
       
    }


    //update
    async updateSubCategoryTitle(req,res){
        const {id, title, categoryId} = req.body.updData
        
        try {
            const category  = await subCategoryModel.findByPk(id)
            if(category){
                const updateValues = { title: title, categoryId : categoryId }
                await subCategoryModel.update(updateValues, {where : {id: id}})
                return res.status(201).json({message: "Alt Kateqoriya Yenilendi"})
            }else{
                return res.status(201).json({message: "Alt Kateqoriya tapilmadi"})
            }            
            
        } catch (error) {
            return res.json({message: "Alt Kateqoriya adi yenilenmedi"})
        }        
    }

    //getAll
    async getAllSubCategory(req,res){
        try {
            const categoryAll = await subCategoryModel.findAll();
            return res.status(200).json(categoryAll)
        } catch (error) {
            return res.status(404).json({message: 'Alt Kateqoriyadan melumatlar gelmedi'})
        }
    }

    //getOne
    async getOneSubCategory(req,res){
        const {id} = req.params
        try{
            const getOne = await subCategoryModel.findOne({where: {id}})
            return res.status(201).json(getOne)
        } catch(err){
            return res.status(404).json({message: 'Alt Kateqoriyadan melumat gelmedi'})
        }        
    }

    //getEditOne
    async getOneEditSubCategory(req,res){
        const {id} = req.params
        try{
            const result = await subCategoryModel.findOne({where: {categoryId : id}})
            if(result){
                const resultCat = await CategoryModel.findOne({where: {id}})
                return res.status(201).json(resultCat)
            }
        } catch(err){
            return res.status(404).json({message: 'Alt Kateqoriyanin Kateqoriyasi movcud deyil'})
        }        
    }

    //delete
    async deleteOneSubCategory(req,res){
        const {id} = req.params
        try{
            const result  = await subCategoryModel.destroy({where: {id}})
            if (result > 0) {
                return res.status(201).json({message: 'Alt Kateqoriya silindi'})
            }else{
                return res.status(404).json({message: 'Alt Bu kateqoriya tapilmadi'})
            }
        } catch(err){
            return res.status(404).json({message: 'Alt Kateqoriyadan melumat gelmedi'})
        }        
    }

    //delete multiple
    async deleteMultipleSubCategory(req,res){
        const {ids} = req.body
        
        try{
            const result  = await subCategoryModel.destroy({where: {id: ids}})
            if (result > 0) {
                return res.status(201).json({message: 'Alt Kateqoriya silindi'})
            }else{
                return res.status(404).json({message: 'Bu Alt kateqoriya tapilmadi'})
            }
        } catch(err){
            return res.status(404).json({message: 'Alt Kateqoriyadan melumat gelmedi'})
        }        
    }
}

module.exports = new SubCategoryController