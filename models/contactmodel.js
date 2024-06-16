const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: {
        type : mongoose.Schema.Types.ObjectId,
        required : [true," should give USer id"],
        ref : "Users",
    },
    name: {
        type: String,
        required : [true,"please fill the name"],
    },
    email: {
        type: String,
        required : [true,"please fill the email"],
    },
    phone: {
        type: Number,
        required : [true,"please fill the phone"],
    },
},
    {
        timestamps:true,
    }
);

module.exports = mongoose.model('Contacts', contactSchema);