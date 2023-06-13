import React, { useState, useEffect } from 'react';
import './Maincontent.css';
import { useNavigate } from 'react-router-dom';
import DateComponent from '../../components/DateComponent';
const MainContent = ({token}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [data, setData] = useState({
    bi: '',
    tb: '',
    bic:'',
    bri:''
  });
  const navigate=useNavigate()
  
  useEffect(() => {
    const res = fetch('http://localhost:5001/dashboard', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' +token,
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setData(prevState=>{
        return {...prevState,tb:data.booksCount,bic:data.circulationBooks,bi:data.issuedBooks,bri:data.booksReissued}
      })
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
    
    console.log(res)
  }, []);
  return (
    <div style={styles.mainContent}>
      <div style={styles.time}>
        <h2>Hello, User</h2>
        <div>
          <DateComponent />
        </div>
      </div>
      <hr style={styles.horizontalLine} />
      {/* Your main content goes here */}
      <div className="elements">
        <div className="dbcontent">
          <div className="text">Total number of books</div>
          <div className="tb">{data.tb}</div>
        </div>
        <div className="dbcontent">
          <div className="text">books</div>
          <div className="bic">{data.bic}</div>
        </div>
        <div className="dbcontent">
          <div className="text">Books issued</div>
          <div className="bi">{data.bi}</div>
        </div>
        <div className="dbcontent">
          <div className="text">Books reissued</div>
          <div className="bri">{data.bri}</div>
        </div>
      </div>

    </div>
  );
};

export default MainContent;

const styles = {
  mainContent: {
    flex: 1,
    padding: '20px',
  },
  greeting: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  horizontalLine: {
    border: 'none',
    borderTop: '1px solid #ccc',
    margin: '20px 0',
  },
  time: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};



