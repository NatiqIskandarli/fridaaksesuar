const OrderDetailsModel = require("../models/orderDetailsModel");
const OrdersModel = require("../models/ordersModel");
const ProductModel = require("../models/productModel");
const ProfileModel = require("../models/profileModel");
const UserModel = require("../models/userModel");

class OrderController{
    //add

    //update

    //update payment status By Order id


    async getMyOrders(req,res){
        try {
          const {id} = req.params
          const user = await UserModel.findByPk(id,{
            include: [{
                model: OrdersModel,
                as: 'dovriyye'
            }]
          });
          
          if (user) {
            return res.status(200).json(user);
          } else {
            return res.status(200).json({message: 'User not found or no associated Order'});
          }
          
        } catch (error) {
          return res.status(500).json({message: "sehv yarandi"})
        }
    }


    ///

    async getMyOrderById(req,res){
        try {
            const { id, userId } = req.params;
            const user = await ProfileModel.findOne({where: {userId: userId}});
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const order = await OrdersModel.findByPk(id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            const fetchOrder = await OrderDetailsModel.findAll({ where: { orderId: id } });

            if (fetchOrder.length === 0) {
                return res.status(200).json({ message: 'No order details found for this order' });
            }

            const updatedOrder = await Promise.all(
                fetchOrder.map(async (orderDetail) => {
                    const getProduct = await ProductModel.findByPk(orderDetail.productId);
                    return {
                        ...orderDetail.toJSON(),
                        productName: getProduct ? getProduct.productName : null
                    };
                })
            );

            return res.status(200).json({
                userAdress :  user.toJSON(),
                order: order.toJSON(),
                orderDetails: updatedOrder,
            });
        
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error occurred" });
        }
        
    }

    //getTotalAmountForUser
    async getDovriyye (userId){
        try {
            const user = await UserModel.findByPk(userId,{
                include: [{
                    model: OrdersModel,
                    as: 'dovriyye'
                }]
            });
            
            if (user && user.dovriyye) {
                const { totalAmount, createdAt } = user.dovriyye;
            return {totalAmount,createdAt};
            } else {
                    console.log('User not found or no associated order');
                    return 0;
            }
        } catch (error) {
            console.error(`Error fetching order information for userId: ${userId}`, error);
            throw error; 
        }
    }
}

module.exports = new OrderController