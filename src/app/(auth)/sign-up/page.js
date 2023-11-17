'use client';
import { createUser,addNetworkUser } from '@/http/auth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const SignUp = () => {
   // const [signupData, setSignupData] = useState(null);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [sponsorId, setSponsorId] = useState('')
    const [isAuth, setIsAuth] = useState(false)

    const handleSubmit = async () => {
        try {
            let data = await addNetworkUser(email,password,sponsorId)
            console.log(data)
            setIsAuth(true)
        } catch (error) {
            console.log(error)
        }        
    }

    // useEffect(()=>{
    //     console.log(process.env.NEXT_PUBLIC_APP_API_URL)
    // },[signupData])

    return ( 
        <div className="axil-signin-form">
            <h3 className="title">I&apos;m New Here</h3>
            <p className="b2 mb--55">Enter your detail below</p>
            <form className="singin-form">
                <div className="form-group">
                    <label>Choose Sponsor</label>
                    <input 
                        type="text" 
                        className="form-control"
                        onChange={(e)=>setSponsorId(e.target.value)}
                        placeholder="admin"/>
                    {sponsorId && <p className="error">sponsorId is required.</p>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        className="form-control"
                        onChange={(e)=>setEmail(e.target.value)} 
                        placeholder="annie@example.com" />
                    {email && <p className="error">Email is required.</p>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control"
                        onChange={(e)=>setPassword(e.target.value)} />
                    {password && <p className="error">Password is required.</p>}
                </div>
                <div className="form-group">
                    <button type="button" className="axil-btn btn-bg-primary submit-btn" onClick={handleSubmit}>Create Account</button>
                    {isAuth && <p className="success">Account Created successfully</p> }
                </div>
            </form>
        </div>
     );
}
 
export default SignUp;