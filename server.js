//dependencies
const fs = require("fs");
const express = require("express");
const uuid = require("uuid/v4");
const dbPath = __dirname + "/db/db.json";
const app = express();
const PORT = process.env.PORT || 8080;


//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//data
//SHOULD I BE CREATING A LINK TO DB.JSON LIKE THIS?
// const notes = db.json;

const notes = [
    {}
];

//Routes
//------------------------------------------------------

// GET - /api/notes
// Read from db.json
// if err - send back status code 500
// parse file into JS object || Array
// Send back db contents

//displays notes.html page
app.get("/api/notes", function (req, res) {
    fs.readFile(dbPath, "utf8", function (err, notes) {
        if (err) {
            return res.status(500).end();
        }
        const db = JSON.parse(notes);
        res.json(db);
    })
});

//---------------------------------------------

// POST - /api/notes
// Read from db.json
// if err - send back status code 500
// parse JSON
// using req.body
// create a new note with unique id
// append to parsed JSON
// Overwrite db.json with new array
// send newly created note

//creates new notes - takes in JSON format
app.post("/api/notes", function (req, res) {
    fs.readFile(dbPath, "utf8", function (err, notes) {
        if (err) {
            return res.status(500).end();
        }
        const db = JSON.parse(notes);
        const note = { ...req.body, id: uuid() };
        console.log(note);
        db.push(note);
        fs.writeFile(dbPath, JSON.stringify(db, null, 2), function (err) {
            if (err) {
                return res.status(500).end();
            }
            res.json(db);
        })
    })
});

// DELETE - /api/notes/:id
// Read from db.json
// if err - respond with status code 500
// parse JSON
// store id coming from params
// filter out note using ID
// Overwrite db.json
// send message back to client

//deletes notes
app.delete("/api/notes/:id", function (req, res) {
    fs.readFile(dbPath, "utf8", function (res, req) {
        if (err) {
            return res.status(500).end();
        }
        const db = parse.JSON(notes);
        console.log(req.params.id);
        // .filter()
        notes.filter(function(id){
            if(id ===!req.params.id) {
                db.push(notes);
            }
        })
    });
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), function (err) {
        if (err) {
            return res.status(500).end();
        }
        res.json(db);
    });
});

//returns index.html page
app.get("*", function (req, res) {
    res.redirect("/")
});

//starts server listening
app.listen(PORT, () => console.log(`App listening on POST: ${PORT}`));





