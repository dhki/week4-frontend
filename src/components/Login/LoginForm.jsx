import React, { useState } from 'react';
import './LoginForm.css'; // CSS 파일 임포트
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser } from '../../actions/userAction';

const LoginForm = () => {
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const handleRegisterClick = () => {
        setShowRegisterForm(true);
    };

    const handleLoginClick = () => {
        setShowRegisterForm(false);
    };

    const dispatch = useDispatch();
    const handleLogin = (e) => {
        e.preventDefault();
        // dispatch(loginUser());
    }

    return (
        <div className="login-form-container">
            {!showRegisterForm ? (
                <form onSubmit={handleLogin} className="login-form">
                    <button type='button' onClick={handleLogin} >login with kakao</button>
                    <h2>Login</h2>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                    <h3 onClick={handleRegisterClick}>Create Account</h3>
                </form>
            ) : (
                <form className="register-form">
                    <h2>Register</h2>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Register</button>
                    <h3 onClick={handleLoginClick}>Already have an account?</h3>
                </form>
            )}
        </div>
    );
};

export default LoginForm;
