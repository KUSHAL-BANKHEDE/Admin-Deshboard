const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({

    name: { type: String, unique: true, required: true },
    info: { type: String , required:true},
    image:{type: String , required:true},
    
});

module.exports = mongoose.model('Services', ServicesSchema);