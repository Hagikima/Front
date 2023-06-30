import React from 'react';
import '../styles/logout.css';

const Logoutcomponent  = () => {
  const handleLogout = async () => {
    const response = await fetch('/logout', {
      method: 'GET',
    });

    if (response.status === 200) {
      // Logout successful, redirect to login page
      window.location.href = '/';
    } else {
      alert('Error occurred during logout');
    }
  };

  return (
    <div>
      <button className='logoutbut' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logoutcomponent;
