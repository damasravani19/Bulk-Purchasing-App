const mongoose = require('mongoose');

let User = new mongoose.Schema({
    username: {
        type: String,
        unique : true
    },
    email: {
        type: String
    },
    password:{
        type: String
    },
    user_type:{
        type: String
    },
    rating : {
        type: Number,
        default :0
    },
    NoOfratings: {
        type : Number,
        default :0
    }
});

module.exports = mongoose.model('User', User);