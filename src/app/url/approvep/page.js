'use client';
import { useRouter } from 'next/navigation'
import { useSelector,useDispatch } from "react-redux";
import Section from "@/components/elements/Section";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import HeaderTwo from "@/components/header/HeaderTwo";
import { checkOutRegister, checkOutSade } from '@/http/auth';
import { useState,useEffect } from 'react';

const ApprovePayment = () => {
    const router = useRouter();
    const [userIdd, setUserIdd] = useState('')
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.productData.orderItems);
    const latestOrder = orders[orders.length - 1];

    useEffect(()=>{
        const userId = localStorage.getItem("userid")
        setUserIdd(userId)
    },[])

    

    return ( 
        <>
        <HeaderTwo />
            <main className="main-wrapper">
                <Section pClass="order-received">                                
                        <div className="order-details">                            
                        approve
                        </div>                      
                </Section>
            </main>
        <FooterTwo />
        </>
    );
}
 
export default ApprovePayment;