//* ===================================================
//* Dependencies
//* ===================================================
const fs = require('fs');
const uuid = require('uuid');

//* ===================================================
//* API Routes
//* ===================================================
module.exports = function (app) {
    // GET all saved notes
    app.get('/api/notes', function (req, res) {
        fs.readFile('db/db.json', (err, data) => {
            if (err) {
                throw err;
            } else {
                res.json(JSON.parse(data));
            }
        });
    });

    // POST new note
    app.post('/api/notes', function (req, res) {
        // Capture user input
        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuid.v4(),
        };
        // Access current list of notes
        fs.readFile('./db/db.json', (err, data) => {
            // Convert current list of notes from JSON to an array
            let parsedNotes = JSON.parse(data);
            // add the new note
            parsedNotes.push(newNote);
            // Convert back to JSON and update db.json
            fs.writeFile('./db/db.json', JSON.stringify(parsedNotes), function (
                err,
                res
            ) {
                if (err) {
                    throw err;
                }
            });
            // Send response to the client
            res.send(newNote);
        });
    });

    // DELETE note
    app.delete('/api/notes/:id', function (req, res) {
        // Access current list of notes

        fs.readFile('./db/db.json', (err, data) => {
            // Convert current list of notes from JSON to an array

            let parsedNotes = JSON.parse(data);

            // Use .filter to create a new array excluding the selected note
            let newNotesArr = parsedNotes.filter(
                (note) => note.id !== req.params.id
            );
            // Convert the new array back to JSON and update db.json

            fs.writeFile('./db/db.json', JSON.stringify(newNotesArr), function (
                err,
                res
            ) {
                if (err) {
                    throw err;
                }
            });
        });
        res.send('Note deleted');
    });
};
