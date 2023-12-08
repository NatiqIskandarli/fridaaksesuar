'use client';
import { getMyOrders } from "@/http/auth";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDate } from "@/utils/dateFormat";

const UserOrders = () => {
    const [userIdd, setUserIdd] = useState('')
    const [sifarisler, setSifarisler] = useState([])
    //fake userid
    

    

    useEffect(()=>{
        const fetchOrders = async () =>{
            const userId = localStorage.getItem("userid")
            setUserIdd(userId)
            const getOrders = await getMyOrders(userId);
            setSifarisler(getOrders.dovriyye ? getOrders.dovriyye : "")
        }
        fetchOrders()
    },[])


    return ( 
        <div className="axil-dashboard-order">
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Sifariş No</th>
                            <th scope="col">Tarix</th>
                            <th scope="col">Cəmi Məbləğ</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sifarisler.map((sifaris,key)=> (
                        <>
                        <tr key={key}>
                            <th scope="row">#{sifaris.id}</th>
                            <td>{formatDate(sifaris.createdAt)}</td>
                            <td>{sifaris.totalAmount} AZN (kart)</td>
                            <td>
                                <Link href={`dashboard/orders/view/${sifaris.id}`} className="axil-btn view-btn">Ətraflı</Link>
                            </td>
                        </tr>
                        </>
                        ))}                        
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default UserOrders;