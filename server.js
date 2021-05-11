const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();


const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

    // => HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
  
    app.get('/index', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
  
    app.get('/notes', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'notes.html'));
    });
  
    // If no matching route is found default to home
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });


// listening on port 8080
app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
  });
  