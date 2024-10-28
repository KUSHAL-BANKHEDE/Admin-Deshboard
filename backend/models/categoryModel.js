const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({

    name: { type: String, unique: true, required: true },
    info: { type: String , required:true},
    image:{type: String , required:true},
    
});

module.exports = mongoose.model('Category', CategorySchema);