const express = require('express');
const path = require('path');
const fs = require('fs');

// Tells node that we are creating an "express" server
const app = express();
const {
  v4: uuidv4
} = require('uuid');

// Sets an initial port.
const PORT = process.env.PORT || 8080;

// serves our static html, js and css files
app.use(express.static(path.join(__dirname, 'public')));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// shortcut to db.json file
const notesDB = path.join(__dirname, 'db', 'db.json');

// GETs the data in the db file
app.get("/api/notes", (req, res) => {
  fs.readFile(notesDB, (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// POST request, reads existing notes and writes current note to db.JSON file when person clicks save icon
app.post("/api/notes", (req, res) => {
  fs.readFile(notesDB, 'utf8', function (err, storedNotes) {
    if (err) throw err;
    storedNotes = JSON.parse(storedNotes)
    var id = uuidv4();
    var newNote = {
      title: req.body.title.trim(),
      text: req.body.text.trim(),
      id: id
    }
    var noteCombo = storedNotes.concat(newNote)

    fs.writeFile(notesDB, JSON.stringify(noteCombo, null, 2), function (err, data) {
      if (err) throw err;
      res.json(data);
    })
  })
})

// deletes specific note (using uuid) from array when a person clicks the trash can icon
app.delete("/api/notes/:id", (req, res) => {
  const idArray = req.params.id;
  fs.readFile(notesDB, 'utf8', function (err, storedNotes) {
    if (err) throw err;
    storedNotes = JSON.parse(storedNotes)
    const fliteredArray = storedNotes.filter(i => i.id !== idArray)
    fs.writeFile(notesDB, JSON.stringify(fliteredArray, null, 2), function (err, data) {
      if (err) throw err;
      res.json(data);
    })
  });
});

// => HTML GET Requests
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// If no matching route is found default to home
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), function (err) {
    if (err) throw err;
  });
});


// listening on port 8080
app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});