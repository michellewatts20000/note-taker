const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
// const js = require('./assets/js');


const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let testArray = [
  {
  "title": "Test Title",
  "text": "Test text"
  },
  {
    "title": "Test Title",
    "text": "Test text"
    }
]

const notesDB = path.join(__dirname, 'db', 'db.json');

    // => HTML GET Requests
    // Below code handles when users "visit" a page.
  
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
      fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
          if (err) throw err;
          res.json(JSON.parse(data));
      });
  });


  app.post("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        const db = JSON.parse(data);
        const newDB = [];

        db.push(req.body);

        for (let i = 0; i < db.length; i++)
        {
            const newNote = {
                title: db[i].title,
                text: db[i].text,
                id: i
            };

            newDB.push(newNote);
        }

        fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(newDB, null, 2), (err) => {
            if (err) throw err;
            res.json(req.body);
        });
    });
});



    // app.get('/api/notes', (req, res) => res.json(testArray));

// listening on port 8080
app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
  });
  