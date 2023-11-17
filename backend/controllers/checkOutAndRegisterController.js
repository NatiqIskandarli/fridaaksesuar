const sequelize = require("../config/config");
const OrdersModel = require("../models/ordersModel")
const OrderDetailsModel = require("../models/orderDetailsModel")
const ShoppingCartModel = require("../models/shoppingCart")
const ProfitModel = require("../models/profitModel");
const UserModel = require("../models/userModel");
const ProfileModel = require("../models/profileModel");
const { moveOrderFromCartToOrders } = require("./profitController");


class CheckOutAndRegisterController{
   
    async checkOutRegister(req,res){
         
        try{
        const {fullData} = req.body;       
         
        const infos = {
            firstName : fullData.billingAddress.firstName,
            lastName : fullData.billingAddress.lastName,             
            adress : fullData.billingAddress.city + " " + fullData.billingAddress.street1,
            phone : fullData.billingAddress.phone,
            password : fullData.billingAddress.password,
            email : fullData.billingAddress.email,
            productId : fullData.items,
            sponsorId: fullData.sponsorId,
            totalAmount: fullData.totalAmount,
            totalQuantity : fullData.totalQuantity
        }
        
              
        const checkEmail = await UserModel.findOne({where : {email : infos.email}})
        if(checkEmail){
            return res.json({message : "Bu email mövcuddur"})
        }
        const user = await UserModel.create({
            email: infos.email,
            password: infos.password,
            sponsorId: infos.sponsorId})

        const profilePromise = ProfileModel.create({
            firstName: infos.firstName,
            lastName: infos.lastName,
            adress: infos.adress,
            phone: infos.phone,
            userId: user.id
        });

        const shoppingCartPromises = infos.productId.map((prodId) => {
            return ShoppingCartModel.create({
                productId : prodId.productId,
                quantity : prodId.stockQuantity,
                pricePerUnit : prodId.salePrice,
                totalAmount : prodId.salePrice * prodId.stockQuantity,
                userId :  user.id
            })
        });

        
        
        const results = await Promise.all([profilePromise, ...shoppingCartPromises]);
        const addToProfile = results[0];
        const addToBasket = results.slice(1);
       
        if(addToBasket){
            const orderResult = await moveOrderFromCartToOrders(user.id)

            return res.status(200).json({
                user : user, 
                profile: addToProfile, 
                addToBasket: addToBasket, 
                order: orderResult
            })
        }
          

      } catch (error){
        return res.status(500).json({ error: error.message });
      }
    }



}

module.exports = new CheckOutAndRegisterController