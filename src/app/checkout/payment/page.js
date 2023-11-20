'use client';
import { useRouter } from 'next/navigation'
import { useSelector,useDispatch } from "react-redux";
import Section from "@/components/elements/Section";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import HeaderTwo from "@/components/header/HeaderTwo";
import { checkOutRegister, checkOutSade } from '@/http/auth';
import { useState,useEffect } from 'react';

const OrderPayment = () => {
    const router = useRouter();
    const [userIdd, setUserIdd] = useState('')
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.productData.orderItems);
    const latestOrder = orders[orders.length - 1];

    useEffect(()=>{
        try {
            const userId = localStorage.getItem("userid")
            setUserIdd(userId)
            const submitPayment = async () =>{       
                try {
        
                    const url = `${process.env.NEXT_PUBLIC_PAYRIFF_CREATE_URL}`;
            
                    const data =  {
                        "body": {
                          "amount": latestOrder.totalAmount,
                          "approveURL": `${process.env.NEXT_PUBLIC_APPROVE_URL}`,
                          "cancelURL": `${process.env.NEXT_PUBLIC_CANCEL_URL}`,
                          "declineURL": `${process.env.NEXT_PUBLIC_DECLINE_URL}`,
                          "currencyType": "AZN",
                          "directPay": true,
                          "language": "AZ"
                        },
                        "merchant": `${process.env.NEXT_PUBLIC_MERCHANT}`
                    };
        
                    fetch(url,{
                        method:"POST",
                        body: JSON.stringify(data),
                        headers:{
                            "Content-Type": "application/json",
                            "Authorization": `${process.env.NEXT_PUBLIC_PAYRIFF_AUTH_KEY}`,
                        },
                    }).then((response)=>{
                       return response.json(); 
                    }).then((val)=>{
                        payM(val)                
                    }).catch((error) => console.error(error));  
        
                } catch (error) {
                    console.log(error)
                }
                
            }
        
        
            const payM = async (val) =>{
                try {
                        //console.log(val.payload);
        
                        const fullData = {
                            billingAddress: {
                                firstName: latestOrder.billingAddress.firstName,
                                lastName: latestOrder.billingAddress.lastName,                    
                                street1: latestOrder.billingAddress.street1,
                                city: latestOrder.billingAddress.city,
                                phone: latestOrder.billingAddress.phone,
                                password: latestOrder.billingAddress.password,
                                email: latestOrder.billingAddress.email,                    
                                payment: latestOrder.billingAddress.payment
                            },
                            sponsorId: latestOrder.sponsorId,
                            items: latestOrder.items,
                            totalAmount: latestOrder.totalAmount,
                            totalQuantity: latestOrder.totalQuantity,
                            orderDate: latestOrder.orderDate,
                            orderId: val.payload.orderId,
                            sessionId: val.payload.sessionId,
                            transactionId: val.payload.transactionId,
                            userId: userIdd ? userIdd : 0
                        }
                        //console.log(fullData)
                        const getuse = userIdd
                        if(getuse){
                            try {
                                await checkOutSade(fullData)                                
                                window.location.href = `${val.payload.paymentUrl}`;                        
                            } catch (error) {
                                console.log(error)
                            }
        
                        }else{
                            try {                        
                                const checkouR = await checkOutRegister(fullData)
                                
                                window.location.href = `${val.payload.paymentUrl}`;
                            } catch (error) {
                                console.log(error)
                            }
                        }                
        
                        //router.push('checkout/order-received');
                        
                } catch (error) {
                    console.log(error)
                }
            }

            submitPayment()


        } catch (error) {
            console.log(error)
        }
        
    },[latestOrder,userIdd])

    

    

    return ( 
        <>
        <HeaderTwo />
            <main className="main-wrapper">
                <Section pClass="order-received">
                    {latestOrder && 
                        <>
                        <h3>Gözləyin ....</h3>
                        {/* <h1 className="thank-you-text">Ödəniş et</h1>
                        <div className="order-details">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th><input type='text' value={latestOrder.totalAmount}/></th>
                                        <th><button onClick={submitPayment}>Ödəniş et</button></th>
                                    </tr>
                                </tbody>
                                <tfoot>                                   
                                    <tr>
                                        <th>Total:</th>
                                        <th>{latestOrder.totalAmount}</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div> */}
                      
                        </>
                    }
                </Section>
            </main>
        <FooterTwo />
        </>
    );
}
 
export default OrderPayment;