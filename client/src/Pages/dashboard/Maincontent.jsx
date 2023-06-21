import React, { useState, useEffect } from 'react';
import './Maincontent.css';
import { useNavigate } from 'react-router-dom';
import DateComponent from '../../components/DateComponent';
const MainContent = ({token,name}) => {
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
    <div className= "mainContent">
      <div className="time">
        <h2>Hello, {name}</h2>
        <div>
          <DateComponent />
        </div>
      </div>
      <hr className="horizontalLine" />
      {/* Your main content goes here */}
      <div className="elements">
        <div className="dbcontent">
          <div className="text">Total No of Books</div>
          
          <div className="tb no">{data.tb}</div>
          
        </div>
        <div className="dbcontent">
          <div className="text">Books in Circulation</div>
          <div className="bic no">{data.bic}</div>
        </div>
        <div className="dbcontent">
          <div className="text">Books issued</div>
          <div className="bi no">{data.bi}</div>
        </div>
        <div className="dbcontent">
          <div className="text">Books Re issued</div>
          <div className="bri no">{data.bri}</div>
        </div>
      </div>

    </div>
  );
};

export default MainContent;



