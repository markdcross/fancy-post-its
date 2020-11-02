//* ===================================================
//* Dependencies
//* ===================================================
const path = require('path');

//* ===================================================
//* HTML Routes
//* ===================================================
module.exports = function (app) {
    // Route to notes.html
    app.get('/notes', function (req, res) {
        res.sendFile(path.join(__dirname, './../../notes.html'));
    });

    // Route to index.html, using '*' as catchall for undefined routes to send to homepage
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, './../../index.html'));
    });
};
