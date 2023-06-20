import React, { useState, useEffect } from 'react';
import './Maincontent.css';
import { useNavigate } from 'react-router-dom';
import DateComponent from '../../components/DateComponent';
import { saveAs } from 'file-saver';

const MainContent = ({ token }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState('');
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleGenerateReport = () => {
    if (selectedReport && startDate && endDate) {
      const queryParams = new URLSearchParams({
        reportName: selectedReport,
        startDate,
        endDate
      }).toString();
      console.log(queryParams);
      fetch('http://localhost:5001/report?' + queryParams, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.ok) {
            console.log('done!');
            return res.blob();
          } else {
            throw new Error('Error: ' + res.status);
          }
        })
        .then((blob) => {
          // Save the blob as an Excel file
          saveAs(blob, 'report.xlsx');
        })
        .catch((error) => console.log(error));
    }
  };

  const handleReportSelection = (e) => {
    setSelectedReport(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  const today = new Date();
  today.setDate(today.getDate());



  return (
    <div className="mainContent">
      <div className="time">
        <h2>Hello, User</h2>
        <div>
          <DateComponent />
        </div>
      </div>
      <hr className="horizontalLine" />

      <div>
        <div className="select">
          <h2>Generate Reports</h2>
          <div className="relect">
            <label htmlFor="report">Select Report </label>
            <select className="drelect" id="report" onChange={handleReportSelection}>
              <option value="">Daily Transaction Report</option>
              <option value="issuedBooks">Daily book transaction</option>
              <option value="reIssuedBooks">Daily book reissued</option>
              <option value="lostBooks">Lost book</option>
              <option value="dueDatedBooks">Due dated book</option>
              <option value="circulatedBooks">Circulated book</option>
            </select>
          </div>
        </div>

        <div className="dates">
          <div className="datePicker">
            <label htmlFor="startDate">Start Date:</label>
            <input type="date" id="startDate" value={startDate} max={today.toISOString().slice(0, 10)} onChange={handleStartDateChange} />
          </div>
          <div className="datePicker">
            <label htmlFor="endDate">End Date:</label>
            <input type="date" id="endDate" value={endDate} min={startDate} max={today.toISOString().slice(0, 10)} onChange={handleEndDateChange} />
          </div>
        </div>

        <div className=" bt">
          <button
            className="small-button"
            style={{ backgroundColor: 'blue', color: 'white', border: 'blue' }}
            onClick={handleGenerateReport}
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
