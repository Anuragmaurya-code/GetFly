import React, { useState } from 'react';
import './Maincontent.css';
import { useNavigate } from 'react-router-dom';
import DateComponent from '../../components/DateComponent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Maincontent = ({ token,name}) => {
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

  return (
    <div className="mainContent">
      <div className="time">
        <h2>Hello, {name}</h2>
        <div>
          <DateComponent />
        </div>
      </div>
      <hr className="horizontalLine" />
      {/* Your main content goes here */}
      <h2>Master Tab {'>'} Add Books</h2>
  
     
      <form onSubmit={handleSubmit}>
      <div className="form-field">
          <label htmlFor="book_id">
            Book_Id
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            id="book_id"
            name="book_id"
            value={formData.book_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="title">
            Title
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="sub_title">Sub_Title</label>
          <input
            type="text"
            id="sub_title"
            name="sub_title"
            value={formData.sub_title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="var_title">Var_Title</label>
          <input
            type="text"
            id="var_title"
            name="var_title"
            value={formData.var_title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="Author1">
            Author1
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            id="Author1"
            name="Author1"
            value={formData.Author1}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="Author2">Author2</label>
          <input
            type="text"
            id="Author2"
            name="Author2"
            value={formData.Author2}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="Author3">Author3</label>
          <input
            type="text"
            id="Author3"
            name="Author3"
            value={formData.Author3}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="corp_author">Corp_Author</label>
          <input
            type="text"
            id="corp_author"
            name="corp_author"
            value={formData.corp_author}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="volume">Volume</label>
          <input
            type="number"
            id="volume"
            name="volume"
            value={formData.volume}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="editor">Editor</label>
          <input
            type="text"
            id="editor"
            name="editor"
            value={formData.editor}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="edition">
            Edition
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            id="edition"
            name="edition"
            value={formData.edition}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="publishers">
            Publishers
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            id="publishers"
            name="publishers"
            value={formData.publishers}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="place">
            Place
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="year_of_publication">Year_Of_Publication<span style={{ color: 'red' }}>*</span></label>
          <select
            id="year_of_publication"
            name="year_of_publication"
            value={formData.year_of_publication}
            required
            onChange={handleInputChange}
          >
            <option value="">Select Year </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="date_added">Date_Added<span style={{ color: 'red' }}>*</span></label>
          <DatePicker
            selected={formData.date_added}
            onChange={(date) => handleDateChange("date_added", date)}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm:ss"
            timeFormat="HH:mm:ss"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="date_modified">Date_Modified</label>
          <DatePicker
            selected={formData.date_modified}
            onChange={(date) => handleDateChange("date_modified", date)}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm:ss"
            timeFormat="HH:mm:ss"
          />
        </div>
        <div className="form-field">
          <label htmlFor="library">Library</label>
          <input
            type="text"
            id="library"
            name="library"
            value={formData.library}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="amount">Amount <span style={{ color: 'red' }}>*</span></label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="order_number">Order_Number<span style={{ color: 'red' }}>*</span></label>
          <input
            type="number"
            id="order_number"
            name="order_number"
            value={formData.order_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="quantity">Quantity<span style={{ color: 'red' }}>*</span></label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
              <button type="submit" className="small-button" style={{ backgroundColor: 'darkblue', color: 'white' }}>
                Update
              </button>
        </div>
      </form>
    </div>
  );
};


  

export default Maincontent;
