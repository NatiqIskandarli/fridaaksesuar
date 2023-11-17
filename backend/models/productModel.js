const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const ProductModel = sequelize.define('Product', {
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    moreText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    salePrice:{
      type: DataTypes.FLOAT,
      allowNull: true
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating:{
      type:DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    subCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    aktivlik: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    indexes: [
      { unique: false, fields: ['productName'] },
      { unique: false, fields: ['price'] },
      { unique: false, fields: ['salePrice'] },
      { unique: false, fields: ['stockQuantity'] },
    ],
  });

  module.exports = ProductModel;