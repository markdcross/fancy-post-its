//* Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const notesData = require('./db/db.json');

//* Sets up the Express App
const app = express();
const PORT = 4880;

//* Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

//* API Routes
// Displays all notes
app.get('/api/notes', function (req, res) {
    return res.json(notesData);
});

//* Starts the server to begin listening
app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
});
