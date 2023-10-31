const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        requered: true
    },
    email:{
        type: String,
        requered: true 
    },
    visibleEmail:{
        type: String,
        requered: true
    },
    password:{
        type: String,
        requered: true
    }

    
});

module.exports = mongoose.model('User', userSchema);