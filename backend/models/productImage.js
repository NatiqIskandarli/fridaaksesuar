const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Product = require('./productModel')

const ProductImage = sequelize.define('ProductImage', {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'productId'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  module.exports = ProductImage;