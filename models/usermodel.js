const { Timestamp } = require('bson');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, "Username is Required"],
    },
    email : {
        type: String,
        required : [true, "Email is Required"],
    },
    password : {
        type:String,
        required : [true, "Password is Mandatory"],
    },
},{
    timestamps : true,
});

module.exports = mongoose.model('Users',userSchema);