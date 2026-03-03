/*
    is file ka kaam 
    -server create karna
    -server ko config karna

*/

const express = require("express");
const app = express();
app.use(express.json()); //ye middleware hai 
const notes = [
    {
        title : "test title 1",
        description : "test description 1"
    }
]

//express hamara by default res.body padh hi nhi sakta isliya ham middleware use karte hai
app.post("/notes", (req, res) => {
    console.log(req.body);
    notes.push(req.body);
    res.send("note created successfully");
})


module.exports = app; 
