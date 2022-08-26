const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const user_router = require('./routes/user_route');
const product_router = require('./routes/product_route');
const admin_router = require('./routes/admin_route');
const path = require('path');
const app = express();

const FoodModel = require('./models/food');
const staticpath = path.join(__dirname, 'public');

app.use(express.json());
app.use(cors());
app.use(express.static(staticpath));

//setting up routes
app.use('/account', user_router);
app.use('/product', product_router);
app.use('/admin', admin_router);

mongoose.connect('mongodb://localhost:27017/foodDelivery', {
    useNewUrlParser: true
});

//to launch the server
app.listen(3001, ()=>{
    console.log('Server is running at http://localhost:3001')
});