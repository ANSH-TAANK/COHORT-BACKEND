const express = require('express');
const app = express();
const noteModel = require('./models/notes.model');
app.use(express.json()); //jab tak me ye nahi likh ta tab tak req.body me data aa hi nhi sakta this is our middleware



/*
-post /notes
- req.body => {title,description}
*/

app.post("/notes", async(req, res) => {
    const {title, description} = req.body;
    const note = await noteModel.create({
        title, description
    })
    res.status(201).json({
        message: "Note created successfully",
        note
    });
})
//note local host se data base jo mumbai server me haii vaha jaaega aur iska acknowledgement milega aur isme kitna time lagaega hamko nhi pata isliya
//we used async and await 



/*
-get /notes
fetch all the notes from the database and send it to the client
*/


app.get("/notes", async(req, res) => {
    const notes = await noteModel.find();
    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    });
})
//find() method jitne me notes honge apne data me unko read karke return kardegi
//find() hamseha array of object me hi data return karegi

 
module.exports = app;


