'use client';
import Link from "next/link";
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import AuthLayout from "../layout";
import { DaxilOl } from "@/store/slices/authSlice";
import { login } from "@/http/auth";

const SignIn = () => {
    // const {user} = useContext(Context)
    const dispatch = useDispatch();
    const router = useRouter();
    const [signInData, setSignInData] = useState(null);
    const [loginError, setLoginError] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const loginInfo = {
        email: "admin@email.com",
        password: "1234"
    }
    
    const onSubmit = async (data) => {

        try {
            const dataResult = await login(data.email, data.password)
            if(dataResult){    
                localStorage.setItem("userid",dataResult.userid)            
                dispatch(DaxilOl(dataResult.userid));
                router.push('/dashboard');
            }
            // user.setUser(user)
            // user.setIsAuth(true)
            //navigate(SHOP_ROUTE)
        } catch (error) {
            //console.log(error)
            setLoginError(true);
        }


        // if (data.email === loginInfo.email &&  data.password === loginInfo.password) {
        //     setSignInData(data);
        //     dispatch(logIn(data.email));
        //     router.push('/dashboard');
        // }else {
        //     setLoginError(true);
        // }
    }

    return ( 
        <AuthLayout bgImage="bg_image--9">
            <div className="axil-signin-form">
                <h3 className="title">Şəxsi kabinet.</h3>
                <form className="singin-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" {...register('email', { required: true })} />
                        {errors.email && <p className="error">Email is required.</p>}
                    </div>
                    <div className="form-group">
                        <label>Şifrə</label>
                        <input type="password" className="form-control" {...register('password', { required: true, minLength: 4})} />
                        {errors.password && <p className="error">Şifrəni qeyd edin.</p>}
                    </div>
                    <div className="form-group d-flex align-items-center justify-content-between">
                        <button type="submit" className="axil-btn btn-bg-primary submit-btn">Daxil olun</button>
                        <Link href="/forgot-password" className="forgot-btn">Şifrəni unutmusuz?</Link>
                    </div>
                    {loginError && <p className="error">User and Password doesn&apos;t match</p>}
                </form>
            </div>
        </AuthLayout>
     );
}
 
export default SignIn;