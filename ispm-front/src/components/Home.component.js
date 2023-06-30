import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Homecomponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, []);

  return null; // This component doesn't render anything, as it immediately redirects to /login
};

export default Homecomponent;