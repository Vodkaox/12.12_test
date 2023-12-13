import React, { useState, useEffect } from 'react';
import '../style/LogIn.css';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const LogIn = () => {
  const [credentials, setCredentials] = useState({ user: '', pwd: '' });
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    setErrMsg('');
  }, [credentials.user, credentials.pwd]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const LOGIN_URL = '/logIn';

    try {
      await axios.post(
        LOGIN_URL,
        JSON.stringify(credentials),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  return (
    <section className="container">
      <div className="sign-in">Sign in</div>
      <p className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user" className="label">Username:</label>
        <input
          type="text"
          id="user"
          className="input"
          autoComplete="off"
          onChange={handleChange}
          value={credentials.user}
          required
        />
        <label htmlFor="pwd" className="label">Password:</label>
        <input
          type="password"
          id="pwd"
          className="input"
          onChange={handleChange}
          value={credentials.pwd}
          required
        />
        <div>
          <button className="btn">Log In</button>
        </div>
      </form>
      <div><Link to="/sign-up" className="sign-up-letter">Sign Up</Link></div>
    </section>
  );
};

export default LogIn;
