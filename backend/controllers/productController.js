const sequelize = require("../config/config");
const ProductModel = require('../models/productModel');
const ProductImage = require('../models/productImage');
const fs = require('fs').promises;
const uuid = require("uuid")
const path = require("path")
const multer = require('multer');
const sharp = require('sharp');
const upload = multer({ dest: 'uploads/' });


const ProductController = {
  // Create a new product
  createProduct: async (req, res) => {
    let newImgs;

    if (!Array.isArray(req.files.images)) {      
      newImgs = [req.files.images]
      console.log("tek", newImgs)
    }else{
      newImgs = req.files.images
      console.log("coxlu" ,newImgs)
    }
    

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded." });
    }

    try {
      const { 
        productName, 
        description,
        price, 
        salePrice, 
        stockQuantity, 
        rating, 
        moreText,
        subCategoryId,
        aktivlik, 
      } = req.body;
   
    const imagePaths = await Promise.all(newImgs.map(async (file) => {
      let fileName = uuid.v4() + ".jpg"
      const outputPath = path.resolve(__dirname, '..', 'uploads', fileName);

      // Resize and save the image using sharp
      await sharp(file.data)
        .resize(800)
        .toFile(outputPath);

      return {outputPath,fileName};
    }));
    

      const newProduct = await ProductModel.create({
        productName,
        description,
        price,
        salePrice,
        stockQuantity,
        moreText,
        rating,
        subCategoryId,
        aktivlik
      });

      const imagePromises = imagePaths.map((imagePath) =>{      
        return ProductImage.create({
          productId: newProduct.productId,
          path: imagePath.outputPath,
          name: imagePath.fileName
        });
      })


    await Promise.all(imagePromises);


      res.status(201).json({message: 'Mehsul elave edildi'});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await ProductModel.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all products for subcat
  getAllProductsBySub: async (req, res) => {
    const {id} = req.params
    try {
      const products = await ProductModel.findAll({ where: { subCategoryId: id } });
    
      const updatedProds = await Promise.all(
        products.map(async (product) => {
          const productImg = await ProductImage.findOne({ where: { productId: product.productId } });
          if (productImg) {
            return { ...product.toJSON(), imageURL: productImg.name };
          } else {
            return product.toJSON();
          }
        })
      );
    
      console.log(updatedProds); 
      res.status(200).json(updatedProds);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    
  },

  // Get a single product by ID
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductModel.findByPk(id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  //get images

  getOneProductImages: async (req, res)=>{
    try {
      const { id } = req.params;
      const productImg = await ProductImage.findAll({where: {productId : id}});
      if (productImg) {
        res.status(200).json(productImg);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a product by ID
  updateProduct: async (req, res) => {
  
      const { 
        id,
        productName, 
        description,
        price, 
        salePrice, 
        stockQuantity, 
        rating, 
        moreText,
        subCategoryId,
        aktivlik, 
      } = req.body;

    let newImgs;

    if (req.files) {
      if (!Array.isArray(req.files.images)) {      
        newImgs = [req.files.images]
        console.log("tek", newImgs)
      }else{
        newImgs = req.files.images
        console.log("coxlu" ,newImgs)
      }
    }

    try {     

      const updateValues = { 
        productName: productName, 
        description : description,
        price : price,
        salePrice : salePrice,
        stockQuantity : stockQuantity,
        moreText : moreText,
        rating : rating,
        subCategoryId : subCategoryId,
        aktivlik : aktivlik
      }
      
   
      if (req.files) {
        const imagePaths = await Promise.all(newImgs.map(async (file) => {
          let fileName = uuid.v4() + ".jpg"
          const outputPath = path.resolve(__dirname, '..', 'uploads', fileName);

          // Resize and save the image using sharp
          await sharp(file.data)
            .resize(800)
            .toFile(outputPath);

          return {outputPath,fileName};
        }));
    
          const newProduct = await ProductModel.update(updateValues, {where : {productId: id}})
    
          const imagePromises = imagePaths.map((imagePath) =>{
            return ProductImage.create({
              productId: id,
              path: imagePath.outputPath,
              name: imagePath.fileName
            });
          })
    
    
        await Promise.all(imagePromises);
        res.status(201).json({message: 'Mehsul yenilendi'});
      }else{
        const newProduct = await ProductModel.update(updateValues, {where : {productId: id}})
        res.status(201).json({message: 'Mehsul yenilendi'});
        //res.status(201).json(newProduct);
      }
    

    

      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a product by ID
  deleteProduct: async (req, res) => {
    let transaction;
    try {
      const { id } = req.params;
      // Start a transaction
      transaction = await sequelize.transaction();
  
      // Find the product and associated images
      const product = await ProductModel.findByPk(id, { transaction });
      const images = await ProductImage.findAll({ where: { productId: id }, transaction });
  
      // Delete image files from the filesystem
      const deletionPromises = images.map((image) => {
        const filePath = path.resolve(__dirname, '..', 'uploads', image.name);
        return fs.unlink(filePath).catch((fsError) => {
          // Handle the error, e.g., log or throw
          console.error('Error deleting file:', fsError.message);
        });
      });
  
      // Wait for all files to be deleted
      await Promise.all(deletionPromises);
  
      // If the product exists, delete the associated images and the product
      if (product) {
        // Delete the image records from the database
        await ProductImage.destroy({ where: { productId: id }, transaction });
  
        // Finally, delete the product record
        await product.destroy({ transaction });
  
        // Commit the transaction
        await transaction.commit();
  
        res.status(201).send({ message: 'Product deleted successfully' });
      } else {
        // If the product doesn't exist, rollback the transaction
        await transaction.rollback();
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      // If an error occurs, rollback the transaction if it has been initialized
      if (transaction) await transaction.rollback();
      res.status(500).json({ error: error.message });
    }
  },
  
  // Delete image
  deleteImageByProd: async (req, res) => {
    try {
      const { id } = req.params;
      const productImage = await ProductImage.findByPk(id);
  
      if (productImage) {
        const filePath = path.resolve(__dirname, '..', 'uploads', productImage.name);          
        try {
          await fs.access(filePath);
          await fs.unlink(filePath);
          console.log('File removed:', filePath);
        } catch (error) {
          console.error('File not found or already deleted:', filePath);
        }
  
        await productImage.destroy();
        res.status(200).json({ message: 'Sekil silindi' });
      } else {
        res.status(404).json({ error: 'Sekil tapilmadi' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //delete multiple
  deleteMultipleProduct: async (req, res) => {
    let transaction;
    try {
      const { ids } = req.body; 
      if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ error: 'No product IDs provided or invalid format' });
      }

      transaction = await sequelize.transaction();
  
      for (const id of ids) {
        const product = await ProductModel.findByPk(id, { transaction });
        const images = await ProductImage.findAll({ where: { productId: id }, transaction });

        for (const image of images) {
          const filePath = path.resolve(__dirname, '..', 'uploads', image.name);
          await fs.unlink(filePath).catch(fsError => {
            console.error('Error deleting file:', fsError.message);
          });
        }

        await ProductImage.destroy({ where: { productId: id }, transaction });

        if (product) {
          await product.destroy({ transaction });
        }
      }
  
      await transaction.commit();
  
      res.status(201).send({ message: 'Products deleted successfully' });
    } catch (error) {
      
      if (transaction) await transaction.rollback();
      res.status(500).json({ error: error.message });
    }
  }

};

module.exports = ProductController;
