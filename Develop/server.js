//* ===================================================
//* Dependencies
//* ===================================================
const express = require('express');
const fs = require('fs');
const path = require('path');
// Remove below once GET api/notes updated with FS mod
const notesData = require('./db/db.json');

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
//* HTML Routes
// Route to index.html
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Route to notes.html
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

//* API GET Routes
// Displays all notes
//TODO: Update to use FS module to ensure dynamic response
app.get('/api/notes', function (req, res) {
    return res.json(notesData);
});

//* API POST Routes
//TODO: POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

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
