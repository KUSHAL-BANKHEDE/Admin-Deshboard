const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({

    name: { type: String, unique: true, required: true },
    image:{type: String , required:true},
    info: { type: String , required:true},
    
});

module.exports = mongoose.model('services', ServicesSchema);