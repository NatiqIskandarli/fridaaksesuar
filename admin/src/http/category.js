import {$host} from "./index"

export const createCategory = async(title)=>{
    const {data} = await $host.post('api/category/create',{title})
    return data
}

export const getListCategory = async()=>{
    const {data} = await $host.get('api/category/getAllCategories')
    return data
}

export const getOneCategory = async(id)=>{
    const {data} = await $host.get(`api/category/getOneCategory/${id}`)
    return data
}

export const updCategoryTitle = async(updData)=>{
    const {data} = await $host.put('api/category/updateCategoryTitle',{updData})
    return data
}

export const deleteOneCategory = async(id)=>{
    const {data} = await $host.delete(`api/category/deleteOneCategory/${id}`)
    return data
}

export const deleteMultipleCategory = async(ids)=>{
    const {data} = await $host.post('api/category/deleteMultipleCategory',{ids})
    return data
}




