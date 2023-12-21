const express = require('express');
const path = require('path');
const app = express(); 
require('dotenv').config();
var sql = require('mssql');
var test = "bro";
const port = process.env.PORT || 3000;

// Serve static files (e.g., HTML, CSS, JS) from a 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const dbConfig = {
  user: 'gridgame',
  password: 'PG9sTJ6G7tCte8',
  server: 'clic.database.windows.net',
  database: 'clic',
  port: 1433,
  options: {
      encrypt: true, // Necessary for Azure SQL
      trustServerCertificate: false // Change to true if on a local environment
  }
}


  // try {
  //     let pool = sql.connect(dbConfig);
  //      pool.request().query('CREATE TABLE IF NOT EXISTS data (date DATETIME, uid INT, data NVARCHAR(MAX))');
  //     console.log('Created database table OK');
  //     isrcUtils.GetStats(); // Adjust or remove according to your needs
  // } catch (error) {
  //     console.log('Error setting up the database:', error);
  // }

  

// Serve the index.html file when a GET request is made to the root URL
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post('/submit-data', async (req, res) => {
  const data = req.body;
  // Example: Insert data into the database
  try {
      // Assuming `db` is your database connection and `insertData` is a function to insert data
      try {
        let pool = await sql.connect(dbConfig);
        let query = `INSERT INTO data (date, uid, data) VALUES (@date, @uid, @data)`;
        console.log(data)
        await pool.request()
            .input('date', sql.DateTime, new Date())
            .input('uid', sql.Int, data.uid)
            .input('data', sql.NVarChar(sql.MAX), JSON.stringify(data))
            .query(query);
    
        console.log('Inserted final data in DB');
        var debugOut = document.getElementById('debug-out');
        if (debugOut) debugOut.innerHTML = debugOut.innerHTML + '<br><span style="color:red">DATA SAVED IN THE DATABASE</span>';
    } catch (error) {
        console.log('Error saving data to DB:', error);
    }
      res.send({ status: 'Data successfully saved' });
  } catch (error) {
      console.error('Database error:', error);
      res.status(500).send({ status: 'Error saving data' });
  }
});
