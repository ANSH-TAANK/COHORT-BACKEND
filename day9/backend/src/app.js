/**
 * server ko create
 * 
 */
const express = require('express');
const app = express();
app.use(express.json());//ye line isliye likhi hai taki hum req.body se data le sake
const noteModel = require('./models/note.model');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.static("./public"))//jo bhi public folder me cheeje hai unko publically available bana deti hai.


/**
 *  - POST  /api/notes  => create a note and save in database
 *  - req.body will contains  {title: string, description: string}
 */

app.post('/api/notes', async (req, res) => {
    const {title, description} = req.body;//It takes the title and description properties from req.body and stores them into variables with the same names.
    //so instead of writing const title = req.body.title;
    //const description = req.body.description;
    const note = await noteModel.create({
        title, description
    })
    res.status(201).json({
        message: 'Note created successfully',
        note
    });
})

/**
 * - GET /api/notes => get all notes from database and send them in response
 */

app.get('/api/notes', async (req, res) => {
    const notes = await noteModel.find(); //ye array of object return karega jisme sare notes honge find method
    res.status(200).json({
        message: 'Notes fetched successfully',
        notes
    });
});

/**
 * -delete /api/notes/:id => delete a note from database by id
 */

app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id;    
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        message: 'Note deleted successfully'
    });
});

/**
 * -patch /api/notes/:id => update a description of a note from database by id
 * -req.body will contains {description: string}
 */

app.patch('/api/notes/:id', async (req, res) => {
     const id = req.params.id;
     const {description} = req.body;
     await noteModel.findByIdAndUpdate(id, {description});
     res.status(200).json({
        message: 'Note updated successfully' 
     });
})

app.use('*name', (req, res) => {
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
});

module.exports = app;