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
                        userId: userIdd ? userIdd : 0,
                        orderId : 0,
                        sessionId : 0,
                        transactionId : 0
                    }
        
                    const url = `${process.env.NEXT_PUBLIC_PAYRIFF_CREATE_URL}`;

                    const totalMebleg = latestOrder.totalAmount
                    //const totalMebleg = 0.01
            
                    const data =  {
                        "body": {
                          "amount": totalMebleg,
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
                        //console.log(val)
                        payM(val,fullData)                
                    }).catch((error) => console.error(error));  
        
                } catch (error) {
                    console.log(error)
                }
                
            }
        
        
            const payM = async (val,fullData) =>{
                try {
                        //console.log(val.payload);
        
                        fullData.orderId = val.payload.orderId
                        fullData.sessionId = val.payload.sessionId
                        fullData.transactionId = val.payload.transactionId       

                        const upDfullData = fullData
   
                        const getuse = userIdd
                        if(getuse){
                            try {
                                await checkOutSade(upDfullData)                                
                                window.location.href = `${val.payload.paymentUrl}`;                        
                            } catch (error) {
                                console.log(error)
                            }
        
                        }else{
                            try {                        
                                const checkReg = await checkOutRegister(upDfullData) 
                                console.log(checkReg)
                                localStorage.setItem("userid", checkReg.user.id)
                                if(checkReg.message){
                                    alert(checkReg.message)
                                }
//////////////asagidakini acarsan
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