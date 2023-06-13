import React, { useState, useEffect } from 'react';
import './Maincontent.css';
import { useNavigate } from 'react-router-dom';
import DateComponent from '../../components/DateComponent';
const MainContent = ({ token }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bookInfo, setBookInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [issuedBooks, setIssuedBooks] = useState({ issued_id: undefined }); // Initialize issuedBooks with an empty object

  useEffect(() => {
    const timer = setInterval(async () => {
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
          console.log(data);
          // Update state with the received data
          setBookInfo(data);
        } else {
          console.error('Error fetching book info:', res.status);
        }
      } catch (error) {
        console.error('Error fetching book info:', error);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
      setIssuedBooks({
        issued_id: selectedBook.issued_id,
      });
    } else if (action === 'collect') {
      setIssuedBooks(payload);
    }
    console.log(issuedBooks);
  };

  const handleUpdateButtonClick = async () => {
    console.log(issuedBooks);
    const url = issuedBooks.return_date ? 'http://localhost:5001/collectBook' : 'http://localhost:5001/reIssueBook';
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
    book.quantity_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.mainContent}>
      <div style={styles.time}>
        <h2>Hello, User</h2>
        <div>
          <DateComponent />
        </div>
      </div>
      <hr style={styles.horizontalLine} />
      <div className="form-container">
        <div className="issueBooks">
          <h2> Master Tab {'>'} Reissue, Collect </h2>
        </div>
      </div>
      <div className="form-container">
        <div className="catalogue">
          <h5>Catalogue Info</h5>
        </div>
      </div>

      {/* Search input */}
      <input
        type="text"
        placeholder="🔍 Search Quantity Id"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Render table with filtered book info */}
      <table>
        <thead>
          <tr>
            <th>Quantity ID</th>
            <th>Student ID</th>
            <th>Issue Date</th>
            <th>Return Date</th>
            <th>Approval</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.quantity_id}>
              <td>{book.quantity_id}</td>
              <td>{book.sid}</td>
              <td>{book.issue_date}</td>
              <td>{book.due_date}</td>
              <td>
                <button
                  className="small-button"
                  style={{ backgroundColor: 'blue', color: 'white' }}
                  onClick={() => handleActionButtonClick(book.issued_id, 'reissue')}
                >
                  Reissue
                </button>

                <button
                  className="small-button"
                  style={{ backgroundColor: 'green', color: 'white' }}
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
