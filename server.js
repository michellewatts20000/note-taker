const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const { v4: uuidv4 } = require('uuid');


const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const notesDB = path.join(__dirname, 'db', 'db.json');

    // => HTML GET Requests
  
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


    app.get("/api/notes", (req, res) => {
      fs.readFile(path.join(__dirname, '..db', 'db.json'), "utf8", (err, data) => {
          if (err) throw err;
          res.json(JSON.parse(data));
      });
  });





// listening on port 8080
app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
  });
  