const mongoose = require('mongoose');

const AboutusSchema = new mongoose.Schema({

    aboutus: { type: String, required: true },
    marketPlace: { type: String , required:true},
    problem: { type: String, required:true},
    solution: {type: String , required: true},
    image:{type: String , required:true},
    
});

module.exports = mongoose.model('Aboutus', AboutusSchema);