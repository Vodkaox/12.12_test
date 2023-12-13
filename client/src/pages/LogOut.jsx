import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutTimer = setTimeout(() => navigate('/'), 1000);

    return () => clearTimeout(logoutTimer); // Cleanup timeout on component unmount
  }, [navigate]);

  return (
    <section>
      <p>Logged out</p>
    </section>
  );
};

export default LogOut;
