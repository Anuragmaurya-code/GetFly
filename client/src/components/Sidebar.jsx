import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo3 from './logo3.png';
import logo4 from './logo4.png';
import logo5 from './logo5.png';
const Sidebar = ({onLogout}) => {
  const [showOptions, setShowOptions] = useState(false);

  function toggleOptions() {
    setShowOptions(!showOptions);
  }

  return (

    <aside className= "sidebar">
      <ul className="optionList">
        <li className="option">
          <i className="icon"></i>
          <img src={logo5} alt="report Logo" className="logo5" />
          <span className="optionText"><Link to='/report' className="link">Generate Reports</Link></span>
        </li>
        <li className= "option" onClick={toggleOptions}>
          <i className="icon"></i>
          <img src={logo4} alt="master Logo" className="logo4" />
          <span className= "optionText">Master Tab</span>
        </li>
        {showOptions && (
          <React.Fragment>
            <li className= "subOption">
              <span className= "subOptionText"><Link to='/addbooks' className="link">Add Books</Link> </span>
            </li>
            <li className="subOption">
              <span className= "subOptionText"><Link to='/issuebooks' className= "link">Issue Books</Link></span>
            </li>
            <li className= "subOption">
              <span className= "subOptionText"><Link to='/reissuebooks' className=" link">Reissue Books</Link></span>
            </li>
          </React.Fragment>
        )}

        <li className= "option">
          <i className="icon"></i>
          <img src={logo3} alt="logout Logo" className="logo3" />
          <span className= "optionText" onClick={onLogout}>Logout</span>
        </li>
      </ul>
      
      <footer className= "footer">
        <p className= "footerText">Ⓒ GetFly Technologies</p>
      </footer>
    </aside>
  );
};

export default Sidebar;

