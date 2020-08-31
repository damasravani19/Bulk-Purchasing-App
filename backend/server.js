const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Product = require('./models/product');
let Order = require('./models/order')

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    console.log(user)
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});


// login with ID 
userRoutes.route('/login').post(function(req, res) {
    User.find({username : req.body.username , password : req.body.password}, function(err, user) {
        res.json(user);
    });

});


// create a product
userRoutes.route('/createproduct').post(function(req,res){
    console.log(req.body)
    let product = new Product(req.body);
    console.log(product)
    product.save()
            .then(product => {
                res.status(200).json({'Product': 'Product added successfully'});
            })
            .catch(err => {
                res.status(400).send('Error');
            });

});

 // Getting all the products of vendor
userRoutes.route('/allproducts').post(function(req, res) {
    Product.find({NameofVendor :req.body.NameofVendor , Status : req.body.Status } ,function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log(users)
            res.json(users);
        }
    });
});

//getiing the list of all the dispatched products
userRoutes.route('/dispatchedproducts').post(function(req, res) {
    Product.find({NameofVendor :req.body.NameofVendor , Status : req.body.Status } ,function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log(users)
            res.json(users);
        }
    });
});
 // Getting all the products of vendor that are to be dispatched
 userRoutes.route('/tobedispatchedproducts').post(function(req, res) {
    Product.find({NameofVendor :req.body.NameofVendor , Status : req.body.Status } ,function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log(users)
            res.json(users);
        }
    });
});

// change the status from tobedispatched to dispatched onclicking Dispatch button
userRoutes.route('/changestatus').post(function(req, res) {
    Product.update(
            {NameofVendor : req.body.NameofVendor , NameofProduct : req.body.NameofProduct} ,
            {  
                $set:
                {Status :  "Dispatched" }
            }
             
        )
        .then(product => {
            res.status(200).json({'Product': 'Product updated added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});
//change the status from tobesold to tobedispatched
userRoutes.route('/changestatustotobedispatched').post(function(req, res) {
    Product.updateMany(
            {QuantityRemaining: req.body.QuantityRemaining , Status : req.body.currentstatus } ,
            {  
                $set:
                {Status :  "Tobedispatched" }
            }  
        )
        .then(product => {
            res.status(200).json({'status': 'Status updated successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});
//placing the order
userRoutes.route('/placeorder').post(function(req, res) {

    Product.updateOne(
            {NameofVendor :req.body.NameofVendor , NameofProduct : req.body.NameofProduct },
            {
                 $set:                
                { QuantityRemaining : req.body.QuantityRemaining }
            
            },
            { $addToSet: { Customers: req.body.NameofCustomer } }
         )
         .then(product => {
            res.status(200).json({'Order': 'Order placed successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});
    
            

// Getting all the searchproducts
userRoutes.route('/searchproducts').post(function(req, res) {
    const s = req.body.Sortby;
    Product.find({NameofProduct :req.body.NameofProduct , Status : "Tobesold" } ,function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log(users)
            res.json(users);
        }
    }).sort({ s: 1});
});


// create an order place it into the order collection
userRoutes.route('/addorder').post(function(req,res){
    console.log(req.body)
    let order = new Order(req.body);
    console.log(order)
    order.save()
            .then(product => {
                res.status(200).json({'Order': 'Order added successfully'});
            })
            .catch(err => {
                res.status(400).send('Error');
            });

});

// Getting all the orders of customer
userRoutes.route('/viewplacedorders').post(function(req, res) {
    Order.find({NameofCustomer :req.body.NameofCustomer } ,function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log(users)
            res.json(users);
        }
    });
});

//change the status from order from waiting to placed
userRoutes.route('/changeorderstatustoplaced').post(function(req, res) {
    Order.updateMany(
            { NameofVendor: req.body.NameofVendor, NameofProduct:req.body.NameofProduct , StatusofOrder:req.body.StatusofOrder } ,
            {  
                $set:
                {StatusofOrder :  "Placed" }
            }  
        )
        .then(product => {
            res.status(200).json({'Order': 'Order status updated successfully to placed'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});


// change the status order from placed to dispatched onclicking Dispatch button
userRoutes.route('/changestatusofordertodispatched').post(function(req, res) {
    Order.updateMany(
            {NameofVendor : req.body.NameofVendor , NameofProduct : req.body.NameofProduct} ,
            {  
                $set:
                { StatusofOrder :  "Dispatched" }
            }
             
        )
        .then(product => {
            res.status(200).json({'Order': 'Order status updated successfully to dispatched'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

//rating the vendor
userRoutes.route('/ratevendor').post(function(req, res) {
    User.updateOne(
            { username :req.body.NameofVendor  },
            {
                $inc: 
                { 
                    rating: req.body.givenrating, 
                    NoOfratings: 1 
                }
            
            },
         )
         .then(product => {
            res.status(200).json({'Rating': 'Rating done successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// getting th details of the vendor
userRoutes.route('/getvendorrating').post(function(req, res){
    User.find({ username :req.body.NameofVendor } ,function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// change status of product to cancelled in products collection
userRoutes.route('/changestatustocancelled').post(function(req, res) {
    Product.update(
            {NameofVendor : req.body.NameofVendor , NameofProduct : req.body.NameofProduct} ,
            {  
                $set:
                {Status :  "Cancelled" }
            }
             
        )
        .then(product => {
            res.status(200).json({'Product': 'Product status updated to cancelled successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// change the status of the order to cancelled in order collection
userRoutes.route('/changestatusofordertocancelled').post(function(req, res) {
    Order.updateMany(
            {NameofVendor : req.body.NameofVendor , NameofProduct : req.body.NameofProduct} ,
            {  
                $set:
                { StatusofOrder :  "Cancelled" }
            }
             
        )
        .then(product => {
            res.status(200).json({'Order': 'Order status updated successfully to cancelled'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// get the details for no of order remaining to get the order placed
userRoutes.route('/getremainingorderdetails').post(function(req, res) {
    Product.find({NameofVendor :req.body.NameofVendor , NameofProduct : req.body.NameofProduct } ,function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log(users)
            res.json(users);
        }
    });
});

// add review to the product
userRoutes.route('/reviewproduct').post(function(req, res) {
    console.log(req.body)
    Product.updateOne(
            {NameofVendor : req.body.NameofVendor , NameofProduct : req.body.NameofProduct} ,
            {  
                $addToSet:
                { ReviewsoftheProduct : req.body.givenreview }
            } 
        )
        .then(product => {
            res.status(200).json({'Review': 'Review added to th eproduct successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// get the reviews the product
userRoutes.route('/reviewproduct').post(function(req, res) {
    Product.find({NameofProduct :req.body.NameofProduct , NameofVendor : req.body.NameofVendor } ,function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log(users)
            res.json(users);
        }
    }).sort({ s: 1});
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});


