"use client";

import { useCallback, useEffect, useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup"; 

import { H6 } from "components/typography";
import { DropZone } from "components/dropzone";
import FlexBox from "components/flexbox/FlexBox";
import { QuillEditor } from "components/quill-editor";
import { IconWrapper } from "components/icon-wrapper";
import ShoppingBasket from "icons/ShoppingBasket";
import useNavigate from "hooks/useNavigate";
import { resizeImage } from 'utils/resizeImage';
import Image from "next/image";
import { getListSubCategory } from 'http/subCategory';
import { getOneProduct,getOneProductImages,deleteImageByProd,updProduct } from 'http/product';

const CreateProductPageView = ({params}) => {
  const navigate = useNavigate()
  const [files, setFiles] = useState([]);
  const [moreText, setMoreTex] = useState('');
  const [addOk, setAddOk] = useState('')
  const [categoryNames, setCategoryNames] = useState([]);
  const [aktiv, setAktiv] = useState([])
  const [images, setImages] = useState([])


  const handleChangeDescription = value => {
    setMoreTex(value)
  };


  const handleDropFile = useCallback(async (acceptedFiles) => {
    const files = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(files);

  }, []);
  

  const validationSchema = Yup.object({
    productName: Yup.string().required("productName is Required!"),
    description: Yup.string().required("description is Required!"),
    price: Yup.string().required("price is Required!"),
    salePrice: Yup.string().required("salePrice is required!"),
    stockQuantity: Yup.string().min(1).required("stockQuantity is Required!"),
    rating: Yup.string().required("rating is Required!"),
    selectedCategory: Yup.string().required("Kateqoriya secmek lazimdir!"),
    aktivlik: Yup.string().required("aktivlik secmek lazimdir!")
  });

  const initialValues = {
    productName: "",
    description: "",
    price: "",
    salePrice: "",
    stockQuantity: "",
    rating: "",
    selectedCategory: "",
    aktivlik: ""
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormik({initialValues,validationSchema, onSubmit: async() => {

      const formData = new FormData()
      formData.append('id',params.id)
      formData.append('productName',values.productName)
      formData.append('description',values.description)
      formData.append('price',values.price)
      formData.append('salePrice',values.salePrice)
      formData.append('stockQuantity',values.stockQuantity)
      formData.append('rating',values.rating)
      formData.append('moreText',moreText)
      formData.append('subCategoryId',values.selectedCategory)
      formData.append('aktivlik',values.aktivlik)
     

      if(files.length > 0){
        files.forEach(file => formData.append('images', file));
      }
      
// console.log(formData.get('productName'))
      try{
        const addProd = await updProduct(formData)
        console.log(addProd)
        if(addProd.message == "Mehsul yenilendi"){
          setAddOk(addProd.message)
          navigate("/dashboard/products/product-list-view")
        }

      }catch(err){
        console.log(err)
      }
  }
  });


  const goBack = () => {
    navigate("/dashboard/products/product-list-view")
  }


  const deleteProductImage = async (imgId) => {
    try {
      setImages(state => state.filter(item => item.id !== imgId));
      const result = await deleteImageByProd(imgId)
      console.log(result)
    } catch (error) {
      console.log(error)
    } 
  };
  


  useEffect(() => {
    const getOneCat = async () => {
      const oneData = await getOneProduct(params.id);
      setFieldValue('productName', oneData.productName);
      setFieldValue('description', oneData.description);
      setFieldValue('price', oneData.price);
      setFieldValue('salePrice', oneData.salePrice);
      setFieldValue('stockQuantity', oneData.stockQuantity);
      setFieldValue('rating', oneData.rating);
      
      if(oneData.aktivlik == "published"){
        setFieldValue('aktivlik', 'published');        
      }else{
        setFieldValue('aktivlik', 'draft');       
      }
        setAktiv([{
            name: 'Aktiv et',
            value : 'published'
        },{
            name: 'Sondur',
            value : 'draft'
        }])      

      setMoreTex(oneData.moreText)
     
      //await fetchListCat(oneData.subCategoryId);

      const [getAllCat, getImagesForProduct] = await Promise.all([
        getListSubCategory(),
        getOneProductImages(params.id)
      ])

      setCategoryNames(getAllCat);
      const selectedCategoryS = getAllCat.find(cat => cat.id === oneData.subCategoryId);
      if (selectedCategoryS) {
        setFieldValue('selectedCategory', selectedCategoryS.id);
      }
      setImages(getImagesForProduct)
    };
  
    getOneCat();
  }, [setFieldValue, params.id]); 



  return <Box pt={2} pb={4}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{
            p: 3
          }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FlexBox gap={0.5} alignItems="center">
                    <IconWrapper>
                      <ShoppingBasket sx={{
                      color: "primary.main"
                    }} />
                    </IconWrapper>

                    <H6 fontSize={16}>Məhsul əlavə et</H6>
                  </FlexBox>
                </Grid>

                <Grid item md={6} xs={12}>
                  <H6 fontSize={16} mb={3}>
                    Main Parameters
                  </H6>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField fullWidth 
                        name="productName"
                        label="productName" 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.productName} 
                        helperText={touched.productName && errors.productName} 
                        error={Boolean(touched.productName && errors.productName)} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth 
                        name="description"
                        label="description" 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.description} 
                        helperText={touched.description && errors.description} 
                        error={Boolean(touched.description && errors.description)} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth 
                        name="price"
                        label="price" 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.price} 
                        helperText={touched.price && errors.price} 
                        error={Boolean(touched.price && errors.price)} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth 
                        name="salePrice"
                        label="salePrice" 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.salePrice} 
                        helperText={touched.salePrice && errors.salePrice} 
                        error={Boolean(touched.salePrice && errors.salePrice)} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth 
                        name="stockQuantity"
                        label="stockQuantity" 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.stockQuantity} 
                        helperText={touched.stockQuantity && errors.stockQuantity} 
                        error={Boolean(touched.stockQuantity && errors.stockQuantity)} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth 
                        name="rating"
                        label="rating" 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.rating} 
                        helperText={touched.rating && errors.rating} 
                        error={Boolean(touched.rating && errors.rating)} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField select 
                        fullWidth 
                        label="" 
                        SelectProps={{
                        native: true,
                        IconComponent: KeyboardArrowDown
                      }}
                        name="selectedCategory"
                        value={values.selectedCategory}
                        onChange={handleChange}
                        helperText={touched.selectedCategory && errors.selectedCategory} 
                        error={Boolean(touched.selectedCategory && errors.selectedCategory)}
                    >
                        <option value="" disabled>
                          Kateqoriya seç
                        </option>
                      {categoryNames.map(category=>
                        <option value={category.id} key={category.id}>{category.title}</option>
                      )}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField select 
                        fullWidth 
                        label="" 
                        SelectProps={{
                          native: true,
                          IconComponent: KeyboardArrowDown
                        }}
                        name="aktivlik"
                        value={values.aktivlik}
                        onChange={handleChange}
                        helperText={touched.aktivlik && errors.aktivlik} 
                        error={Boolean(touched.aktivlik && errors.aktivlik)}
                        >
                        {
                        aktiv.map(val=>(                             
                           <option key={val.name} value={val.value}>{val.name}</option>                              
                                
                        ))
                        }
                        
                                             
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <QuillEditor value={moreText} onChange={handleChangeDescription} />
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <DropZone onDrop={handleDropFile} />              
            </Card>
          </Grid>
          <Grid item xs={12}>
          {files.map((file)=>(          
                <Image
                key={file.name} // Make sure to have a unique key for each child
                alt="Uploaded Preview"
                width={200}
                height={200}
                src={file.preview}                
              />
            ))}
          </Grid>
          <Grid item xs={12}>        
          {images.map((img)=>(  
            <div key={img.name}>       
                <Image
                alt={img.id}
                width={200}
                height={200}
                src={`${process.env.NEXT_PUBLIC_APP_API_URL}${img.name}`}  
                
              />
              <Button variant="outlined" color="secondary" onClick={()=>deleteProductImage(img.id)}>
                Sil
              </Button>
              </div> 
            ))}
          </Grid>

          <Grid item xs={12}>
            <FlexBox flexWrap="wrap" gap={2}>
              <Button type="submit" variant="contained">
                Əlavə et
              </Button>

              <Button variant="outlined" color="secondary" onClick={goBack}>
                İmtina
              </Button>
              {addOk}
            </FlexBox>
          </Grid>
        </Grid>
      </form>
    </Box>;
};

export default CreateProductPageView;