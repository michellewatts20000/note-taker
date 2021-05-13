const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const {
  v4: uuidv4
} = require('uuid');


const PORT = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// shortcut to db.json file
const notesDB = path.join(__dirname, 'db', 'db.json');

app.post("/api/notes", (req, res) => {
  fs.readFile(notesDB, 'utf8', function (err, storedNotes) {
    if (err) {
      return console.log(error)
    }
  
    storedNotes = JSON.parse(storedNotes)
    var id = uuidv4();
    var newNote = { title: req.body.title, text: req.body.text, id: id }
    var noteCombo = storedNotes.concat(newNote)

    fs.writeFile(notesDB, JSON.stringify(noteCombo), function (error, data) {
      if (error) {
        return error
      }
      console.log(noteCombo)
      res.json(noteCombo);
    })
  })
})

// => HTML GET Requests
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// If no matching route is found default to home
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// get the data in the db file
app.get("/api/notes", (req, res) => {
  fs.readFile(notesDB, (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});



// listening on port 8080
app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});