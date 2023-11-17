import { $host } from "./index";

// Client-side HTTP file
export const createProduct = async (formData) => {
    const { data } = await $host.post('api/product/add', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data', // This header will typically be set automatically
    //   },
    });
    return data;
};  
  

export const getListProducts = async()=>{
    const {data} = await $host.get('api/product/getListProducts')
    return data
}

export const getOneProduct = async(id)=>{
    const {data} = await $host.get(`api/product/getOneProduct/${id}`)
    return data
}


export const getOneProductImages = async(id)=>{
    const {data} = await $host.get(`api/product/getOneProductImages/${id}`)
    return data
}

export const updProduct = async (formData) =>{
    const {data} = await $host.post('api/product/updProduct',formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // This header will typically be set automatically
          },
        });
    return data
}

export const deleteOneProduct = async(id)=>{
    const {data} = await $host.delete(`api/product/deleteOneProduct/${id}`)
    return data
}

export const deleteImageByProd = async(id)=>{
    const {data} = await $host.delete(`api/product/deleteImageByProd/${id}`)
    return data
}

export const deleteMultipleProduct = async(ids)=>{
    const {data} = await $host.post('api/product/deleteMultipleProduct',{ids})
    return data
}