'use client';
import { useRouter } from 'next/navigation'
import { useSelector,useDispatch } from "react-redux";
import Section from "@/components/elements/Section";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import HeaderTwo from "@/components/header/HeaderTwo";
import { getTransActionByUserId, updateTransActionByOrderId } from '@/http/auth';
import { useState,useEffect } from 'react';
import { async } from 'regenerator-runtime';

const ApprovePayment = () => {
    const router = useRouter();
    const [userIdd, setUserIdd] = useState('')
    const [yenilendi, setYenilendi] = useState('')
    const orders = useSelector((state) => state.productData.orderItems);

    

    useEffect(()=>{        
        
        const updateM = async (val,userId)=>{
            const totalAmount = val.payload.row.amount
            const orderId = val.payload.row.id
            const orderStatus = val.payload.row.orderstatus
            const card = val.payload.row.orderParams.paramsList[0].val
    
            const fullData = {
                totalAmount : totalAmount,    
                orderId : orderId,        
                orderStatus : orderStatus,        
                card : card,
                userId : userId
            }
    
            const updResult =await updateTransActionByOrderId(fullData)
            if(updResult.message ==="yenilendi"){
                setYenilendi('Ödəniş uğurla qəbul edildiş Gözləyin..')
                window.location.href = ''
            }else{
                setYenilendi('Gözləyin..')
            }
        }





            const getTransAction = async ()=>{
                const userId = localStorage.getItem("userid")
                setUserIdd(userId)

                try {                
                    const result = await getTransActionByUserId(userId);

                    const orderId = result[0].orderId
                    const sessionId = result[0].sessionId

                    const url = `${process.env.NEXT_PUBLIC_PAYRIFF_GET_ORDER_URL}`;
        
                    const data =  {
                        "body": {
                            "languageType": "AZ",
                            "orderId": orderId,
                            "sessionId": `${sessionId}`
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
                        updateM(val,userId)
                    }).catch((error) => console.error(error));  

                } catch (error) {
                    console.log(error)
                    //window.location.href = '/'
                }
            }

            getTransAction()


    },[])

    

    

    return ( 
        <>
        <HeaderTwo />
            <main className="main-wrapper">
                <Section pClass="order-received">                                
                        <div className="order-details">                            
                        {yenilendi}
                        </div>                      
                </Section>
            </main>
        <FooterTwo />
        </>
    );
}
 
export default ApprovePayment;