const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description : {
    type: String
  }
});

//schema hota hai ki kis format me data store karna hai database me

const noteModel =   mongoose.model("notes", noteSchema); 

//"notes" is the name of the collection in the database where the data will be stored of the notes

/*
Model = A tool that uses a schema to talk to the database

or

Schema = Structure
Model = Working with data
*/


module.exports = noteModel;