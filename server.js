const express = require('express');
const path = require('path');
const app = express(); 
const bodyParser = require('body-parser');
require('dotenv').config();
var sql = require('mssql');
var test = "bro";
const port = process.env.PORT || 3000;

// Serve static files (e.g., HTML, CSS, JS) from a 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Define route for /sm
app.get('/sm', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Serve the index.html file with condition query parameter for /rg
app.get('/rg', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});



app.post('/submit-data', async (req, res) => {
  const data = req.body;
  console.log("data is here", data)
  // Example: Insert data into the database
  try {
      // Assuming `db` is your database connection and `insertData` is a function to insert data
      try {
        let pool = await sql.connect(dbConfig);
        let query = `INSERT INTO GridGame (UID, Duration, Date, Condition, Scale, EnvOrder, SearchHistory, BonusLevel, StarArray, TesterNotes) 
        VALUES (@uid, @duration, @date, @condition, @scale, @envOrder, @searchHistory, @bonusLevel, @starArray, @testerNotes)`;
        data.date = new Date();
        
        console.log(data.uid, "data exists")
        await pool.request()
      .input('uid', sql.Int, data.uid)
      .input('duration', sql.Float, data.duration)
      .input('date', sql.DateTime, new Date(data.date))
      .input('condition', sql.Int, data.condition)
      .input('scale', sql.NVarChar(sql.MAX), JSON.stringify(data.scale))
      .input('envOrder', sql.NVarChar(sql.MAX), JSON.stringify(data.envOrder))
      .input('searchHistory', sql.NVarChar(sql.MAX), JSON.stringify(data.searchHistory))
      .input('bonusLevel', sql.NVarChar(sql.MAX), JSON.stringify(data.bonusLevel))
      .input('starArray', sql.NVarChar(sql.MAX), JSON.stringify(data.starArray))
      .input('testerNotes', sql.NVarChar(sql.MAX), JSON.stringify(data.testerNotes))
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
