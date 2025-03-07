'use client';
import Link from "next/link";
import { getMyAdress } from "@/http/auth";
import { useEffect, useState } from "react";

const UserAddress = () => {
    const [unvan, setUnvan] = useState('')
    const [userIdd, setUserIdd] = useState('')
    //fake userid
    // const userId = localStorage.getItem("userid")

    useEffect(()=>{
        const fetchOrders = async () =>{
            const userId = localStorage.getItem("userid")        
            setUserIdd(userId)
            const getOrder = await getMyAdress(userId);
            setUnvan(getOrder.adress)
        }
        fetchOrders()
    },[])


    return ( 
        <div className="axil-dashboard-address">
            <div className="row row--30">
                <div className="col-lg-6">
                    <div className="address-info mb--40">
                        <div className="addrss-header d-flex align-items-center justify-content-between">
                            <h4 className="title mb-0">Çatdırılma Ünvanım</h4>
                            <Link href={`/dashboard/addresses-edit/shipping/${userIdd}`}className="address-edit"><i className="far fa-edit" /></Link>
                        </div>
                        <div>
                            <p>
                                {unvan}
                            </p>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    );
}
 
export default UserAddress;