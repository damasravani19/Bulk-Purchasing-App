const mongoose = require('mongoose');

let Order = new mongoose.Schema({
    NameofVendor: {
        type: String
    },
    NameofProduct: {
        type: String
    },
    NameofCustomer:{
        type : String
    },
    QuantityofOrder:{
        type: Number
    },
    StatusofOrder :
    {
        type : String,
        default : "Waiting"
    }
});

module.exports = mongoose.model('Order', Order);