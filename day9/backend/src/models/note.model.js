const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    description : {
        type: String,
    }
})

//is model hi help se hi sare ke sare crud operations ham perform karenge
const noteModel = mongoose.model('notes', noteSchema);

module.exports = noteModel;