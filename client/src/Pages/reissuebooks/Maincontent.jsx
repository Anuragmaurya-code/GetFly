import React, { useState, useEffect } from 'react';
import './Maincontent.css';
import { useNavigate } from 'react-router-dom';

const MainContent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bookInfo, setBookInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      fetch('http://localhost:5000/reissuebooks')
      .then((res) => res.json())
      .then((data) => setBookInfo(data.info))
      .catch((error) => console.error('Error fetching book info:', error));
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
  const handleActionButtonClick = async(bookId, action) => {
    const selectedBook = bookInfo.find((book) => book.bookid === bookId);
    const payload = {
      ...selectedBook,
      action,
    };
    setBookList(oldArray=>[...oldArray,payload]);
  }

  const handleUpdateButtonClick = async (e) => {
    // Create an object with the selected book information and action

    try {
      const response = await fetch('http://localhost:5000/reissuebooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookList),
      });

      if (response.status === 200) {
        alert('Success');
        setBookList([]);
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
    book.bookid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.mainContent}>
      <div style={styles.greeting}>
        <h2>Hello, User</h2>
        <p>{formatDate()}</p>
      </div>
      <hr style={styles.horizontalLine} />

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by Book ID"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Render table with filtered book info */}
      <table>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Name</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.bookid}>
              <td>{book.bookid}</td>
              <td>{book.name}</td>
              <td>{book.from}</td>
              <td>{book.to}</td>
              <td>
                <button onClick={() => handleActionButtonClick(book.bookid, 'reissue')}>
                  Reissue
                </button>
                <button onClick={() => handleActionButtonClick(book.bookid, 'collect')}>
                  Collect
                </button>
              </td>
            </tr>
          ))}
          <button onClick={handleUpdateButtonClick}>Update</button>
        </tbody>
      </table>
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
