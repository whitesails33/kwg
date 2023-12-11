const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (e.g., HTML, CSS, JS) from a 'public' directory
app.use(express.static('public'));

// Serve the index.html file when a GET request is made to the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
