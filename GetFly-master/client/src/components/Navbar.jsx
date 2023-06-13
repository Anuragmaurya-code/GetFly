import React from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarLeft}>
        <img src={logo} alt="Academate Logo" style={styles.logo} />
        <span style={styles.name}>Academate</span>
      </div>
      <div style={styles.navbarRight}>
      <i className="fas fa-user"></i>
        <span style={styles.dashboard}> <Link to='/dashboard' style={styles.link}>Dashboard</Link> </span>
      </div>
    </nav>
  );
};

export default Navbar;

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '10px',
  },
  navbarLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '40px',
    height: '40px',
    marginRight: '10px',
  },
  name: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  navbarRight: {
    marginRight: '10px',
  },
  dashboard: {
    fontWeight: 'bold',
  },
  link:{
    color:'inherit',
    textDecoration:'none',
  }
};