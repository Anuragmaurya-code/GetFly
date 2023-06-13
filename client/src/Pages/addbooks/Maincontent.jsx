import React, { useState, useEffect } from 'react';
import './Maincontent.css';
import { useNavigate } from 'react-router-dom';

const Maincontent = () => {
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

  function formatDate() {
    let options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date(new Date()).toLocaleDateString(undefined, options);
    const day = new Date(new Date()).getDate();

    // Add ordinal suffix to the day
    let dayWithSuffix;
    if (day === 1 || day === 21 || day === 31) {
      dayWithSuffix = `${day}st`;
    } else if (day === 2 || day === 22) {
      dayWithSuffix = `${day}nd`;
    } else if (day === 3 || day === 23) {
      dayWithSuffix = `${day}rd`;
    } else {
      dayWithSuffix = `${day}th`;
    }
    options = { weekday: 'long' };
    const currentDate = new Date();
    const dayOfWeek = currentDate.toLocaleString('en-US', options);
    options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedTime = new Date().toLocaleTimeString('en-US', options);
    return [formattedDate.replace(/(\d+)/, dayWithSuffix), dayOfWeek, formattedTime.replace(/:/g, '.')];
  }

  const [formFields, setFormFields] = useState({
    catCat: null,
    title: null,
    subtitle: null,
    publisher: null,
    year: null,
    author1: null,
    author2: null,
    place: null,
    subject: null,
    country: null,
    userCode: null,
    dateAdded: null,
    acqCat: null,
    acqAcq: null,
    library: null,
    holHol: null,
    holAcq: null,
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormFields((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleUpdateButtonClick = async () => {
    // Do something with the form fields
    const res = await fetch('http://localhost:5000/addbooks', {
      method: 'POST',
      headers: {
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
    <div className="main-container" style={styles.mainContent}>
      <div style={styles.time}>
        <h2>Hello, User</h2>
        <div>
          <p>{formatDate()[0]}<br/>{formatDate()[1]}<br/>{formatDate()[2]}</p>
        </div>
      </div>
      <hr style={styles.horizontalLine} />
      {/* Your main content goes here */}
      <h2>Master Tab {'>'} Add Books</h2>
      <form className="form-container" onSubmit={handleUpdateButtonClick}>
        <div className="catalogue">
          <h2>Catalog Info</h2>
          <label htmlFor="catCat">Cat.No</label>
          <input type="number" id="catCat" value={formFields.catCat} onChange={handleInputChange} />
          <label htmlFor="title">Title</label>
          <input type="text" id="title" value={formFields.title} onChange={handleInputChange} />
          <label htmlFor="subtitle">Subtitle</label>
          <input type="text" id="subtitle" value={formFields.subtitle} onChange={handleInputChange} />
          <label htmlFor="publisher">Publisher</label>
          <input type="text" id="publisher" value={formFields.publisher} onChange={handleInputChange} />
          <label htmlFor="year">Year</label>
          <input type="text" id="year" value={formFields.year} onChange={handleInputChange} />
          <label htmlFor="author1">Author 1</label>
          <input type="text" id="author1" value={formFields.author1} onChange={handleInputChange} />
          <label htmlFor="author2">Author 2</label>
          <input type="text" id="author2" value={formFields.author2} onChange={handleInputChange} />
          <label htmlFor="place">Place</label>
          <input type="text" id="place" value={formFields.place} onChange={handleInputChange} />
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" value={formFields.subject} onChange={handleInputChange} />
          <label htmlFor="country">Country</label>
          <input type="text" id="country" value={formFields.country} onChange={handleInputChange} />
          <label htmlFor="userCode">User Code</label>
          <input type="text" id="userCode" value={formFields.userCode} onChange={handleInputChange} />
          <label htmlFor="dateAdded">Date Added</label>
          <input type="text" id="dateAdded" value={formFields.dateAdded} onChange={handleInputChange} />
        </div>
        <div className="acquisition">
          <h2>Acquisition Info</h2>
          <label htmlFor="acqCat">Cat.No</label>
          <input type="number" id="acqCat" value={formFields.acqCat} onChange={handleInputChange} />
          <label htmlFor="acqAcq">Acq ID</label>
          <input type="number" id="acqAcq" value={formFields.acqAcq} onChange={handleInputChange} />
          <label htmlFor="library">Library</label>
          <input type="number" id="library" value={formFields.library} onChange={handleInputChange} />
        </div>
        <div className="holding">
          <h2>Holding Info</h2>
          <label htmlFor="holHol">Hold No.</label>
          <input type="number" id="holHol" value={formFields.holHol} onChange={handleInputChange} />
          <label htmlFor="holAcq">Acq ID</label>
          <input type="number" id="holAcq" value={formFields.holAcq} onChange={handleInputChange} />
        </div>
        <button className="small-button" style={{ backgroundColor: 'blue', color: 'white' }}>
          update
        </button>
      </form>
    </div>
  );
};

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
  time:{
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems:'center' 
  }
};

export default Maincontent;
