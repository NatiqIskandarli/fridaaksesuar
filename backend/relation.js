const UserModel = require('./models/userModel');
const ProfileModel = require('./models/profileModel');
const CategoryModel = require('./models/categoryModel');
const subCategoryModel = require('./models/subCategoryModel');
const RatingModel = require('./models/ratingModel');
const ProductModel = require('./models/productModel');
const OrdersModel = require('./models/ordersModel');
const OrderDetailsModel = require('./models/orderDetailsModel');
const ProfitModel = require('./models/profitModel');
const ShoppingCart = require('./models/shoppingCart');

UserModel.belongsTo(UserModel, { as: 'Sponsor', foreignKey: 'sponsorId' });
UserModel.hasMany(UserModel, { as: 'Downlines', foreignKey: 'sponsorId' });

UserModel.hasOne(ProfileModel)
ProfileModel.belongsTo(UserModel)

CategoryModel.hasMany(subCategoryModel, {foreignKey: "categoryId"})
subCategoryModel.belongsTo(CategoryModel, {foreignKey: "categoryId"})

subCategoryModel.hasMany(ProductModel, {foreignKey: "subCategoryId"})
ProductModel.belongsTo(subCategoryModel, {foreignKey: "subCategoryId"})

ProductModel.hasMany(RatingModel, {foreignKey: 'productId'})
RatingModel.belongsTo(ProductModel, {foreignKey: 'productId'})

OrdersModel.hasMany(OrderDetailsModel, { foreignKey: 'orderId' });
OrderDetailsModel.belongsTo(OrdersModel, { foreignKey: 'orderId' });

UserModel.hasOne(OrdersModel, {
    foreignKey: 'userId',
    as: 'dovriyye'
});
OrdersModel.belongsTo(UserModel, { 
    foreignKey: 'userId',
    as: 'user'
});

UserModel.hasOne(ProfitModel, {
    foreignKey: 'userId',
    as: 'profit'
});
ProfitModel.belongsTo(UserModel, { 
    foreignKey: 'userId',
    as: 'user'
});

UserModel.hasMany(ShoppingCart,{foreignKey: "userId"})
ShoppingCart.belongsTo(UserModel,{foreignKey: "userId"})

ProductModel.hasMany(ShoppingCart, { foreignKey: "productId"})
ShoppingCart.belongsTo(ProductModel, { foreignKey: "productId"})
