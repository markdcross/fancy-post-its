//* Dependencies
const express = require('express');
const fs = require('fs)');
const path = require('path');
const database = require('./db/db.json');

//* Sets up the Express App
const app = express();
const PORT = 4880;

//* Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//* ===================================================
//* Routes
//* ===================================================

//* Starts the server to begin listening
app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
});
