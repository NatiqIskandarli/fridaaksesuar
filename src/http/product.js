import {$host} from "./index"

export const getAllProductsBySub = async(id)=>{
    const {data} = await $host.get(`api/product/getAllProductsBySub/${id}`)
    return data
}

export const getAllProducts = async()=>{
    const {data} = await $host.get(`api/product/getListProducts`)
    return data
}

export const getAllProductsByImg = async()=>{
    const {data} = await $host.get(`api/product/getAllProductsByImg`)
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
