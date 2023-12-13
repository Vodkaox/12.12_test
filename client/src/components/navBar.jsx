import React from 'react';
import '../style/navBar.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NavBar({ logInUserName }) {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.put('/logOut');
      navigate('/log-out');
    } catch (error) {
    }
  };

  const renderLoggedInButtons = () => {
    return (
      <>
        <div className="btn">
          <Link to={"/new-post"}>New Post</Link>
        </div>
        <div className="navbar-box-right">
          <div className="navbar-username">Welcome {logInUserName}!</div>
          <div className="btn">
            <Link to={`/profile/${logInUserName}`}>My Profile</Link>
          </div>
          <div className="btn" onClick={handleLogOut}>Log out</div>
        </div>
      </>
    );
  };

  const renderLoggedOutButtons = () => {
    return (
      <div className="navbar-box-right">
        <div className="btn">
          <Link to={"/log-in"}>Log In</Link>
        </div>
        <div className="btn">
          <Link to={"/sign-up"}>Sign Up</Link>
        </div>
      </div>
    );
  };

  return (
    <div className='navbar-frame'>
      <div className="navbar-box-left">
        <div className="btn"><Link to={"/"}>Home</Link></div>
        <div className="btn"><Link to={"/search"}>Search</Link></div>
        {logInUserName && renderLoggedInButtons()}
      </div>
      {!logInUserName && renderLoggedOutButtons()}
    </div>
  );
}
