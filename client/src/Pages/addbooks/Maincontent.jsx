import React, { useState, useEffect } from 'react';
import './Maincontent.css';
import { useNavigate } from 'react-router-dom';
;
const MainContent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate()
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
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
  const [formFields, setFormFields] = useState({
    catCat:null,
    acqCat:null,
    holHol:null,
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormFields((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleUpdateButtonClick = async () => {
    // Do something with the form fields
    const res = await fetch('http://localhost:5000/addbooks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formFields)
    })
      .then((res) => {
        if (res.status === 200) {
          alert('Success');
          navigate('/dashboard')
        }
        else {
          alert('Something went wrong')
        }
      })
  };

  return (
    <div style={styles.mainContent}>
      <div style={styles.greeting}>
        <h2>Hello, User</h2>
        <p>{formatDate()}</p>
      </div>
      <hr style={styles.horizontalLine} />
      {/* Your main content goes here */}
      <div className="form-container">
        <div className="catologue">
          <h2> Catalog Info</h2>
          <div className="form-field">
            <label htmlFor="catCat">Cat.No</label>
            <input type="number" id="catCat" value={formFields.catCat} onChange={handleInputChange} />
          </div>
        </div>
        <div className="acquisition">
          <h2>Acquisition Info</h2>
          <div className="form-field">
            <label htmlFor="acqCat">Cat.No</label>
            <input type="number" id="acqCat" value={formFields.acqCat} onChange={handleInputChange} />
          </div>
        </div>
        <div className="holding">
          <h2>Holding Info</h2>
          <div className="form-field">
            <label htmlFor="holHol">hold No.</label>
            <input type="number" id="holHol" value={formFields.holHol} onChange={handleInputChange} />
          </div>
        </div>

        <button className="small-button" style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleUpdateButtonClick}>
          update
        </button>
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
