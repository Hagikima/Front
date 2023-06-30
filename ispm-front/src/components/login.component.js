import React, { useState } from 'react';
import backgroundImage from '../assets/bg_login.png'; // Update the path to your background image file
import '../styles/login.css';

const LoginComponent  = () => {
const [loginId, setLoginId] = useState('');
const [passphrase, setPassphrase] = useState('');
const [isLoggingIn, setIsLoggingIn] = useState(false);


const handleLogin = async () => {
    if (isLoggingIn) {
      return;
    }
    setIsLoggingIn(true);
    
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login_id: loginId,
          passphrase: passphrase,
        }),
      });
  
      if (response.status === 200) {
        // Login successful, redirect to user information page
        window.location.href = '/activesession';
      } else {
        // Invalid login ID or passphrase
        alert('Invalid login ID or passphrase');
      }
    } catch (error) {
      // Handle the error here
      console.error('Error occurred during login:', error);
      alert('An error occurred during login. Please try again.');
    }
    
    setIsLoggingIn(false);
  };
  
  return (
    <div className='login-container'>
        <div className='background-image' style={{ backgroundImage: `url(${backgroundImage})` }}></div>
        <div className='login-form'>
        <h5 className='login-form-title'>Login</h5>
        <form>
            <div className="form-group">
            <label htmlFor="loginId" className='idlabel'>Login ID</label>
            <input
                type="text"
                id="loginId"
                className='id-input'
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
            />
            </div>
            <div className="form-group">
            <label htmlFor="passphrase" className='passlabel'>Password</label>
            <input
                type="password"
                id="passphrase"
                className='pass-input'
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
            />
            </div>
            <button className='loginbut' disabled={isLoggingIn} type="submit" onClick={handleLogin}>Login</button>
        </form>
        </div>
    </div>
  );
};

export default LoginComponent;
