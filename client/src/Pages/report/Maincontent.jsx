import React, { useState, useEffect } from 'react';
import './Maincontent.css';
import { useNavigate } from 'react-router-dom';
import DateComponent from '../../components/DateComponent';

const MainContent = ({ token, name, sid }) => {
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

  const handleGenerateReport = async () => {
    if (selectedReport && startDate && endDate) {
      const queryParams = new URLSearchParams({
        reportName: selectedReport,
        startDate,
        endDate
      }).toString();
      console.log(queryParams + sid);
      try {
        const response = await fetch('http://localhost:5001/report?' + queryParams, {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sid: sid }),
        });

        if (response.ok) {
          const res = await response.json();
          setReportData(res.data);
          await console.log(res);
        } else {
          throw new Error('Error: ' + response.status);
        }
      } catch (error) {
        console.log(error);
      }
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
        <h2>Hello, {name}</h2>
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
              <option value="">Select Report Type</option>
              <option value="issuedBooks">Daily book transaction</option>
              <option value="reIssuedBooks">Daily book reissued</option>
              <option value="lostBooks">Lost book</option>
              <option value="dueDatedBooks">Due dated book</option>
              <option value="circulatedBooks">Circulated book</option>
            </select>
          </div>
        </div>

        <div className="relect">
          <div className="datePicker">
            <label htmlFor="startDate">Start Date</label>
            <input type="date" className="drelect" id="startDate" value={startDate} max={today.toISOString().slice(0, 10)} onChange={handleStartDateChange} />
          </div>
          <div className="relect">
            <label htmlFor="endDate">End Date</label>
            <input type="date" id="endDate" className="drelect" value={endDate} min={startDate} max={today.toISOString().slice(0, 10)} onChange={handleEndDateChange} />
          </div>
        </div>

        <div className="bt">
          <button
            className="small-button"
            style={{ backgroundColor: 'blue', color: 'white', border: 'blue' }}
            onClick={handleGenerateReport}
          >
            Generate Report
          </button>
        </div>

        {reportData.length > 0 && (
          <table>
            <thead>
              <tr>
                {Object.keys(reportData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reportData.map((data, index) => (
                <tr key={index}>
                  {Object.values(data).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MainContent;
