import {$host} from "./index"
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    } catch (error) {
        console.error("Error in parsing JWT", error);
        return null;
    }
}

export const createUser = async(email, password)=>{
    const {data} = await $host.post('api/user/register',{email,password})
    return data
}

export const addNetworkUser = async(email, password,sponsorId)=>{
    const {data} = await $host.post('api/user/register',{email,password,sponsorId})
    return data
}

export const checkOutRegister = async(fullData)=>{
    const {data} = await $host.post('api/product/checkOutRegister',{fullData})
    return data
}


export const getBalansById = async(userId)=>{
    const {data} = await $host.get(`api/profit/getBalansById/${userId}`)
    return data
}

export const getMyOrders = async(userId)=>{
    try {
        const {data} = await $host.get(`api/profit/getMyOrders/${userId}`)
        return data
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }    
}

export const getMyOrderById = async (orderId, userId) => {
    try {
        const response = await $host.get(`api/profit/getMyOrderById/${orderId}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
}


export const getMyAdress = async(userId)=>{
    try {
        const {data} = await $host.get(`api/user/getMyAdress/${userId}`)
        return data
    } catch (error) {
        console.error('Error fetching adress:', error);
        throw error;
    }    
}

export const getMyPass = async(userId)=>{
    try {
        const {data} = await $host.get(`api/user/getMyPass/${userId}`)
        return data
    } catch (error) {
        console.error('Error fetching adress:', error);
        throw error;
    }
}


export const saveAdress = async(fullData)=>{
    try {
        const {data} = await $host.post('api/user/saveAdress',{fullData})
        return data
    } catch (error) {
        console.error('Error save adress:', error);
        throw error;
    }    
}

export const saveMyPass = async(fullData)=>{
    try {
        const {data} = await $host.post('api/user/saveMyPass',{fullData})
        return data
    } catch (error) {
        console.error('Error save adress:', error);
        throw error;
    }    
}


export const getQrup = async(userId)=>{
    try {
        const {data} = await $host.get(`api/user/${userId}/downline`)
        return data
    } catch (error) {
        console.error('Error fetching qrup:', error);
        throw error;
    }
}


export const login = async (email, password)=>{
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('fridtoken', data.token)
    const decodedToken = parseJwt(data.token);
    return decodedToken
}
export const check = async ()=>{ 
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('fridtoken', data.token)
    const decodedToken = parseJwt(data.token);
    return decodedToken
}