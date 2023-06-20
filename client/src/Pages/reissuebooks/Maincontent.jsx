import React, { useState, useEffect } from 'react';
import './Maincontent.css';
import { useNavigate } from 'react-router-dom';
import DateComponent from '../../components/DateComponent';

const MainContent = ({ token }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bookInfo, setBookInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [issuedBooks, setIssuedBooks] = useState({ issued_id: undefined });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5001/issues', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          
          setBookInfo(data);
          console.log(bookInfo);
        } else {
          console.error('Error fetching book info:', res.status);
        }
      } catch (error) {
        console.error('Error fetching book info:', error);
      }
    };

    const timer = setInterval(fetchData, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [token]);

  const formatDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const handleActionButtonClick = (issued_id, action) => {
    const selectedBook = bookInfo.find((book) => book.issued_id === issued_id);
    const payload = {
      issued_id: selectedBook.issued_id,
      return_date: formatDate(),
    };
    if (action === 'reissue') {
      setIssuedBooks({ issued_id: selectedBook.issued_id });
    } else if (action === 'collect') {
      setIssuedBooks(payload);
    }
  };

  const handleUpdateButtonClick = async () => {
    const url = issuedBooks.return_date
      ? 'http://localhost:5001/collectBook'
      : 'http://localhost:5001/reIssueBook';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(issuedBooks),
      });

      if (response.ok) {
        alert('Success');
        navigate('/reissuebooks');
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = bookInfo.filter((book) =>
    book.book_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mainContent">
      <div className="time">
        <h2>Hello, User</h2>
        <div>
          <DateComponent />
        </div>
      </div>
      <hr className="horizontalLine" />
      <div className="form-container">
        <div className="issueBooks">
          <h2>Master Tab &gt; Reissue, Collect</h2>
        </div>
      </div>
      <div className="form-container">
        <div className="catalogue">
          <h5>Catalogue Info</h5>
        </div>
      </div>

      {/* Search input */}
      <input
        className="search"
        type="text"
        placeholder="🔍 Search Book Id"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Render table with filtered book info */}
      
      {/* Render table with filtered book info */}
      <table>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Student ID</th>
            <th>Issue Date</th>
            <th>Due Date</th>
            <th>Approval</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.issued_id}>
              <td>{book.book_id}</td>
              <td>{book.sid}</td>
              <td>{book.issue_date}</td>
              <td>{book.due_date}</td>
              <td>
                <button
                  className="rbutton"
                  onClick={() => handleActionButtonClick(book.issued_id, 'reissue')}
                >
                  Reissue
                </button>
                <button
                  className="cbutton"
                  onClick={() => handleActionButtonClick(book.issued_id, 'collect')}
                >
                  Collect
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



      <button
        className="up-button"
        style={{ backgroundColor: 'blue', color: 'white', justifyContent: 'center' }}
        onClick={handleUpdateButtonClick}
      >
        Update
      </button>
    </div>
  );
};

export default MainContent;
