"use client";

import { useState, useEffect } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { H6 } from "components/typography";
import FlexBox from "components/flexbox/FlexBox";
import { IconWrapper } from "components/icon-wrapper";
import ShoppingBasket from "icons/ShoppingBasket";
import { getListCategory } from 'http/category';
import { createSubCategory } from 'http/subCategory';
import useNavigate from "hooks/useNavigate"; 

const CreateSubCategoryPageView = () => {
  const navigate = useNavigate()
  const [addOk, setAddOk] = useState('')
  const [categoryNames, setCategoryNames] = useState([]);

  const validationSchema = Yup.object({
    altKateqoriyaAdi: Yup.string().required("Alt Kateqoriya adını yazmaq məcburidir!"),
    selectedCategory: Yup.string().required("Kateqoriya secmek lazimdir!")
  });

  const initialValues = {
    altKateqoriyaAdi: "",
    selectedCategory : ""
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormik({ initialValues, validationSchema, onSubmit: async () => {
    try {
        
        if(values.altKateqoriyaAdi && values.selectedCategory){
          let data = await createSubCategory(values.altKateqoriyaAdi,values.selectedCategory)
          console.log(data.message)
          setAddOk(data.message)
          if(data.message == 'Alt Kateqoriya elave edildi'){
            setTimeout(()=>{
              navigate("/dashboard/sub-category")
            },2000)          
          }
        }else{
          setAddOk("Butun xanalar doldurulmalidir")
        }
        
    } catch (error) {
        console.log(error)
    }  
  }  
  });

  const goBack = () => {
    navigate("/dashboard/sub-category")
  }




  useEffect(()=>{
    const fetchListCat = async () =>{
      const getListCat = await getListCategory()
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

                    <H6 fontSize={16}>Alt Kateqoriya</H6>
                  </FlexBox>
                </Grid>

                <Grid item md={6} xs={12}>
                  <H6 fontSize={16} mb={3}>
                    Alt Kateqoriya adı
                  </H6>

                  <Grid container spacing={2}>

                    <Grid item xs={12}>
                      <TextField 
                        fullWidth 
                        name="altKateqoriyaAdi" 
                        label="alt kateqoriya adını yazın" 
                        onBlur={handleBlur} 
                        onChange={handleChange}
                        value={values.altKateqoriyaAdi}
                        helperText={touched.altKateqoriyaAdi && errors.altKateqoriyaAdi} 
                        error={Boolean(touched.altKateqoriyaAdi && errors.altKateqoriyaAdi)} />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField select fullWidth SelectProps={{
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
                    {addOk}
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <FlexBox flexWrap="wrap" gap={2}>
              <Button type="submit" variant="contained" >
                Əlavə et
              </Button>
              <Button variant="outlined" color="secondary" onClick={goBack}>
                İmtina et
              </Button>
            </FlexBox>
          </Grid>
        </Grid>
      </form>
    </Box>;
};

export default CreateSubCategoryPageView;