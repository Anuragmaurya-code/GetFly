
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());


// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'your_database_name',
});

// Handle requests
app.get('/api/data', (req, res) => {
  // Execute a query to fetch data from MySQL
  pool.query('SELECT * FROM your_table', (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error executing query');
    } else {
      res.json(results);
    }
  });
});
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Handle the form fields (username and password) as needed
  // Example: validate credentials, authenticate user, etc.
  console.log('Received form fields:', { username, password });
  if(username ==='admin' && password ==='admin'){
    res.status(200).json({ message: 'Login successful' });
  } else {
    // If invalid, send a "Not OK" response with status code 401
    res.status(401).json({ message: 'Invalid credentials' });
  }

  // Send a response back to the client
});

app.post('/addbooks', (req, res) => {
  const { catCat,acqCat ,holHol} = req.body;
  // Handle the form fields (username and password) as needed
  // Example: validate credentials, authenticate user, etc.
  console.log('Received form fields:', {catCat,acqCat ,holHol });
  if(catCat && acqCat && holHol){
    res.status(200).json({ message: 'successful added' });
  } else {
    // If invalid, send a "Not OK" response with status code 401
    res.status(401).json({ message: 'Something went wrong' });
  }

  // Send a response back to the client
});

app.post('/issuebooks', (req, res) => {
  const { bookid,stuname ,issdate} = req.body;
  // Handle the form fields (username and password) as needed
  // Example: validate credentials, authenticate user, etc.
  console.log('Received form fields:', {bookid,stuname ,issdate });
  if(bookid && stuname && issdate){
    res.status(200).json({ message: 'successful added' });
  } else {
    // If invalid, send a "Not OK" response with status code 401
    res.status(401).json({ message: 'Something went wrong' });
  }

  // Send a response back to the client
});
const info=[
  {bookid: 'wwe',name: 'johncena',from:'21 May 2004',to:'21 May 2023'},
  {bookid: 'youtube',name: 'ksi',from:'21 May 2013',to:'21 May 2023'},
  {bookid: 'tv',name: 'ksi',from:'21 May 2013',to:'21 May 2023'}
];
app.get('/reissuebooks',(req, res) => { 
  res.status(200).json({info:info});
})
app.post('/reissuebooks',(req, res) => {
  console.log(req.body);
  res.status(200).json({info:info});
})

app.post('/dashboard', (req, res) => {
  // Send a response back to the client
  res.status(200).json({ tb:1000,bic:20,bi:20,bri:49 });
});



app.post('/report', (req, res) => {
  const { reportType } = req.body;
  // Dummy data for different report types
  let reportData = [];
  
  if (reportType === 'daily-transaction') {
    reportData = [
      { bookId: 1, name: 'Book 1', fromDate: '2023-06-01', toDate: '2023-06-02' },
      { bookId: 2, name: 'Book 2', fromDate: '2023-06-01', toDate: '2023-06-02' },
      { bookId: 3, name: 'Book 3', fromDate: '2023-06-01', toDate: '2023-06-02' },
    ];
  } else if (reportType === 'daily-reissued') {
    reportData = [
      { bookId: 4, name: 'Book 4', fromDate: '2023-06-01', toDate: '2023-06-02' },
      { bookId: 5, name: 'Book 5', fromDate: '2023-06-01', toDate: '2023-06-02' },
    ];
  } else if (reportType === 'lost-book') {
    reportData = [
      { bookId: 6, name: 'Book 6', fromDate: '2023-06-01', toDate: '2023-06-02' },
    ];
  } else if (reportType === 'due-dated') {
    reportData = [
      { bookId: 7, name: 'Book 7', fromDate: '2023-06-01', toDate: '2023-06-02' },
      { bookId: 8, name: 'Book 8', fromDate: '2023-06-01', toDate: '2023-06-02' },
      { bookId: 9, name: 'Book 9', fromDate: '2023-06-01', toDate: '2023-06-02' },
    ];
  } else if (reportType === 'circulated-book') {
    reportData = [
      { bookId: 10, name: 'Book 10', fromDate: '2023-06-01', toDate: '2023-06-02' },
      { bookId: 11, name: 'Book 11', fromDate: '2023-06-01', toDate: '2023-06-02' },
    ];
  }

  res.status(200).json(reportData);
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});