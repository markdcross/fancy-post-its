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



// API POST Route
app.post('/api/notes', function (req, res) {
    // Capture user input
    let newNote = {
        title: req.body.title,
        text: req.body.text,
    };

    // Convert current list of notes from JSON to an array, add the new note, convert back to JSON, and update db.json
    let noteList = JSON.parse(fs.readFileSync('db/db.json'));
    noteList.push(newNote);
    let newNoteList = JSON.stringify(noteList);
    fs.writeFileSync('db/db.json', newNoteList);
    // Send response
    res.json(newNote);
});

// API DELETE Route
//TODO: DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete.
//TODO: This means you'll need to find a way to give each note a unique `id` when it's saved.
//TODO: In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
// read all notes, parse to array, iterate through the array and assign the id as [i]?

//* ===================================================
//* Starts the server on PORT and begins listening
//* ===================================================
app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
});