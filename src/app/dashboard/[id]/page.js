'use client';
import { getBalansById, getQrup } from "@/http/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const AltQrups = ({params}) => {
    const [balans, setBalans] = useState('')
    const [vezife, setVezife] = useState('')
    const [userIdd, setUserIdd] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [qrupOzu, setQrupOzu] = useState([])
    const [altQrup, setAltQrup] = useState([])



    useEffect(()=>{
        const fetchProfit = async () =>{
            try {
                const userId = localStorage.getItem("userid")
                setUserIdd(userId)
                if(userId){
                    const getQrupList =  await getQrup(params.id)
                    if(getQrupList){
                        setIsLoading(true)
                    }
                    setQrupOzu(getQrupList.sponsorunOzu)
                    setAltQrup(getQrupList.downlineUsers)
                }                
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfit()
    },[params])



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
                        Qol  {key+1} : {val.ad}     <b style={{color:"#f00"}}>Kodu : {val.id}</b>    
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
 
export default AltQrups;