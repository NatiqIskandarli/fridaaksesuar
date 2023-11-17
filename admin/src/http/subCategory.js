import {$host} from "./index"

export const createSubCategory = async(title,categoryId)=>{
    const {data} = await $host.post('api/subcat/create',{title,categoryId})
    return data
}

export const getListSubCategory = async()=>{
    const {data} = await $host.get('api/subcat/getAllSubCategories')
    return data
}

export const getOneSubCategory = async(id)=>{
    const {data} = await $host.get(`api/subcat/getOneSubCategory/${id}`)
    return data
}

export const getOneEditSubCategory = async(id)=>{
    const {data} = await $host.get(`api/subcat/getOneEditSubCategory/${id}`)
    return data
}

export const updSubCategoryTitle = async(updData)=>{
    const {data} = await $host.put('api/subcat/updateSubCategoryTitle',{updData})
    return data
}

export const deleteOneSubCategory = async(id)=>{
    const {data} = await $host.delete(`api/subcat/deleteOneSubCategory/${id}`)
    return data
}

export const deleteMultipleSubCategory = async(ids)=>{
    const {data} = await $host.post('api/subcat/deleteMultipleSubCategory',{ids})
    return data
}