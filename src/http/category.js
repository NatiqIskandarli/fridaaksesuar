import {$host} from "./index"

export const getListCategory = async()=>{
    const {data} = await $host.get('api/category/getAllCategories')
    return data
}

export const getOneCategory = async(id)=>{
    const {data} = await $host.get(`api/category/getOneCategory/${id}`)
    return data
}

export const getListSubCategory = async()=>{
    const {data} = await $host.get('api/subcat/getAllSubCategories')
    return data
}

