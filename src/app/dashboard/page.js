'use client';
import { getBalansById, getQrup,userAxtarTap } from "@/http/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Dashboard = () => {
    const [balans, setBalans] = useState('')
    const [vezife, setVezife] = useState('')
    const [ozemail, setOzEmail] = useState('')
    const [userIdd, setUserIdd] = useState('')
    const [userTap, setUserTap] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingIki, setIsLoadingIki] = useState(false)
    const [isLoadingUc, setIsLoadingUc] = useState(false)
    const [qrupOzu, setQrupOzu] = useState([])
    const [qrupSay, setQrupSay] = useState(0)
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

    const axtarUser = async ()=>{
        if(userTap === ''){
            alert('Axtarmaq istədiyini istifadəçinin adını yazın')
        }else{
            setIsLoadingUc(true)
            const getAxtarilan =  await userAxtarTap(userTap)
            const getQrupList =  await getQrup(getAxtarilan.findUser.userId)
            if(getQrupList){
                setAltIkiQrup(getQrupList.sponsorunOzu)
                //setIsLoadingUc(false)
            }
        }        
    }
    
    

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
                        <span>Balans : </span>{parseFloat(val.qazanc) ? parseFloat(val.qazanc).toFixed() : 0} AZN
                    </div>
                    <div className="welcome-text" style={{marginBottom: "2px"}}>
                        <span>Vəzifəsi : </span>{val.vezifesi}
                    </div>
                    <div className="welcome-text">
                       <span> Öz Dövriyyəsi :</span> {parseFloat(val.OzDovriyyesi)}
                    </div>
                    {/* <div className="welcome-text">
                       <span> Qrup Toplam Dövriyyə :</span> {parseFloat(val.QrupToplamDovriyye)}
                    </div> */}
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
                    {/* {isLoadingIki ? <h3>Gözləyin...</h3> : ""}
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
                    ))} */}
        </div>

        : <h3>Yüklənir... Gözləyin...</h3>
        }
        </>
     );
}
 
export default Dashboard;