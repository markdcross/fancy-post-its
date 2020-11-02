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

    // POST route for new note
    app.post('/api/notes', function (req, res) {
        // Capture user input
        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuid.v4(),
        };

        // Convert current list of notes from JSON to an array, add the new note, convert back to JSON, and update db.json
        fs.readFile('./db/db.json', (err, data) => {
            let parsedNotes = JSON.parse(data);
            parsedNotes.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(parsedNotes), function (
                err,
                res
            ) {
                if (err) {
                    throw err;
                }
            });
            res.send(newNote);
        });
    });

    // API DELETE Route
    //TODO: DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete.
    //TODO: This means you'll need to find a way to give each note a unique `id` when it's saved.
    //TODO: In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
    // read all notes, parse to array, iterate through the array and assign the id as [i]?
};
