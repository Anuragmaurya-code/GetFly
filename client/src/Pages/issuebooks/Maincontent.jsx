import React, { useState, useEffect } from 'react';
import './Maincontent.css';
import { useNavigate } from 'react-router-dom';
import DateComponent from '../../components/DateComponent';

const MainContent = ({ token,sid }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const [formFields, setFormFields] = useState({
    issue_date: '',
    due_date: '',
    book_id: '',
    sid: sid,
    return_date: '',
    quantity_id: '',
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    let date_ob = new Date();
    let issue_date =
      date_ob.getFullYear() +
      "-" +
      ("0" + (date_ob.getMonth() + 1)).slice(-2) +
      "-" +
      date_ob.getDate();
    let due_date =
      date_ob.getFullYear() +
      "-" +
      ("0" + (date_ob.getMonth() + 1)).slice(-2) +
      "-" +
      (date_ob.getDate() + 7);
    setFormFields((prevState) => ({
      ...prevState,
      [id]: value,
      issue_date: issue_date,
      due_date: due_date,
    }));
  };

  const handleUpdateButtonClick = async () => {
    // Do something with the form fields
    const res = await fetch('http://localhost:5001/issueBook', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formFields),
    }).then((res) => {
      if (res.status === 200) {
        alert('Success');
        navigate('/dashboard');
      } else {
        alert('Something went wrong');
      }
    });
  };

  return (
    <div className="mainContent">
      <div className="time">
        <h2>Hello, User</h2>
        <div>
          <DateComponent />
        </div>
      </div>
      <hr className="horizontalLine" />
      {/* Your main content goes here */}
      <div className="form-container">
        <div className="issueBooks">
          <h2>Master Tab {'>'} Issue Book</h2>
          <form onSubmit={handleUpdateButtonClick}>
           
            
            
            <div className="form-field">
              <label htmlFor="quantity_id">Quantity Id<span style={{ color: 'red' }}>*</span></label>
              <input type="text" id="quantity_id" value={formFields.quantity_id} onChange={handleInputChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="book_id">Book Id<span style={{ color: 'red' }}>*</span></label>
              <input type="text" id="book_id" value={formFields.book_id} onChange={handleInputChange} required />
            </div>
            <div>
              <button type="submit" className="small-button" style={{ backgroundColor: 'darkblue', color: 'white' }}>
                Issue Book
              </button>

            </div>

          </form>
        </div>


      </div>
    </div>
  );
};


export default MainContent;
