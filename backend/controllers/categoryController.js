const CategoryModel = require("../models/categoryModel")


class CategoryController{
    //create
    async createCat(req,res){
        const {title} = req.body
        if(!title){
            return res.json({message: "Kateqoriya adini mutleq yazmaq lazimdir"})
        }
        try{
            await CategoryModel.create({title})
            return res.status(200).json({message: "Kateqoriya elave edildi"})
        }catch(error){            
            return res.json({message: "Elave edilmedi"})
        }        
    }
    

    //update
    async updateCategoryTitle(req,res){
        const {id, title} = req.body.updData    
        
        try {
            const category  = await CategoryModel.findByPk(id)
            if(category){
                const updateValues = { title: title }
                const updateCategory = await CategoryModel.update(updateValues, {where : {id: id}})
                return res.status(201).json({message: "Kateqoriya Yenilendi"})
            }else{
                return res.status(201).json({message: "Kateqoriya tapilmadi"})
            }            
            
        } catch (error) {
            return res.json({message: "Kateqoriya adi yenilenmedi"})
        }        
    }

    //getAll
    async getAllCategory(req,res){
        try {
            const categoryAll = await CategoryModel.findAll();
            return res.status(200).json(categoryAll)
        } catch (error) {
            return res.status(404).json({message: 'Kateqoriyadan melumatlar gelmedi'})
        }
    }

    //getOne
    async getOneCategory(req,res){
        const {id} = req.params
        try{
            const getOne = await CategoryModel.findOne({where: {id}})
            return res.status(201).json(getOne)
        } catch(err){
            return res.status(404).json({message: 'Kateqoriyadan melumat gelmedi'})
        }        
    }

    //delete
    async deleteOneCategory(req,res){
        const {id} = req.params
        try{
            const result  = await CategoryModel.destroy({where: {id}})
            if (result > 0) {
                return res.status(201).json({message: 'Kateqoriya silindi'})
            }else{
                return res.status(404).json({message: 'Bu kateqoriya tapilmadi'})
            }
        } catch(err){
            return res.status(404).json({message: 'Kateqoriyadan melumat gelmedi'})
        }        
    }

    //delete multiple
    async deleteMultipleCategory(req,res){
        const {ids} = req.body
        
        try{
            const result  = await CategoryModel.destroy({where: {id: ids}})
            if (result > 0) {
                return res.status(201).json({message: 'Kateqoriya silindi'})
            }else{
                return res.status(404).json({message: 'Bu kateqoriya tapilmadi'})
            }
        } catch(err){
            return res.status(404).json({message: 'Kateqoriyadan melumat gelmedi'})
        }        
    }
}

module.exports = new CategoryController