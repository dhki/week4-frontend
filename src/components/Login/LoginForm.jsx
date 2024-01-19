import React from 'react';
import './LoginForm.css'; // CSS 파일 임포트

const LoginForm = () => {
    return (
        <div className="login-form-container">
            <form className="login-form">
                <h2>Login</h2>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
