const express = require('express');
const path = require('path');
const app = express(); 
const bodyParser = require('body-parser');
require('dotenv').config();
var sql = require('mssql');
// var test = "bro";
const port = process.env.PORT || 3000;

// console.log(process.env.password ,process.env.server )

// Serve static files (e.g., HTML, CSS, JS) from a 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbConfig = {
  user: 'gridgame',
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: 'clic',
  port: 1433,
  options: {
      encrypt: true, // Necessary for Azure SQL
      trustServerCertificate: false // Change to true if on a local environment
  }
}

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
      console.log("dbconfig", dbConfig)
      // Assuming `db` is your database connection and `insertData` is a function to insert data
      try {
        let pool = await sql.connect(dbConfig);
        let query = `INSERT INTO GridGame (UID, Duration, Date, Condition, Scale, EnvOrder, tscollect, xcollect, ycollect, zcollect, zcollectScaled , BonusLevel, StarArray, TesterNotes) 
        VALUES (@uid, @duration, @date, @condition, @scale, @envOrder, @tscollect, @xcollect, @ycollect, @zcollect, @zcollectScaled, @bonusLevel, @starArray, @testerNotes)`;
        data.date = new Date();
        
        console.log(data.uid, "data exists")
        await pool.request()
      .input('uid', sql.Int, data.uid)
      .input('duration', sql.Float, data.duration)
      .input('date', sql.DateTime, new Date(data.date))
      .input('condition', sql.Int, data.condition)
      .input('scale', sql.NVarChar(sql.MAX), JSON.stringify(data.scale))
      .input('envOrder', sql.NVarChar(sql.MAX), JSON.stringify(data.envOrder))
      // .input('searchHistory', sql.NVarChar(sql.MAX), JSON.stringify(data.searchHistory))
      .input('tscollect', sql.NVarChar(sql.MAX), JSON.stringify(data.tscollect))
      .input('xcollect', sql.NVarChar(sql.MAX), JSON.stringify(data.xcollect))
      .input('ycollect', sql.NVarChar(sql.MAX), JSON.stringify(data.ycollect))
      .input('zcollect', sql.NVarChar(sql.MAX), JSON.stringify(data.zcollect))
      .input('zcollectScaled', sql.NVarChar(sql.MAX), JSON.stringify(data.zcollectScaled))
      .input('bonusLevel', sql.NVarChar(sql.MAX), JSON.stringify(data.bonusLevel))
      .input('starArray', sql.NVarChar(sql.MAX), JSON.stringify(data.starArray))
      .input('testerNotes', sql.NVarChar(sql.MAX), JSON.stringify(data.testerNotes))
      .query(query);
    
        // console.log('Inserted final data in DB');
        var debugOut = document.getElementById('debug-out');
        if (debugOut) debugOut.innerHTML = debugOut.innerHTML + '<br><span style="color:red">DATA SAVED IN THE DATABASE</span>';
    } catch (error) {
      console.log("dbconfig", dbConfig)
        console.log('Error saving data to DB:', error);
    }
  } catch (error) {
      // console.error('Database error:', error);
      console.log("dbconfig", dbConfig)
      res.status(500).send({ status: 'Error saving data' });
  }
  res.send({ status: 'Data successfully saved' });

});
