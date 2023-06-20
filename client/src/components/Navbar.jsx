import React from 'react';
import './Navbar.css';
import logo from './logo.png';
import logo1 from './logo1.png';
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbarLeft">
        <img src={logo} alt="Academate Logo" className="logo" />
        <span className="name">Academate </span>
      </div>
      <hr className="horizontalLine" />
      <div className="navbarRight">
        <i className="fas fa-user"></i>
        <img src={logo1} alt="dashboard Logo" className="logo1" />
        <span className="dashboard"> <Link to='/dashboard' className="link">Dashboard</Link> </span>
      </div>

    </nav>



  );
}

export default Navbar;

