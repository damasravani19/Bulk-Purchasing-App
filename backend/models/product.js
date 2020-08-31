const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    NameofVendor: {
        type: String
    },
    NameofProduct: {
        type: String
    },
    Quantity:{
        type: Number
    },
    QuantityRemaining:
    {
        type : Number
    },
    Price:{
        type: Number
    },
    QuantitySold:{
        type : Number,
        default : 0
    },
    Customers:{
        type: Array
    },
    Status :
    {
        type : String,
        default : "Tobesold"
    },
    ReviewsoftheProduct :
    {
        type : Array
    }
});

module.exports = mongoose.model('Product', Product);