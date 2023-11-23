'use client';
import { getBalansById, getQrup } from "@/http/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Dashboard = () => {
    const [balans, setBalans] = useState('')
    const [vezife, setVezife] = useState('')
    const [ozemail, setOzEmail] = useState('')
    const [userIdd, setUserIdd] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingIki, setIsLoadingIki] = useState(false)
    const [qrupOzu, setQrupOzu] = useState([])
    const [altQrup, setAltQrup] = useState([])
    const [altIkiQrup, setAltIkiQrup] = useState([])
    

    const altQrupCagir = async (id,email)=>{
        window.location.href=`dashboard/${id}`

        setIsLoadingIki(true)
        const getQrupList =  await getQrup(id)
        if(getQrupList){
            setAltIkiQrup(getQrupList.downlineUsers)
            setOzEmail(email)
            setIsLoadingIki(false)
        }
    }
    
    

    useEffect(()=>{
        const fetchProfit = async () =>{
            // const [getProfit,getQrupList] = await Promise.all([
            //     getBalansById(userid),
            //     getQrup(userid),
            // ])    
            // setBalans(getProfit.earnedMoney)
            // setVezife(getProfit.levelName)
            
            
            const userId = localStorage.getItem("userid")
            setUserIdd(userId)

            const getQrupList =  await getQrup(userId)
            if(getQrupList){
                setIsLoading(true)
            }
            setQrupOzu(getQrupList.sponsorunOzu)
            setAltQrup(getQrupList.downlineUsers)
        }
        fetchProfit()
    },[userIdd])



    return ( 
        <>
        {isLoading ? 
        <div className="axil-dashboard-overview">    
            <div className="mainSponsor">
                <div className="welcome-text" style={{marginBottom: "15px"}}>
                    Ad Soyad: {qrupOzu.ad} <b style={{color:"#f00"}}>Kodu : {qrupOzu.id}</b>
                </div>
                <div className="welcome-text" style={{marginBottom: "15px", backgroundColor:'#f0ecf7'}}>
                    <u style={{marginLeft:"25px"}}>Sponsor Adı : {qrupOzu.sponsoruKimdir} </u><br/>
                    <u style={{marginLeft:"25px"}}>Telefonu {qrupOzu.sponsoruKimdirtelefon}</u>                                
                </div>
                <div className="welcome-text" style={{marginBottom: "2px"}}>
                    <span>Email :</span> {qrupOzu.email}                
                </div>
                <div className="welcome-text" style={{marginBottom: "2px"}}>
                    <span>Balans :</span> {qrupOzu.qazanc ? parseFloat(qrupOzu.qazanc) : 0} AZN
                </div>
                <div className="welcome-text" style={{marginBottom: "5px"}}>
                    <span>Vəzifəsi :</span> {qrupOzu.vezifesi}
                </div>
                <span><b>Öz Dövriyyəsi :</b> {parseFloat(qrupOzu.OzDovriyyesi)}</span><br/>
                <span><b>Qrup Toplam Dövriyyə :</b> {parseFloat(qrupOzu.QrupToplamDovriyye)}</span>
            </div>
            <div className="altQruplar">
            {altQrup.map((val,key)=>(
                <div key={key} className="qollar">
                    <div className="welcome-text qol_ad">
                        Qol  {key+1} : {val.ad} <b style={{color:"#f00"}}>Kodu : {val.id}</b>
                    </div>
                    <div className="welcome-text qol_telefon">
                        <span>Telefon : </span>{val.telefon}                
                    </div>
                    <div className="welcome-text" style={{marginBottom: "2px"}}>
                        <span>Balans : </span>{val.qazanc ? parseFloat(val.qazanc) : 0} AZN
                    </div>
                    <div className="welcome-text" style={{marginBottom: "2px"}}>
                        <span>Vəzifəsi : </span>{val.vezifesi}
                    </div>
                    <div className="welcome-text">
                       <span> Öz Dövriyyəsi :</span> {parseFloat(val.OzDovriyyesi)}
                    </div>
                    <div className="welcome-text">
                        {/* <button onClick={()=>altQrupCagir(val.id, val.email)}>Qrupa bax</button> */}
                        <Link 
                        href={`dashboard/${val.id}`}
                        target="_blank"
                        className="qrupaBax"
                        >Qrupa bax</Link>
                    </div>
                </div>
            ))} 
            </div>
                    {isLoadingIki ? <h3>Gözləyin...</h3> : ""}
                    {altIkiQrup.length>0 ? <h3>Sponsor {ozemail}</h3> : ""}
                    {altIkiQrup.map((value, key) => (
                        <div key={key} style={{ marginLeft: "60px" }}>
                            <div className="welcome-text" style={{ marginBottom: "2px", marginTop: "20px" }}>
                                Ad Soyad : {value.ad}                
                            <div className="welcome-text" style={{ marginBottom: "2px", marginTop: "20px" }}>
                                Qol {key + 1} : {value.email}                
                            </div>
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