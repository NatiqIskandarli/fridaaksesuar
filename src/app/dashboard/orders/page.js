'use client';
import { getMyOrders } from "@/http/auth";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDate } from "@/utils/dateFormat";

const UserOrders = () => {

    const [sifarisler, setSifarisler] = useState([])
    //fake userid
    const userid = 1

    

    useEffect(()=>{
        const fetchOrders = async () =>{
            const getOrders = await getMyOrders(userid);
            setSifarisler([getOrders.dovriyye])
        }
        fetchOrders()
    },[userid])


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
                        {sifarisler.map((sifaris)=> (
                        <>
                        <tr>
                            <th scope="row">#{sifaris.id}</th>
                            <td>{formatDate(sifaris.createdAt)}</td>
                            <td>{sifaris.totalAmount} AZN</td>
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