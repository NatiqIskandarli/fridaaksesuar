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
import {createProduct} from "http/product"
import ShoppingBasket from "icons/ShoppingBasket";
import useNavigate from "hooks/useNavigate";
import { resizeImage } from 'utils/resizeImage';
import Image from "next/image";
import { getListSubCategory } from 'http/subCategory';

const CreateProductPageView = () => {
  const navigate = useNavigate()
  const [files, setFiles] = useState([]);
  const [moreText, setMoreTex] = useState('');
  const [addOk, setAddOk] = useState('')
  const [categoryNames, setCategoryNames] = useState([]);


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
    handleSubmit
  } = useFormik({initialValues,validationSchema, onSubmit: async() => {

      const formData = new FormData()
      formData.append('productName',values.productName)
      formData.append('description',values.description)
      formData.append('price',values.price)
      formData.append('salePrice',values.salePrice)
      formData.append('stockQuantity',values.stockQuantity)
      formData.append('rating',values.rating)
      formData.append('moreText',moreText)
      formData.append('subCategoryId',values.selectedCategory)
      formData.append('aktivlik',values.aktivlik)

      files.forEach(file => formData.append('images', file));
      

      try{
        const addProd = await createProduct(formData)
        if(addProd.message == 'Mehsul elave edildi'){
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


  useEffect(()=>{
    const fetchListCat = async () =>{
      const getListCat = await getListSubCategory()
      setCategoryNames(getListCat)
    }
    fetchListCat()
    
  },[])



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
                        <option value="" disabled>Aktivlik seçim et</option>
                        <option value="published">Aktiv et</option>
                        <option value="draft">Sondur</option>
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