//* ===================================================
//* Dependencies
//* ===================================================
const express = require('express');

//* ===================================================
//* Express
//* ===================================================
// Sets up the Express App
const app = express();
const PORT = 4880;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to ensure proper directory pathing for static elements
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/db'));

//* ==============================================================================
//* ROUTER
//* ==============================================================================
require('./public/assets/routes/apiRoutes')(app);
require('./public/assets/routes/htmlRoutes')(app);

//* ===================================================
//* Starts the server on PORT and begins listening
//* ===================================================
app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
});
