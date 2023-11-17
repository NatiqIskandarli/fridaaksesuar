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
import { getOneCategory,updCategoryTitle } from 'http/category';
import useNavigate from "hooks/useNavigate";

const EditCategoryItem = ({params}) => {
  const navigate = useNavigate()
  const [addOk, setAddOk] = useState('')

  const validationSchema = Yup.object({
    editKateqoriyaAdi: Yup.string().required("Kateqoriya adını yazmaq məcburidir!")
  });

  const initialValues = {
    editKateqoriyaAdi: ""
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
            title : values.editKateqoriyaAdi
        }

        let data = await updCategoryTitle(formData)
        setAddOk(data.message)

        if(data.message == 'Kateqoriya Yenilendi'){
          setTimeout(()=>{
            navigate("/dashboard/category")
          },1000)
        }
    } catch (error) {
        console.log(error)
    }  
  }  
  });

  const goBack = () => {
    navigate("/dashboard/category")
  }

 
  useEffect(()=>{
    const getOneCat = async()=>{
       const oneData = await getOneCategory(params.id)
       setFieldValue('editKateqoriyaAdi', oneData.title);
    }
    getOneCat()
  },[setFieldValue, params.id])
  
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

                    <H6 fontSize={16}>Kateqoriya Düzəliş səhifəsi</H6>
                  </FlexBox>
                </Grid>

                <Grid item md={6} xs={12}>
                  <H6 fontSize={16} mb={3}>
                    Kateqoriya adı
                  </H6>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField 
                        fullWidth 
                        name="editKateqoriyaAdi" 
                        label="kateqoriya adını yazın" 
                        onBlur={handleBlur} 
                        onChange={handleChange}
                        value={values.editKateqoriyaAdi}
                        helperText={touched.editKateqoriyaAdi && errors.editKateqoriyaAdi} 
                        error={Boolean(touched.editKateqoriyaAdi && errors.editKateqoriyaAdi)} />
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

export default EditCategoryItem;