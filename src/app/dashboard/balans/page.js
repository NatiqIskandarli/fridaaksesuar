'use client';
import { getBalansById, getQrup,userAxtarTap } from "@/http/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Balans = () => {
    const [userIdd, setUserIdd] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [qrupOzu, setQrupOzu] = useState([])
    const [qrupSay, setQrupSay] = useState(0)
    const [altQrup, setAltQrup] = useState([])
    const [seconds, setSeconds] = useState(0);
   
    useEffect(()=>{
        
        const fetchProfit = async () =>{
            
            const userId = localStorage.getItem("userid")
            setUserIdd(userId)

            const getQrupList =  await getQrup(userId)
            if(getQrupList){
                setIsLoading(true)
            }
            setQrupOzu(getQrupList.sponsorunOzu)
            setQrupSay(getQrupList.downlineCount)
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
                    <span>Balans :</span> {qrupOzu.qazanc ? parseFloat(qrupOzu.qazanc).toFixed(2) : 0} AZN
                </div>
                <div className="welcome-text" style={{marginBottom: "5px"}}>
                    <span>Vəzifəsi :</span> {qrupOzu.vezifesi}
                </div>
                <span><b>Öz Dövriyyəsi :</b> {parseFloat(qrupOzu.OzDovriyyesi)}</span><br/>
                <span><b>Qrup Toplam Dövriyyə :</b> {parseFloat(qrupOzu.QrupToplamDovriyye)}</span><br/>
                <span><b>Qrup say :</b> {parseFloat(qrupSay)}</span>
            </div>
            <div className="altQruplar">
            {altQrup.map((val,key)=>(
                <div key={key.id} className="qollar">
                    <div className="welcome-text qol_ad">
                        Qol  {key+1} : {val.ad} <b style={{color:"#f00"}}>Kodu : {val.id}</b>
                    </div>
                    <div className="welcome-text qol_telefon">
                        <span>Telefon : </span>{val.telefon}                
                    </div>
                    <div className="welcome-text" style={{marginBottom: "2px"}}>
                        <span>Balans : </span>{parseFloat(val.qazanc) ? parseFloat(val.qazanc).toFixed(2) : 0} AZN
                    </div>
                    <div className="welcome-text" style={{marginBottom: "2px"}}>
                        <span>Vəzifəsi : </span>{val.vezifesi}
                    </div>
                    <div className="welcome-text" style={{marginBottom: "2px"}}>
                       <span> Öz Dövriyyəsi :</span> {parseFloat(val.OzDovriyyesi)}
                    </div>
                    <div className="welcome-text">
                       <span> Qrup Toplam Dövriyyə :</span> {parseFloat(val.QrupToplamDovriyye)}
                    </div>
                    <div className="welcome-text">
                        {/* <button onClick={()=>altQrupCagir(val.id, val.email)}>Qrupa bax</button> */}
                        <Link 
                        href={`${val.id}`}
                        target="_blank"
                        className="qrupaBax"
                        >Qrupa bax</Link>
                    </div>
                </div>
            ))} 
            </div>
                   
        </div>

        : <h3>Yüklənir... Gözləyin...</h3>
        }
        </>
     );
}
 
export default Balans;