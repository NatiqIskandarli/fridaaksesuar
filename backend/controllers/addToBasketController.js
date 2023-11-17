const ShoppingCartModel = require("../models/shoppingCart")

class AddToBasketController{
    async addTo(req,res){
        const {productId,quantity,pricePerUnit,userId} = req.body

        const totalAmount = quantity * pricePerUnit;

        try {            
            const addToCart = await ShoppingCartModel.create({productId,quantity,pricePerUnit,totalAmount,userId})
    
            return res.json({addToCart})
        } catch (error) {
            return res.json({message : "user not found on users table"})
        }
    }

}

module.exports = new AddToBasketController