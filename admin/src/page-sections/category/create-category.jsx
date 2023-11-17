"use client";

import { useCallback, useState } from "react";
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
import { createCategory } from 'http/category';
import useNavigate from "hooks/useNavigate";

const CreateCategoryPageView = () => {
  const navigate = useNavigate()
  const [addOk, setAddOk] = useState('')

  const validationSchema = Yup.object({
    kateqoriyaAdi: Yup.string().required("Kateqoriya adını yazmaq məcburidir!")
  });

  const initialValues = {
    kateqoriyaAdi: ""
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
        let data = await createCategory(values.kateqoriyaAdi)
        setAddOk(data.message)
        if(data.message == 'Kateqoriya elave edildi'){
          setTimeout(()=>{
            navigate("/dashboard/category")
          },2000)          
        }
    } catch (error) {
        console.log(error)
    }  
  }  
  });

  const goBack = () => {
    navigate("/dashboard/category")
  }

  
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

                    <H6 fontSize={16}>Kateqoriya</H6>
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
                        name="kateqoriyaAdi" 
                        label="kateqoriya adını yazın" 
                        onBlur={handleBlur} 
                        onChange={handleChange}
                        value={values.kateqoriyaAdi}
                        helperText={touched.kateqoriyaAdi && errors.kateqoriyaAdi} 
                        error={Boolean(touched.kateqoriyaAdi && errors.kateqoriyaAdi)} />
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

export default CreateCategoryPageView;