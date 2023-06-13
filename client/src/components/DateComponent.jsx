import React, { useState, useEffect } from 'react';

const DateComponent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

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

  return (
    <div>
      <p>{formatDate()[0]}</p>
      <p>{formatDate()[1]}</p>
      <p>{formatDate()[2]}</p>
    </div>
  );
};

export default DateComponent;
