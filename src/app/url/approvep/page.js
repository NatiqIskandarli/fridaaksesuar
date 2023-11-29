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
    const [yenilendi, setYenilendi] = useState('Gözləyin..')
    const orders = useSelector((state) => state.productData.orderItems);

    

    useEffect(()=>{        
        
        const updateM = async (val,userId,transactionId)=>{
            const totalAmount = val.payload.row.amount
            const orderId = val.payload.row.id
            const orderStatus = val.payload.row.orderstatus
            const card = val.payload.row.orderParams.paramsList[0].val
    
            const fullData = {
                totalAmount : totalAmount,    
                orderId : orderId,        
                orderStatus : orderStatus,        
                card : card,
                userId : userId,
                transactionId : transactionId
            }

   


            //console.log(fullData)
    
            // if(orderStatus === "APPROVED"){
                const updResult =await updateTransActionByOrderId(fullData)
                if(updResult.message ==="yenilendi"){
                    setTimeout(()=>{
                        setYenilendi('Ödəniş uğurla qəbul edildi Gözləyin..')
                       window.location.href = '/dashboard'
                    },1500)
                }else{
                    setYenilendi(updResult.message)
                    setTimeout(()=>{
                        window.location.href = ''
                    },1500)
                }
            // }else{
            //     setYenilendi('Ödəniş həyata keçmədi. Yenidən yoxlayın.')
            // }
            
        }





            const getTransAction = async ()=>{
                const userId = localStorage.getItem("userid")

                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const transactionId = urlParams.get('transactionId');
                //console.log(transactionId)
                setUserIdd(userId)
                

                try {                
                    const result = await getTransActionByUserId(transactionId);
                    //console.log(result)

                    const orderId = result[0].orderId
                    const sessionId = result[0].sessionId
                    

                    if(orderId){

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
                            console.log(val)
                            updateM(val,userId,transactionId)
                        }).catch((error) => console.error(error));  

                    }

                } catch (error) {
                    console.log(error)
                    window.location.href = '/'
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