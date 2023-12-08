'use client';
import { getQrupTarixce } from "@/http/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Tarixce = () => {
    const [userIdd, setUserIdd] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingIki, setIsLoadingIki] = useState(false)
    const [qrupOzu, setQrupOzu] = useState([])
    const [qrupSay, setQrupSay] = useState(0)
    const [altQrup, setAltQrup] = useState([])
    const [tarixTap, setTarixTap] = useState('')

    const axtarUser = async ()=>{
        if(tarixTap === ''){
            alert('Axtarmaq istədiyini tarixi seçin')
        }else{
            setIsLoadingIki(true)
            const yearMonth = tarixTap.substring(0, 7);
            
            // const currentDate = new Date();
            // const year = currentDate.getFullYear();
            // const month = currentDate.getMonth();//noyabr
            // const tarix = year+'-'+month
            
            const userId = localStorage.getItem("userid")

            const getQrupList =  await getQrupTarixce(userId,yearMonth)
            if(getQrupList){
                setIsLoading(true)
                setIsLoadingIki(false)
            }
            setQrupOzu(getQrupList.sponsorunOzu)
            setQrupSay(getQrupList.downlineCount)
            setAltQrup(getQrupList.downlineUsers)


        }        
    }
   

    useEffect(()=>{
        // const fetchProfit = async () =>{
        //     const currentDate = new Date();
        //     const year = currentDate.getFullYear();
        //     const month = currentDate.getMonth();//noyabr
        //     const tarix = year+'-'+month
            
        //     const userId = localStorage.getItem("userid")
        //     setUserIdd(userId)

        //     const getQrupList =  await getQrupTarixce(userId,tarix)
        //     if(getQrupList){
        //         setIsLoading(true)
        //     }
        //     setQrupOzu(getQrupList.sponsorunOzu)
        //     setQrupSay(getQrupList.downlineCount)
        //     setAltQrup(getQrupList.downlineUsers)
        // }
        // fetchProfit()
        const userId = localStorage.getItem("userid")
        setUserIdd(userId)
    },[userIdd])



    return ( 
        <>

        <form className="account-details-form" style={{marginBottom: "35px"}}>
            <div className="row">                
                <div className="col-lg-12">
                    <div className="form-group">
                        <label>Tarix seçimi edin</label>
                        <input type="date" className="form-control" onChange={(e)=>setTarixTap(e.target.value)}/>
                        
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

        {isLoadingIki ? <h3>Gözləyin...</h3> : ''}

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
                <div key={key} className="qollar">
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
                        href={`dashboard/${val.id}`}
                        target="_blank"
                        className="qrupaBax"
                        >Qrupa bax</Link>
                    </div>
                </div>
            ))} 
            </div>                    
        </div>

        : ''
        }
        </>
     );
}
 
export default Tarixce;