import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <aside style={styles.sidebar}>
      <ul style={styles.optionList}>
        <li style={styles.option} onClick={toggleOptions}>
          <i className="fas fa-table" style={styles.icon}></i>
          <span style={styles.optionText}>Master Tab</span>
        </li>
        {showOptions && (
          <React.Fragment>
            <li style={styles.subOption}>
              <span style={styles.subOptionText}><Link to='/addbooks'>Add Books</Link> </span>
            </li>
            <li style={styles.subOption}>
              <span style={styles.subOptionText}><Link to='/issuebooks'>Issue Books</Link></span>
            </li>
            <li style={styles.subOption}>
              <span style={styles.subOptionText}><Link to='/reissuebooks'>Reissue Books</Link></span>
            </li>
          </React.Fragment>
        )}
        <li style={styles.option}>
          <i className="fas fa-receipt" style={styles.icon}></i>
          <span style={styles.optionText}><Link to='/report'>Generate Receipts</Link></span>
        </li>
        <li style={styles.option}>
          <i className="fas fa-sign-out-alt" style={styles.icon}></i>
          <span style={styles.optionText}>Logout</span>
        </li>
      </ul>
      <footer style={styles.footer}>
        <p style={styles.footerText}>Ⓒ GetFly Technologies</p>
      </footer>
    </aside>
  );
};

export default Sidebar;

const styles = {
  sidebar: {
    backgroundColor: '#f9f9f9',
    padding: '10px',
  },
  optionList: {
    listStyleType: 'none',
    padding: 0,
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
    cursor: 'pointer',
  },
  subOption: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '30px',
    cursor: 'pointer',
  },
  icon: {
    marginRight: '10px',
  },
  optionText: {
    fontSize: '16px',
  },
  subOptionText: {
    fontSize: '14px',
  },
  footer: {
    marginTop: 'auto',
    alignSelf: 'flex-end',
  },
  footerText: {
    fontSize: '12px',
    color: '#666',
    alignSelf: 'flex-end',
  },
};
