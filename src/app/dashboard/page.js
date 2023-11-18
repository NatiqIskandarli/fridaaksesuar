'use client';
import { getBalansById, getQrup } from "@/http/auth";
import { useEffect, useState } from "react";


const Dashboard = () => {
    const [balans, setBalans] = useState('')
    const [vezife, setVezife] = useState('')
    const [qrupOzu, setQrupOzu] = useState([])
    const [altQrup, setAltQrup] = useState([])
    //fake userid
    const userid = 1

    // useEffect(()=>{
        const fetchProfit = async () =>{
            // const [getProfit,getQrupList] = await Promise.all([
            //     getBalansById(userid),
            //     getQrup(userid),
            // ])    
            // setBalans(getProfit.earnedMoney)
            // setVezife(getProfit.levelName)            
            const getQrupList =  await getQrup(userid)
            console.log(getQrupList)
            setQrupOzu(getQrupList.sponsorunOzu)
            setAltQrup(getQrupList.downlineUsers)
        }
        fetchProfit()
    // },[userid])



    return ( 
        <div className="axil-dashboard-overview">            
            <div className="welcome-text" style={{marginBottom: "2px"}}>
                Sponsorun Ozu: {qrupOzu.email}                
            </div>
            <div className="welcome-text" style={{marginBottom: "2px"}}>
                Balans : {qrupOzu.qazanc ? parseFloat(qrupOzu.qazanc) : 0} AZN
            </div>
            <div className="welcome-text" style={{marginBottom: "5px"}}>
                Vəzifəsi : {qrupOzu.vezifesi}
            </div>
            <span>Öz Dövriyyəsi : {parseFloat(qrupOzu.OzDovriyyesi)}</span><br/>
            <span>Qrup Toplam Dövriyyə : {parseFloat(qrupOzu.QrupToplamDovriyye)}</span>

            {altQrup.map((val,key)=>(
                <div key={key}>
                    <div className="welcome-text" style={{marginBottom: "2px",marginTop:"20px"}}>
                        Qol {key+1} : {val.email}                
                    </div>
                    <div className="welcome-text" style={{marginBottom: "2px"}}>
                        Balans : {val.qazanc ? parseFloat(val.qazanc) : 0} AZN
                    </div>
                    <div className="welcome-text" style={{marginBottom: "2px"}}>
                        Vəzifəsi : {val.vezifesi}
                    </div>
                    <div className="welcome-text">
                        Öz Dövriyyəsi : {parseFloat(val.OzDovriyyesi)}
                    </div>
                </div>
            ))}
            


        </div>
     );
}
 
export default Dashboard;