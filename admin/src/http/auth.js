import {$host} from "./index"

export const createUser = async(email, password)=>{
    const {data} = await $host.post('api/user/register',{email,password})
    return data
}

export const addNetworkUser = async(email, password,sponsorId)=>{
    const {data} = await $host.post('api/user/register',{email,password,sponsorId})
    return data
}