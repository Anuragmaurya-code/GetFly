import React, { useState } from 'react';
import './login.css';
import logo from './logo.png';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
export default function Login({onLogin}) {
  const [eye, setEye] = useState(false);
  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add code here for submitting the form
    fetch('http://localhost:5001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formFields)
    })
      .then(response => response.json())
      .then(response => {
        if (response.token)
        { onLogin(response.token)
          navigate("/dashboard")
        }
        else
          alert("Invalid Credentials");

      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  return (
    <div className="container fontFamily">
      <div className="sections">
        <div className="section-1">
          <img className="logoImg" src={logo} alt="err" />
        </div>
        <div className="line" />
        <div className="section-2">
          <form className="loginForm" onSubmit={handleSubmit}>
            <p className="loginP headingFontSize">Login</p>
            <p className="loginDesc bodyTextFontSize">
              Welcome to Getfly. Please login to your account.
            </p>
            <div className="input-fields">
              <label htmlFor="college-id" className="bodyTextFontSize label">
                College Id <span className="red">*</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="id@pvppcoe.ac.in"
                value={formFields.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-fields">
              <label htmlFor="college-id" className="bodyTextFontSize label">
                Password <span className="red">*</span>
              </label>
              <input
                type={eye ? 'text' : 'password'}
                name="password"
                placeholder="password"
                value={formFields.password}
                onChange={handleInputChange}
              />
              {eye ? (
                <AiFillEyeInvisible
                  className="eye"
                  onClick={() => setEye(false)}
                />
              ) : (
                <AiFillEye
                  className="eye"
                  onClick={() => setEye(true)}
                />
              )}
            </div>
            <button type="submit" className="button buttonFontSize">
              LOGIN
            </button>
          </form>
          <p className="anchorP">www.getflytechnologies.com</p>
        </div>
      </div>
    </div>
  );
}
