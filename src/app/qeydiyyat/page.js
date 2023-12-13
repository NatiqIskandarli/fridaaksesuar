'use client';
import { useRouter } from 'next/navigation'
import { useState,useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from "react-redux";
import Section from "@/components/elements/Section";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import ServiceTwo from "@/components/services/ServiceTwo";
import { addToOrder } from '@/store/slices/productSlice';
import HeaderTwo from '@/components/header/HeaderTwo';
import { findSponsor,qeydiyyatKec } from '@/http/auth';

const SignUp = () => {
    const router = useRouter();
    const [odenishButton, setOdenishButton] = useState(false)
    const [mesaj, setMesaj] = useState('')
    const [okMesaj, setOkMesaj] = useState('')
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.productData);

    const findSponsorUser = async () => {
        setOkMesaj('Gözləyin..')
        const sponsorName = document.getElementById('sponsorid').value
        const fullData = {
            sponsorId: sponsorName,
        }
        try {
            const checksponsor = await findSponsor(fullData) 
            if(checksponsor.message){
                setMesaj(checksponsor.message)
                setOkMesaj('')
                setOdenishButton(false)
            }else{
                setOkMesaj(`${checksponsor.checkEmail.profile.firstName} ${checksponsor.checkEmail.profile.lastName}`)
                setMesaj('')
                setOdenishButton(true)
            }

        } catch (error) {
            setMesaj(`Error: ${error.message}`)
        }        
    }

    const aktivB = () =>{
        setMesaj('')
        setOkMesaj('')
        setOdenishButton(false)
    }



    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();



    const checkoutFormHandler = async (data, e) => {
        if (data) {
                const fullData = {
                    billingAddress: {
                        firstName: data.firstName,
                        lastName: data.lastName,                    
                        street1: data.street1,
                        city: data.city,
                        phone: data.phone,
                        password: data.password,
                        email: data.email,                    
                    },
                    sponsorId: data.sponsor,
                }
                try {
                    const boshRegister = await qeydiyyatKec(fullData)
                    localStorage.setItem("userid", boshRegister.user.id)
                    alert(boshRegister.message)
                    router.push('/sign-in');
                } catch (error) {
                    console.log(error)
                }
                       
        }
    }

    return ( 
        <>
        <HeaderTwo />
        <main className="main-wrapper">
            <Section pClass="axil-checkout-area">
                <form onSubmit={handleSubmit(checkoutFormHandler)}>
                    <div className="row">                        
                        <div className="col-lg-6">
                            <div className="axil-checkout-billing">
                                <h4 className="title mb--40">Qeydiyyat Məlumatlarınız</h4>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Adınız <span>*</span></label>
                                            <input type="text" {...register('firstName', { required: true })} placeholder="Adınız" />
                                            {errors.firstName && <p className="error">Adınızı qeyd edin.</p>}
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Soyad <span>*</span></label>
                                            <input type="text" {...register('lastName', { required: true })} placeholder="Soyadınz" />
                                            {errors.lastName && <p className="error">Soyadınızı qeyd edin.</p>}
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Ünvan <span>*</span></label>
                                            <input type="text" {...register('street1', { required: true })} placeholder="Tam ünvanınızı qeyd edin"/>
                                            {errors.street1 && <p className="error">Ünvanınızı qeyd edin</p>}
                                        </div>
                                    </div>                                    
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Şəhər <span>*</span></label>
                                            <input type="text" {...register('city', { required: true })} />
                                            {errors.city && <p className="error">Şəhəri qeyd edin.</p>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Mobil Telefon <span>*</span></label>
                                            <input type="number" {...register('phone', { required: true, maxLength: 10 })} />
                                            {errors.phone && <p className="error">10 rəqəmli mobil telefon nəmrənizi qeyd edin</p>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Parol <span>*</span></label>
                                            <input type="password" {...register('password', { required: true, minLength: 6 })} />
                                            {errors.password && <p className="error">Minimum uzunluğu 6 olmalıdır</p>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email <span>*</span></label>
                                            <input type="email" {...register('email', { required: true })} />
                                            {errors.email && <p className="error">Email qeyd edin.</p>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Hansı qrupa qoşulacaqsız?<span>*</span></label>
                                            <input type="text" 
                                            id='sponsorid'
                                            {...register('sponsor', { required: true })}
                                            onChange={aktivB}
                                            />
           
                                            {errors.sponsor && <p className="error">Mütləq qrup qeyd etməlisiz</p>}

                                            {mesaj && <p className="error">{mesaj}</p>}
                                            {okMesaj && <p className="okMesaj">{okMesaj}</p>}                                            

                                            <div 
                                            onClick={findSponsorUser}
                                            style={{backgroundColor:"#666", cursor:"pointer", color:"#fff", padding:"10px", marginTop:"10px",width:"60px"}}
                                            >Axtar</div>

                                {!odenishButton ? " " : (
                                    <button type="submit" className="axil-btn btn-bg-primary checkout-btn" style={{cursor:"pointer", padding:"10px", marginTop:"20px"}}>Qeydiyyatdan keç</button>
                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Section>
            
        </main>
        <FooterTwo />
        </>
    );
}
 
export default SignUp;