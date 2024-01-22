import React, { useState } from 'react';
import './LoginForm.css'; // CSS 파일 임포트

const LoginForm = () => {
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const handleRegisterClick = () => {
        setShowRegisterForm(true);
    };

    const handleLoginClick = () => {
        setShowRegisterForm(false);
    };

    return (
        <div className="login-form-container">
            {!showRegisterForm ? (
                <form className="login-form">
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
