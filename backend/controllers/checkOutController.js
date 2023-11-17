const sequelize = require("../config/config");
const OrdersModel = require("../models/ordersModel")
const OrderDetailsModel = require("../models/orderDetailsModel")
const ShoppingCartModel = require("../models/shoppingCart")
const ProfitModel = require("../models/profitModel");
const UserModel = require("../models/userModel");

class CheckOutController{
   
async moveOrderFromCartToOrders(req,res){
  const {userId, paymentStatus} = req.body
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
      const earnedMoney = order.totalAmount * process.env.F_005;      

      levelName = 'Lider';      
      await ProfitModel.create({ userId, levelName, earnedMoney }, { transaction: t });

    }else if (paymentStatus === "completed" && order.totalAmount > 299 && order.totalAmount < 900) {
      const earnedMoney = order.totalAmount * process.env.F_007;      

      levelName = 'Lider';      
      await ProfitModel.create({ userId, levelName, earnedMoney }, { transaction: t });
      
    }else if (paymentStatus === "completed" && order.totalAmount > 899 && order.totalAmount < 1500) {
      const earnedMoney = order.totalAmount * process.env.F_009;      

      levelName = 'Lider';    
      await ProfitModel.create({ userId, levelName, earnedMoney }, { transaction: t });
      
    }else if (paymentStatus === "completed" && order.totalAmount > 1499 && order.totalAmount < 3000) {
      const earnedMoney = order.totalAmount * process.env.F_012;      

      levelName = 'Baş Lider';    
      await ProfitModel.create({ userId, levelName, earnedMoney }, { transaction: t });
      
    }else if (paymentStatus === "completed" && order.totalAmount > 2999 && order.totalAmount < 5000) {
      const earnedMoney = order.totalAmount * process.env.F_015;      

      levelName = 'Baş Lider';    
      await ProfitModel.create({ userId, levelName, earnedMoney }, { transaction: t });
      
    }else if (paymentStatus === "completed" && order.totalAmount > 4999 && order.totalAmount < 7500) {
      const earnedMoney = order.totalAmount * process.env.F_018;

      levelName = 'Baş Lider';    
      await ProfitModel.create({ userId, levelName, earnedMoney }, { transaction: t });
      
    }else if (paymentStatus === "completed" && order.totalAmount >= 7500) {
      const earnedMoney = order.totalAmount * process.env.F_020;      

      levelName = 'Direktor';    
      await ProfitModel.create({ userId, levelName, earnedMoney }, { transaction: t });
      
    }


    await t.commit();
    console.log('Order processed successfully');
    return res.json({message: 'Order processed successfully'})
  } catch (error) {
    if (t.finished !== 'commit') {
      await t.rollback();
    }
    console.error('Error processing order:', error);
    return res.json({message: `Error processing order: ${error}`, })

  }
};


}

module.exports = new CheckOutController