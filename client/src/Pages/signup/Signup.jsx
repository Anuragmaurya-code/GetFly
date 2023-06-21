import React, { useState } from 'react';
import './signup.css';

import logo from './logo.png';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [eye, setEye] = useState(false);
  const [formFields, setFormFields] = useState({
    sid: '',
    password: '',
    name: '',
    contact_number: '',
    class: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all fields are filled
    if (
      formFields.sid &&
      formFields.contact_number &&
      formFields.class &&
      formFields.name &&
      formFields.password
    ) {
      // Add code here for submitting the form
      fetch('http://localhost:5001/addStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formFields)
      })
        .then(response => response.json())
        .then(response => {
          if (response.result===true) {
            alert(response.message)
            navigate("/");
          } else {
            alert("Something went wrong");
          }
        })
        .catch(error => {
          // Handle any errors
          console.error(error);
        });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  return (
    <div className="container fontFamily1">
      <div className="sections">
        <div className="section-3">
          <img className="logoImg" src={logo} alt="err" />
        </div>
        <div className="line1" />
        <div className="section-4">
          <form className="loginForm" onSubmit={handleSubmit}>
            <p className="loginP headFontSize1">Signup</p>
            <p className="loginDesc bodyTextFontSize1">
              Welcome to Getfly. Please Signup to your account.
            </p>

            <div className="input-fields">
              <label htmlFor="name" className="bodyTextFontSize label1">
                Student Name <span className="red1">*</span>
              </label>
              <input
                type={eye ? 'text' : 'name'}
                name="name"
                id='name'
                placeholder="name"
                value={formFields.name}
                onChange={handleInputChange}
              />
              
            </div>
            <div className="input-fields">
              <label htmlFor="contact_number" className="bodyTextFontSize label1">
                Contact Number <span className="red1">*</span>
              </label>
              <input
                type={eye ? 'text' : 'contact_number'}
                name="contact_number"
                id='contact_number'
                placeholder="contact number"
                value={formFields.contact_number}
                onChange={handleInputChange}
              />
              
            </div>
            <div className="input-fields">
              <label htmlFor="class" className="bodyTextFontSize label1">
                Class <span className="red1">*</span>
              </label>
              <input
                type={eye ? 'text' : 'class'}
                id='class'
                name="class"
                placeholder="class"
                value={formFields.class}
                onChange={handleInputChange}
              />
              
            </div>
            <div className="input-fields">
              <label htmlFor="sid" className="bodyTextFontSize label1">
                College Id <span className="red1">*</span>
              </label>
              <input
                id='sid'
                type="text"
                name="sid"
                placeholder="id"
                value={formFields.sid}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-fields">
              <label htmlFor="password" className="bodyTextFontSize label1">
                Password <span className="red1">*</span>
              </label>
              <input
                type={eye ? 'text' : 'password'}
                id='password'
                name="password"
                placeholder="password"
                value={formFields.password}
                onChange={handleInputChange}
              />
              {eye ? (
                <AiFillEyeInvisible
                  className="eye1"
                  onClick={() => setEye(false)}
                />
              ) : (
                <AiFillEye className="eye1" onClick={() => setEye(true)} />
              )}
            </div>

            <button type="submit" className="button buttonFontSize">
              SIGN IN
            </button>
          </form>
          <p className="anchorP1">www.getflytechnologies.com</p>
        </div>
      </div>
    </div>
  );
}
