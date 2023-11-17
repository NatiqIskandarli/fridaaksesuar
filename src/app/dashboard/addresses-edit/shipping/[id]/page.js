'use client';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getMyAdress,saveAdress } from "@/http/auth";

const ShippingAddress = ({params}) => {
    const router = useRouter();
    const [unvan, setUnvan] = useState('')

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm();

    const userShippingInfoHandler = async (data) => {
        const formData = {
            userId : params.id,
            adress :  data.address
        }

        try {
            const updAdr = await saveAdress(formData)
            router.push('dashboard/addresses-edit');
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(()=>{
        const fetchOrders = async () =>{
            const getOrder = await getMyAdress(params.id);
            setUnvan(getOrder.adress)
            setValue('address',getOrder.adress)
        }
        fetchOrders()
    },[params.id,setValue])

    return ( 
        <>
        <h4 className="title">Çatdırılma ünvanı</h4>
        <form className="account-details-form" onSubmit={handleSubmit(userShippingInfoHandler)}>
            <div className="row">                
                <div className="col-lg-12">
                    <div className="form-group">
                        <label>Ünvan</label>
                        <input type="text" className="form-control" {...register('address', { required: true })}/>
                        {errors.address && <p className="error">Ünvanı qeyd edin.</p>}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="form-group mb--0">
                        <input type="submit" className="axil-btn" value="Yadda saxla" />
                    </div>
                </div>
            </div>
        </form>
        </>
    );
}
 
export default ShippingAddress;