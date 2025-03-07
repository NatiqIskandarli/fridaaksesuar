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

export const qeydiyyatKec = async(fullData)=>{
    const {data} = await $host.post('api/product/qeydiyyatKec',{fullData})
    return data
}

export const findSponsor = async(fullData)=>{
    const {data} = await $host.post('api/user/findSponsor',{fullData})
    return data
}

export const checkOutSade = async(fullData)=>{
    const {data} = await $host.post('api/product/checkOutSade',{fullData})
    return data
}

export const getTransActionByUserId = async(userId)=>{
    const {data} = await $host.get(`api/product/getTransActionByUserId/${userId}`)
    return data
}

export const updateTransActionByOrderId = async(fullData)=>{
    const {data} = await $host.put('api/product/updateTransActionByOrderId',{fullData})
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

export const getMyPass = async(userIdd)=>{
    try {
        const {data} = await $host.get(`api/user/getMyPass/${userIdd}`)
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
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth()+1;
        const tarix = year+'-'+month

        //const {data} = await $host.get(`api/user/${userId}/downlineTest/${tarix}`)
        const {data} = await $host.get(`api/user/${userId}/downline`)
        return data
    } catch (error) {
        console.error('Error fetching qrup:', error);
        throw error;
    }
}

export const getQrupTarixce = async(userId,tarix)=>{
    try {
        //const {data} = await $host.get(`api/user/${userId}/downlineTest/${tarix}`)
        const {data} = await $host.get(`api/user/${userId}/downlineTarixce/${tarix}`)
        return data
    } catch (error) {
        console.error('Error fetching qrup:', error);
        throw error;
    }
}


export const login = async (email, password)=>{
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('fridtoken', data.token)
    localStorage.setItem('userEmail', data.userEmail)
    //const decodedToken = parseJwt(data.token);
    return {decodedToken : data.userid, userid : data.userid}
}
export const check = async ()=>{ 
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('fridtoken', data.token)
    const decodedToken = parseJwt(data.token);
    return decodedToken
}



export const userAxtarTap = async(fullData)=>{
    try {
        const {data} = await $host.post('api/user/getUser',{fullData})
        return data
    } catch (error) {
        console.error('Error save adress:', error);
        throw error;
    }    
}

export const getWalletById = async(userId)=>{
    const {data} = await $host.get(`api/profit/getWalletById/${userId}`)
    return data
}

export const checkOutBalansdan = async(fullData)=>{
    const {data} = await $host.post('api/product/checkOutBalansdan',{fullData})
    return data
}