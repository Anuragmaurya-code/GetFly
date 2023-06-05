import React, { useState, useEffect } from 'react';
import './Maincontent.css';
import { useNavigate } from 'react-router-dom';

const MainContent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState('');
  const [reportData, setReportData] = useState([]);

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

  const handleGenerateReport = () => {
    if (selectedReport) {
      fetch('http://localhost:5000/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportType: selectedReport }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Error: ' + res.status);
          }
        })
        .then((data) => {
          console.log(data);
          setReportData(data);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleReportSelection = (e) => {
    setSelectedReport(e.target.value);
  };

  return (
    <div style={styles.mainContent}>
      <div style={styles.greeting}>
        <h2>Hello, User</h2>
        <p>{formatDate()}</p>
      </div>
      <hr style={styles.horizontalLine} />

      <div>
        <h2>Generate Report</h2>
        <label htmlFor="report">Select Report:</label>
        <select id="report" onChange={handleReportSelection}>
          <option value="">Select a report</option>
          <option value="daily-transaction">Daily book transaction</option>
          <option value="daily-reissued">Daily book reissued</option>
          <option value="lost-book">Lost book</option>
          <option value="due-dated">Due dated book</option>
          <option value="circulated-book">Circulated book</option>
        </select>
        <button onClick={handleGenerateReport}>Generate Report</button>
      </div>

      {reportData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Name</th>
              <th>From Date</th>
              <th>To Date</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item) => (
              <tr key={item.bookId}>
                <td>{item.bookId}</td>
                <td>{item.name}</td>
                <td>{item.fromDate}</td>
                <td>{item.toDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
};

export default MainContent;
