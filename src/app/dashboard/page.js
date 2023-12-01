'use client';
import { getBalansById, getQrup,userAxtarTap } from "@/http/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Dashboard = () => {
    const [userTap, setUserTap] = useState('')
    const [isLoadingUc, setIsLoadingUc] = useState(false)
    const [qrupSay, setQrupSay] = useState(0)
    const [altIkiQrup, setAltIkiQrup] = useState([])
    
    const axtarUser = async ()=>{
        if(userTap === ''){
            alert('Axtarmaq istədiyini istifadəçinin adını yazın')
        }else{
            setIsLoadingUc(true)
            const getAxtarilan =  await userAxtarTap(userTap)
            const getQrupList =  await getQrup(getAxtarilan.findUser.userId)
            if(getQrupList){
                setAltIkiQrup(getQrupList.sponsorunOzu)
                setQrupSay(getQrupList.downlineCount)
            }
        }        
    }
    

    return ( 
        <>

        <form className="account-details-form" style={{marginBottom: "35px"}}>
            <div className="row">                
                <div className="col-lg-12">
                    <div className="form-group">
                        <label>İstifadəçi Axtar</label>
                        <input type="text" className="form-control" onChange={(e)=>setUserTap(e.target.value)}/>
                        
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="form-group mb--0">
                        <input type="button" 
                        className="axil-btn" 
                        value="Axtar" 
                        onClick={axtarUser}
                        style={{width:"150px",backgroundColor:"#7c55c1", color:"#fff"}}/>
                    </div>
                </div>
            </div>
        </form>

        {isLoadingUc ? 
        <>
        {altIkiQrup.ad ? '' : <h3>Yüklənir... Gözləyin...</h3>}

        <div className="axil-dashboard-overview" style={{marginBottom: "35px", backgroundColor:"#f8f4f4"}}>
            <div className="mainSponsor">
                <div className="welcome-text" style={{marginBottom: "15px"}}>
                    Ad Soyad: {altIkiQrup.ad} <b style={{color:"#f00"}}>Kodu : {altIkiQrup.id}</b>
                </div>
                <div className="welcome-text" style={{marginBottom: "15px", backgroundColor:'#f0ecf7'}}>
                    <u style={{marginLeft:"25px"}}>Sponsor Adı : {altIkiQrup.sponsoruKimdir} </u><br/>
                    <u style={{marginLeft:"25px"}}>Telefonu {altIkiQrup.sponsoruKimdirtelefon}</u>                                
                </div>
                <div className="welcome-text" style={{marginBottom: "2px"}}>
                    <span>Email :</span> {altIkiQrup.email}                
                </div>
                <div className="welcome-text" style={{marginBottom: "2px"}}>
                    <span>Balans :</span> {altIkiQrup.qazanc ? parseFloat(altIkiQrup.qazanc) : 0} AZN
                </div>
                <div className="welcome-text" style={{marginBottom: "5px"}}>
                    <span>Vəzifəsi :</span> {altIkiQrup.vezifesi}
                </div>
                <span><b>Öz Dövriyyəsi :</b> {parseFloat(altIkiQrup.OzDovriyyesi)}</span><br/>
                <span><b>Qrup Toplam Dövriyyə :</b> {parseFloat(altIkiQrup.QrupToplamDovriyye)}</span><br/>
                <span><b>Qrup say :</b> {parseFloat(qrupSay)}</span>
            </div>
        </div>
        </>
        : ''
        }

        
        </>
     );
}
 
export default Dashboard;