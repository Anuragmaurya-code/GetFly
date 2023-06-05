import React, { useState, useEffect } from 'react';
import './Maincontent.css';
import { useNavigate } from 'react-router-dom';
;
const MainContent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [data, setData] = useState({
    bi: '',
    tb: '',
    bic:'',
    bri:''
  });
  const navigate=useNavigate()
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const res = fetch('http://localhost:5000/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      setData(prevState=>{
        return {...prevState,tb:data.tb,bic:data.bic,bi:data.bi,bri:data.bri}
      })
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
    
    console.log(res)
  }, []);

  const formatDate = () => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return currentTime.toLocaleString('en-US', options);
  };

  return (
    <div style={styles.mainContent}>
      <div style={styles.greeting}>
        <h2>Hello, User</h2>
        <p>{formatDate()}</p>
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
};


