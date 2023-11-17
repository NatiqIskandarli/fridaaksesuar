'use client';
import { getMyOrderById } from "@/http/auth";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/dateFormat";

const OrderView = ({params}) => {
    const [sifaris, setSifaris] = useState([])
    const [toplam, setToplam] = useState([])
    const [unvan, setUnvan] = useState('')
    //fake userid
    const userId = 1
    const catdirilma = 5

    useEffect(()=>{
        const fetchOrders = async () =>{
            const getOrder = await getMyOrderById(params.id,userId);
            console.log(getOrder)
            setUnvan(getOrder.userAdress.adress)
            setSifaris(getOrder.orderDetails)
            setToplam(getOrder.order)
        }
        fetchOrders()
    },[params.id,userId])
    
    return (
        <div className="axil-dashboard-order-view">
            <p>Sifariş nömrəsi <strong>#{toplam.id}</strong> və tarixi <strong>{formatDate(toplam.createdAt)}</strong>.</p>
            <div className="order-details">
                <h2 className="block-title">Sifarişin açıqlaması</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Məhsul</th>
                            <th>Toplam</th>
                        </tr>
                    </thead>
                    <tbody>
                    {sifaris.map((sif)=>(
                    <>
                        <tr>
                            <td>{sif.productName} <strong>X {sif.quantity}</strong></td>
                            <td>{sif.totalAmount} AZN</td>
                        </tr>
                    </>
                    ))}
                        
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Cəmi:</th>
                            <th>{toplam.totalAmount}</th>
                        </tr>
                        <tr>
                            <th>Çatdırılma:</th>
                            <th>{catdirilma}</th>
                        </tr>
                        <tr>
                            <th>Toplam məbləğ:</th>
                            <th>{toplam.totalAmount + catdirilma} AZN</th>
                        </tr>
                    </tfoot>
                </table>
            </div>            
            <div className="order-address">
                <h2 className="block-title">Çatdırılma Ünvanı</h2>
                <address>
                {unvan}
                </address>
            </div>
        </div>
    );
}

export default OrderView;