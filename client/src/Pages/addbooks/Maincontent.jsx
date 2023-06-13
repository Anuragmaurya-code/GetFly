import React, { useState } from 'react';
import './Maincontent.css';
import { useNavigate } from 'react-router-dom';
import DateComponent from '../../components/DateComponent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Maincontent = ({ token }) => {
  const [formData, setFormData] = useState({
    book_id: '',
    title: '',
    sub_title: '',
    var_title: null,
    Author1: '',
    Author2: null,
    Author3: null,
    corp_author: null,
    volume: 1,
    editor: null,
    edition: '',
    publishers: '',
    place: '',
    year_of_publication: undefined,
    date_added: null,
    date_modified: null,
    library: null,
    amount: 0,
    order_number: 0,
    quantity: 0,
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (key, date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: date,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Do something with the form fields
    const res = await fetch('http://localhost:5001/addBook', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.status === 200) {
        alert('Success');
        navigate('/dashboard');
      } else {
        alert('Something went wrong');
      }
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, index) => currentYear - index);

  const formFields = Object.keys(formData).map((key) => (
    <div key={key}>
      <label htmlFor={key}>{key}</label>
      {key === 'volume' || key === 'year_of_publication' || key === 'amount' || key === 'order_number' || key === 'quantity' ? (
        key === 'year_of_publication' ? (
          <select
            id={key}
            name={key}
            value={formData[key]}
            onChange={handleInputChange}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="number"
            id={key}
            name={key}
            value={formData[key]}
            onChange={handleInputChange}
          />
        )
      ) : key === 'date_added' || key === 'date_modified' ? (
        <DatePicker
          selected={formData[key]}
          onChange={(date) => handleDateChange(key, date)}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm:ss"
          timeFormat="HH:mm:ss"
        />
      ) : (
        <input
          type="text"
          id={key}
          name={key}
          value={formData[key]}
          onChange={handleInputChange}
          required={key === 'book_id' || key === 'title' || key === 'Author1' || key === 'edition' || key === 'publishers' || key === 'place'}
        />
      )}
    </div>
  ));

  return (
    <div className="main-container" style={styles.mainContent}>
      <div style={styles.time}>
        <h2>Hello, User</h2>
        <div>
          <DateComponent />
        </div>
      </div>
      <hr style={styles.horizontalLine} />
      {/* Your main content goes here */}
      <h2>Master Tab {'>'} Add Books</h2>
      <form onSubmit={handleSubmit}>
        {formFields}
        <button type="submit">Submit</button>
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
  time: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export default Maincontent;
