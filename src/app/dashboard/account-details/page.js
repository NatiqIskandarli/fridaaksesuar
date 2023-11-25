'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import { getMyPass,saveMyPass } from "@/http/auth";

const AccountDetails = () => {
    const router = useRouter();
    const [userIdd, setUserIdd] = useState('')

    //fake userid
    
    const [parol, setParol] = useState('');
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm();


    const userInfoHandler = async (data) => {

        if(data.newPassword === data.newRepPassword){
        const formData = {
            userId : userIdd,
            password :  data.newPassword
        }

        try {
            const updAdr = await saveMyPass(formData)
            router.push('dashboard');
        } catch (error) {
            console.log(error)
        }
    }else{
        alert("Parollar eyni deyil")
    }
        
    }

    useEffect(()=>{
        
        const fetchOrders = async () =>{
            const userId = localStorage.getItem("userid")
            setUserIdd(userId)
            const getOrder = await getMyPass(userId);
            setParol(getOrder.password)
            setValue('password',getOrder.password)
        }
        fetchOrders()
    },[userIdd,setValue])

    return ( 
        <div className="axil-dashboard-account">
            <form className="account-details-form" onSubmit={handleSubmit(userInfoHandler)}>
                <div className="row">
                    <div className="col-lg-6">
                        
                    </div>                   
                    <div className="col-12">
                        <h5 className="title"></h5>
                        <div className="form-group">
                            <label>Parol</label>
                            <input type="password" className="form-control" {...register('password', { required: true })} />
                            {errors.password && <p className="error">Parolu qeyd edin.</p>}
                        </div>
                        <div className="form-group">
                            <label>Yeni Parol</label>
                            <input type="password" className="form-control" {...register('newPassword', { required: true, minLength: 6 })}/>
                            {errors.newPassword && <p className="error">Yeni parolun uzunluğu 6-dan çox olmalıdır.</p>}
                        </div>
                        <div className="form-group">
                            <label>Təkrar yeni parol</label>
                            <input type="password" className="form-control" {...register('newRepPassword', { required: true,minLength: 6 })}/>
                            {errors.newRepPassword && <p className="error">Yeni təkrar parolun uzunluğu 6-dan çox olmalıdır.</p>}
                        </div>
                        <div className="form-group mb--0">
                            {/* <input type="submit" className="axil-btn" value="Yadda saxla" /> */}
                        </div>
                    </div>
                </div>
            </form>
        </div>

     );
}
 
export default AccountDetails;