import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../style/SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    user: "",
    pwd: "",
    perDescr: ""
  });
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setErrMsg("");
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/signUp", JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username is Already Exist");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <div className="container">
      <div>
        <div className="sign-up">Sign up</div>
        <p className={errMsg ? "err-msg" : "offscreen"}>{errMsg}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="user" className="label">Username:</label>
          <input
            type="text"
            id="user"
            className="input"
            autoComplete="off"
            onChange={handleChange}
            value={formData.user}
            required
          />
          <label htmlFor="pwd" className="label">Password:</label>
          <input
            type="password"
            id="pwd"
            className="input"
            onChange={handleChange}
            value={formData.pwd}
            required
          />
          <label htmlFor="perDescr" className="label">Personal Description:</label>
          <textarea
            id="perDescr"
            className="text-area"
            onChange={handleChange}
            value={formData.perDescr}
            required
          />
          <button className="btn" disabled={!formData.user || !formData.pwd || !formData.perDescr}>Submit</button>
        </form>
        <div className="register-prompt">
          Already registered? <Link to='/log-in' className="line">Sign in here</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
