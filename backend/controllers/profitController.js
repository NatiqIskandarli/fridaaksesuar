const sequelize = require("../config/config");
const ProfitModel = require("../models/profitModel");
const UserModel = require("../models/userModel");
const OrdersModel = require("../models/ordersModel")
const OrderDetailsModel = require("../models/orderDetailsModel")
const ShoppingCartModel = require("../models/shoppingCart")

const ProfitController = {
    //add

    //update

    //fetchAll

    async getBalansById(req,res){
      try {
        const {id} = req.params
        console.log(id)

        const user = await UserModel.findByPk(id,{
          include: [{
              model: ProfitModel,
              as: 'profit'
          }]
        });
        
        if (user && user.profit) {
            const { earnedMoney = 0, levelName } = user.profit;
          return res.status(200).json({earnedMoney,levelName});
        } else {
          return res.status(200).json({message: 'User not found or no associated profit'});
        }
        
      } catch (error) {
        return res.status(500).json({message: "sehv yarandi"})
      }
    },


    //fetchById
    getDownlineUserId: async (userId) => {
        try {
            const user = await UserModel.findByPk(userId,{
                include: [{
                    model: ProfitModel,
                    as: 'profit'
                }]
            });

            if (user && user.profit) {
                const { earnedMoney = 0, levelName } = user.profit;
            return {earnedMoney,levelName};
            } else {
                    console.log('User not found or no associated profit');
                    return 0;
            }
        } catch (error) {
            console.error(`Error fetching profit information for userId: ${userId}`, error);
            throw error; 
        }
    },


    moveOrderFromCartToOrders : async (userId) =>{
        const paymentStatus = "completed"
        const t = await sequelize.transaction();      
        try {
          const order = await OrdersModel.create({ userId }, { transaction: t });
          const cartItems = await ShoppingCartModel.findAll({ where: { userId } }, { transaction: t });
          
          for (const item of cartItems) {
            order.totalAmount += item.pricePerUnit * item.quantity;
            await OrderDetailsModel.create({
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              pricePerUnit: item.pricePerUnit,
              totalAmount: order.totalAmount
            }, { transaction: t });      
            
          }

          
          await order.save({ transaction: t });
          await ShoppingCartModel.destroy({ where: { userId } }, { transaction: t });
          let levelName = '';
      
          if (paymentStatus === "completed" && order.totalAmount > 99 && order.totalAmount < 300) {
            const earnedMoney = parseFloat(order.totalAmount * process.env.F_005);      
      
            levelName = 'Lider';      
            await ProfitModel.create({ userId, levelName, earnedMoney }, { transaction: t });
      
          }else if (paymentStatus === "completed" && order.totalAmount > 299 && order.totalAmount < 900) {
            const earnedMoney = parseFloat(order.totalAmount * process.env.F_007);      
      
            levelName = 'Lider';      
            await ProfitModel.create({ userId, levelName, earnedMoney }, { transaction: t });
            
          }else if (paymentStatus === "completed" && order.totalAmount > 899 && order.totalAmount < 1500) {
            const earnedMoney = parseFloat(order.totalAmount * process.env.F_009);      
      
            levelName = 'Lider';    
            await ProfitModel.create({ userId, levelName, earnedMoney }, { transaction: t });
            
          }else if (paymentStatus === "completed" && order.totalAmount > 1499 && order.totalAmount < 3000) {
            const earnedMoney = parseFloat(order.totalAmount * process.env.F_012);      
      
            levelName = 'Baş Lider';    
            await ProfitModel.create({ userId, levelName, earnedMoney }, { transaction: t });
            
          }else if (paymentStatus === "completed" && order.totalAmount > 2999 && order.totalAmount < 5000) {
            const earnedMoney = parseFloat(order.totalAmount * process.env.F_015);      
      
            levelName = 'Baş Lider';    
            await ProfitModel.create({ userId, levelName, earnedMoney }, { transaction: t });
            
          }else if (paymentStatus === "completed" && order.totalAmount > 4999 && order.totalAmount < 7500) {
            const earnedMoney = parseFloat(order.totalAmount * process.env.F_018);
      
            levelName = 'Baş Lider';    
            await ProfitModel.create({ userId, levelName, earnedMoney }, { transaction: t });
            
          }else if (paymentStatus === "completed" && order.totalAmount >= 7500) {
            const earnedMoney = parseFloat(order.totalAmount * process.env.F_020);      
      
            levelName = 'Direktor';    
            await ProfitModel.create({ userId, levelName, earnedMoney }, { transaction: t });
            
          }
      
      
          await t.commit();
          console.log('Order processed successfully');

          return 1

        } catch (error) {
          if (t.finished !== 'commit') {
            await t.rollback();
          }
          console.error('Error processing order:', error);
          return 2
      
        }
      }
      
    
}

module.exports = ProfitController