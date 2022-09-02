const mongoose = require('mongoose');

const User = mongoose.Schema({
    name:{type:String},
    email:{type:String, unique:true},
    password:{type:String},
    mobile:{type:Number}
});

module.exports = mongoose.model("User", User);