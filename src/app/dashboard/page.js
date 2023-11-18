'use client';
import { getBalansById, getQrup } from "@/http/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Dashboard = () => {
    const [balans, setBalans] = useState('')
    const [vezife, setVezife] = useState('')
    const [ozemail, setOzEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingIki, setIsLoadingIki] = useState(false)
    const [qrupOzu, setQrupOzu] = useState([])
    const [altQrup, setAltQrup] = useState([])
    const [altIkiQrup, setAltIkiQrup] = useState([])
    const getuserId = useSelector((state) => state.auth.userid);

    const altQrupCagir = async (id,email)=>{
        setIsLoadingIki(true)
        const getQrupList =  await getQrup(id)
        if(getQrupList){
            setAltIkiQrup(getQrupList.downlineUsers)
            setOzEmail(email)
            setIsLoadingIki(false)
        }
    }
    
    const userid = getuserId

    useEffect(()=>{
        const fetchProfit = async () =>{
            // const [getProfit,getQrupList] = await Promise.all([
            //     getBalansById(userid),
            //     getQrup(userid),
            // ])    
            // setBalans(getProfit.earnedMoney)
            // setVezife(getProfit.levelName)      
            
            
            const newuser = userid === 0 ? localStorage.getItem("userid") : userid

            const getQrupList =  await getQrup(newuser)
            if(getQrupList){
                setIsLoading(true)
            }
            setQrupOzu(getQrupList.sponsorunOzu)
            setAltQrup(getQrupList.downlineUsers)
        }
        fetchProfit()
    },[userid])



    return ( 
        <>
        {isLoading ? 
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

            <div className="">
            {altQrup.map((val,key)=>(
                <div key={key} style={{marginRight:"105px"}}>
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
                    <div className="welcome-text">
                        <button onClick={()=>altQrupCagir(val.id, val.email)}>Alt qrupa bax {val.email}</button>
                    </div>
                </div>
            ))} 
            </div>
                    {isLoadingIki ? <h3>Gözləyin...</h3> : ""}
                    {altIkiQrup.length>0 ? <h3>Sponsor {ozemail}</h3> : ""}
                    {altIkiQrup.map((value, key) => (
                        <div key={key} style={{ marginLeft: "60px" }}>
                           <div className="welcome-text" style={{ marginBottom: "2px", marginTop: "20px" }}>
                                Qol {key + 1} : {value.email}                
                                </div>
                                <div className="welcome-text" style={{ marginBottom: "2px" }}>
                                Balans : {value.qazanc ? parseFloat(value.qazanc) : 0} AZN
                                </div>
                                <div className="welcome-text" style={{ marginBottom: "2px" }}>
                                Vəzifəsi : {value.vezifesi}
                                </div>
                                <div className="welcome-text">
                                Öz Dövriyyəsi : {parseFloat(value.OzDovriyyesi)}
                                </div>                         
                           
                        </div>
                    ))}
        </div>

        : <h3>Yüklənir... Gözləyin...</h3>
        }
        </>
     );
}
 
export default Dashboard;