//dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const uuid = require("uuid/v4");
const fs = require("fs");

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

//displays notes.html page
app.get("/api/notes", function (req,res){
    fs.readFile(__dirname + "/db/db.json", "utf8", function(err, notes){
        if(err) {
            return res.status(500).end();
        }
        const db = JSON.parse(notes);
        res.json(db);
    })
});

//returns index.html page
app.get("*", function(req, res){
    res.redirect("/")
});

//creates new notes - takes in JSON format
app.post("/api/notes", function(req, res) {
    const note = { ...req.body, id: uuid() };
    console.log(note);
    //SHOULD I BE PUSHING TO DB.JSON FILE??
    notes.push(note)
    res.json(note);
});

//deletes notes
app.delete("/api/notes/id", function(req, res) {
    //HOW TO TARGET NOTE TO DELETE?
    //DON'T THINK I'M CORRECTLY TARGETING WHERE I'M POSTING NOTES SO CAN'T FIND THEM TO DELETE
    notes.splice(id);
    res.json(note);
});

//starts server listening
app.listen(PORT, () => console.log(`App listening on POST: ${PORT}`));

//BODY PARSER?
//