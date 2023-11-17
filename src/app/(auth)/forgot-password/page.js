'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
    const [forgotEmail, setForgotEmail] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const onSubmit = (data) => {
        setForgotEmail(data);
    }
    return ( 
        <div className="axil-signin-form">
        <h3 className="title">Şifrəni unutmusuz?</h3>
        <p className="b2 mb--55">Email ünvanını qeyd edin, müvəqqəti şifrə sizin email ünvanına göndəriləcək</p>
        <form className="singin-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" {...register('email', { required: true, pattern: /^\S+@\S+$/i})} placeholder="annie@example.com" />
                {errors.email && <p className="error">Email is required.</p>}
            </div>
            <div className="form-group">
                <button type="submit" className="axil-btn btn-bg-primary submit-btn">Göndər</button>
                {forgotEmail && <p className="success">Uğurla göndərildi</p>}
            </div>
        </form>
    </div>
    );
}
 
export default ForgotPassword;