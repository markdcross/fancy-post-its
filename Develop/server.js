//* ===================================================
//* Dependencies
//* ===================================================
const express = require('express');
const fs = require('fs');
const path = require('path');

// Sets up the Express App
const app = express();
const PORT = 4880;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to ensure proper directory pathing for static elements
app.use(express.static(__dirname + '/public'));

//* ===================================================
//* Routes
//* ===================================================
// Route to notes.html
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// Displays all saved notes
app.get('/api/notes', function (req, res) {
    fs.readFile('db/db.json', (err, data) => {
        if (err) {
            throw err;
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Route to index.html, using '*' as catchall for undefined routes to send to homepage
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//* API POST Routes
//TODO: POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post('/api/notes', function (req, res) {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
    };
    let noteList = JSON.parse(fs.readFileSync('db/db.json'));
    noteList.push(newNote);
    let newNoteList = JSON.stringify(noteList);
    fs.writeFileSync('db/db.json', newNoteList);
    res.send(`Title: ${newNote.title}
    Note: ${newNote.text}`);
});

//* API DELETE Routes
//TODO: DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete.
//TODO: This means you'll need to find a way to give each note a unique `id` when it's saved.
//TODO: In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

//* ===================================================
//* Starts the server on PORT and begins listening
//* ===================================================
app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
});
