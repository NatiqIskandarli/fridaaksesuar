'use client';
import { useRouter } from 'next/navigation'
import { useSelector,useDispatch } from "react-redux";
import Section from "@/components/elements/Section";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import HeaderTwo from "@/components/header/HeaderTwo";
import { checkOutRegister } from '@/http/auth';

const BalansPay = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.productData.orderItems);
    const latestOrder = orders[orders.length - 1];

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
            }
            console.log(fullData)
            //const payAndRegister = await checkOutRegister(fullData)
            //console.log(payAndRegister)

            router.push('checkout/order-received');

        } catch (error) {
            console.log(error)
        }
        
    }

    

    return ( 
        <>
        <HeaderTwo />
            <main className="main-wrapper">
                <Section pClass="order-received">
                    {latestOrder && 
                        <>
                        <h1 className="thank-you-text">Ödəniş et</h1>                     
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
                        </div>
                      
                        </>
                    }
                </Section>
            </main>
        <FooterTwo />
        </>
    );
}
 
export default BalansPay;