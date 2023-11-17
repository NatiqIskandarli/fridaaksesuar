"use client";

import { useCallback, useEffect, useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup"; // CUSTOM COMPONENTS

import { H6 } from "components/typography";
import { DropZone } from "components/dropzone";
import FlexBox from "components/flexbox/FlexBox";
import { QuillEditor } from "components/quill-editor";
import { IconWrapper } from "components/icon-wrapper"; // CUSTOM ICON COMPONENT

import ShoppingBasket from "icons/ShoppingBasket";
import { getOneSubCategory, updSubCategoryTitle } from 'http/subCategory';
import { getListCategory } from 'http/category';
import useNavigate from "hooks/useNavigate";

const EditSubCategoryItem = ({params}) => {
  const navigate = useNavigate()
  const [addOk, setAddOk] = useState('')
  const [categoryNames, setCategoryNames] = useState([]);

  const validationSchema = Yup.object({
    editAltKateqoriyaAdi: Yup.string().required("Kateqoriya adını yazmaq məcburidir!")
  });


  const initialValues = {
    editAltKateqoriyaAdi: "",
    editSelectedCategory: ""
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormik({ initialValues, validationSchema, onSubmit: async () => {
    try {
      const formData = {
          id: params.id,
          title: values.editAltKateqoriyaAdi,
          categoryId: values.editSelectedCategory
      }

      let data = await updSubCategoryTitle(formData)
      setAddOk(data.message)

      if(data.message == 'Alt Kateqoriya Yenilendi'){
        setTimeout(()=>{
          navigate("/dashboard/sub-category")
        },1000)
      }
  } catch (error) {
      console.log(error)
  } 
  }  
  });

  const goBack = () => {
    navigate("/dashboard/sub-category")
  }

 
  useEffect(() => {
    const getOneCat = async () => {
      const oneData = await getOneSubCategory(params.id);
      setFieldValue('editAltKateqoriyaAdi', oneData.title);

     await fetchListCat(oneData.categoryId);
    };

    const fetchListCat = async (catId) => {
      const getAllCat = await getListCategory();      
      setCategoryNames(getAllCat);
      const selectedCategoryS = getAllCat.find(cat => cat.id === catId);
      if (selectedCategoryS) {
        setFieldValue('editSelectedCategory', selectedCategoryS.id);
      }
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

                    <H6 fontSize={16}>Alt Kateqoriya Düzəliş səhifəsi</H6>
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
                        name="editAltKateqoriyaAdi" 
                        label="alt kateqoriya adını yazın" 
                        onBlur={handleBlur} 
                        onChange={handleChange}
                        value={values.editAltKateqoriyaAdi}
                        helperText={touched.editAltKateqoriyaAdi && errors.editAltKateqoriyaAdi} 
                        error={Boolean(touched.editAltKateqoriyaAdi && errors.editAltKateqoriyaAdi)} />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField select fullWidth SelectProps={{
                          native: true,
                          IconComponent: KeyboardArrowDown
                        }}                    
                        name="editSelectedCategory"
                        value={values.editSelectedCategory}
                        onChange={handleChange}
                        helperText={touched.editSelectedCategory && errors.editSelectedCategory} 
                        error={Boolean(touched.editSelectedCategory && errors.editSelectedCategory)}
                        >
                        <option value="" disabled>
                          Kateqoriya seç
                        </option>
                      {categoryNames.map(category=>
                        <option value={category.id} key={category.id}>{category.title}</option>
                      )}
                      </TextField>
                    </Grid>

                    {addOk && addOk + " Gozleyin..."}
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

export default EditSubCategoryItem;