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
import { findSponsor,getWalletById } from '@/http/auth';

const Checkout = () => {
    const router = useRouter();
    const [userIdd, setUserIdd] = useState('')
    const [odenishButton, setOdenishButton] = useState(false)
    const [mesaj, setMesaj] = useState('')
    const [okMesaj, setOkMesaj] = useState('')
    const [userWallet, setUserWallet] = useState(0)
    const dispatch = useDispatch();
    const [openShippingForm, setopenShippingForm] = useState(false);
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

    useEffect(()=>{
        const userId = localStorage.getItem("userid")
        const fridtoken = localStorage.getItem("fridtoken")
        if(userId !== null && fridtoken !== null && userId === fridtoken){
            setOdenishButton(true)
            setUserIdd(userId)

            const fetchProfit = async () =>{
                try {
                    const getUserWallet =  await getWalletById(userId)
                    setUserWallet(getUserWallet.qaliq)
                } catch (error) {
                    console.log(error)
                }
            }
            fetchProfit()
        }
    },[])

    const checkoutFormHandler = async (data, e) => {
        console.log(data.paymentMethod)
        if (data) {

            const getuse = userIdd
            if(getuse){
                //setOdenishButton(true)

                const fullData = {
                    billingAddress: {
                        firstName: data.firstName,
                        lastName: data.lastName,                    
                        street1: data.street1,
                        city: data.city,
                        phone: data.phone,
                        password: data.password,
                        email: data.email,                    
                        payment: "Card"
                    },
                    sponsorId: getuse,    
                    items: cartProducts.cartItems,
                    totalAmount: cartProducts.cartTotalAmount,
                    userWalletAmount: userWallet,
                    totalQuantity: cartProducts.cartQuantityTotal,
                    orderDate: new Date().toLocaleString(),
                }
                try {
                    
                    if(data.paymentMethod === "balans"){
                        console.log(userWallet)
                        if(userWallet === 0 || userWallet === null || userWallet === ""){
                            router.push('checkout/payment');
                            dispatch(addToOrder(fullData));
                        }else if(userWallet > cartProducts.cartTotalAmount){
                            // fullData.totalAmount = userWallet-cartProducts.cartTotalAmount
                            router.push('checkout/balanspay');
                            dispatch(addToOrder(fullData));
                        }else if(userWallet !== 0 && userWallet < cartProducts.cartTotalAmount){
                            // fullData.totalAmount = cartProducts.cartTotalAmount - userWallet
                            router.push('checkout/balanspayAndPay');
                            dispatch(addToOrder(fullData));
                        }
                    }else{
                        router.push('checkout/payment');
                        dispatch(addToOrder(fullData));
                    }

                    
                    

                } catch (error) {
                    console.log(error)
                }

            }else{
                const fullData = {
                    billingAddress: {
                        firstName: data.firstName,
                        lastName: data.lastName,                    
                        street1: data.street1,
                        city: data.city,
                        phone: data.phone,
                        password: data.password,
                        email: data.email,                    
                        payment: "Card"
                    },
                    sponsorId: data.sponsor,    
                    items: cartProducts.cartItems,
                    totalAmount: cartProducts.cartTotalAmount,
                    totalQuantity: cartProducts.cartQuantityTotal,
                    orderDate: new Date().toLocaleString(),
                }
                try {
                    // const payAndRegister = await checkOutRegister(fullData)
                    // console.log(payAndRegister)

                    router.push('checkout/payment');
                    dispatch(addToOrder(fullData));

                } catch (error) {
                    console.log(error)
                }
            }            
        }
    }

    // return (
    //     <>
    //     <HeaderTwo />
    //     Texniki işlər gedir
    //     <FooterTwo />
    //     </>
    // )

    return ( 
        <>
        <HeaderTwo />
        <main className="main-wrapper">
            <Section pClass="axil-checkout-area">
                {cartProducts.cartItems.length > 0 ? 
                <form onSubmit={handleSubmit(checkoutFormHandler)}>
                    <div className="row">

                        
                        {userIdd ? "" :
                        
                        
                        <div className="col-lg-6">
                            <div className="axil-checkout-billing">
                                <h4 className="title mb--40">Ödəniş məlumatlarınız</h4>
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
                                            
                                            {/* <select {...register('sponsor', { required: true })}>
                                                <option value="">Qrup seçin</option>
                                                <option value="1">Natiq</option>
                                            </select> */}
                                            {errors.sponsor && <p className="error">Mütləq qrup qeyd etməlisiz</p>}

                                            {mesaj && <p className="error">{mesaj}</p>}
                                            {okMesaj && <p className="okMesaj">{okMesaj}</p>}                                            

                                            <div 
                                            onClick={findSponsorUser}
                                            style={{backgroundColor:"#666", cursor:"pointer", color:"#fff", padding:"10px", marginTop:"10px",width:"60px"}}
                                            >Axtar</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                                }



                        <div className="col-lg-6">
                            <div className="axil-order-summery order-checkout-summery">
                                <h5 className="title mb--20">Sizin sifarişiniz</h5>
                                <div className="summery-table-wrap">
                                    <table className="table summery-table">
                                        <thead>
                                            <tr>
                                                <th>Məhsullar</th>
                                                <th>Məbləğ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartProducts.cartItems.map((items, index) => (
                                                <tr className="order-product" key={index}>
                                                    <td>{items.title} <span className="quantity">x{items.stockQuantity}</span></td>
                                                    <td>{items.salePrice ? items.salePrice : items.price} AZN</td>
                                                </tr>
                                            ))}
                                            
                                            <tr className="order-subtotal">
                                                <td>Məbləğ</td>
                                                <td>{cartProducts.cartTotalAmount} AZN</td>
                                            </tr>
                                            <tr className="order-total">
                                                <td>Cəmi məbləğ</td>
                                                <td className="order-total-amount">{cartProducts.cartTotalAmount} AZN</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="order-payment-method">                                    {userIdd ? 
                                    <div className="single-payment">
                                        <p style={{
                                            color:'#f00',
                                            fontSize: '18px',
                                            fontWeight: 'bold',
                                            padding: '8px',
                                            background: '#fff',
                                            borderRadius: '10px',
                                            border: '10px solid #7c55c1'
                                            }}>Balansınız : {userWallet} azn</p>                                  
                                    </div>

                                    : ""}


                                    <div className="single-payment">
                                        <div className="input-group justify-content-between align-items-center">
                                            <input type="radio" {...register("paymentMethod")} id="paypal" defaultValue="card" defaultChecked/>
                                            <label htmlFor="paypal">Kartla ödəniş</label>
                                            <Image 
                                                src="/images/others/payment.png" 
                                                height={28}
                                                width={156}
                                                alt="Paypal payment"
                                            />
                                        </div>
                                        {/* {userIdd && userWallet != 0 ? 
                                        <div className="input-group justify-content-between align-items-center">
                                            <input type="radio" {...register("paymentMethod")} id="balans" defaultValue="balans" />
                                            <label htmlFor="balans">Balansdan ödəniş</label>                                            
                                        </div>
                                        : "" } */}
                                        
                                    </div>
                                </div>                                
                                {!odenishButton ? " " : (
                                    <button type="submit" className="axil-btn btn-bg-primary checkout-btn" >Ödəniş et</button>
                                )}
                                
                            </div>
                        </div>
                    </div>
                </form>
                : 
                <div className="text-center">
                    <h4>Sifariş səhifəniz boşdur</h4>
                    <Link href="/" className="axil-btn btn-bg-primary">Alış verişə davam edin</Link>
                </div>                            
                }
            </Section>
            <ServiceTwo />
        </main>
        <FooterTwo />
        </>
    );
}
 
export default Checkout;