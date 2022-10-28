const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const compression = require('compression');
const path = require('path');
const config = require('config');
const connectDb = require('./config/db');

//importing all the routers
const user_router = require('./routes/user_route');
const product_router = require('./routes/product_route');
const admin_router = require('./routes/admin_route');

//initializing the app
const app = express();

const staticpath = path.join(__dirname, 'public');

const port = config.get('port');

//setting up body parser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

//setting up the server
app.use(cors());
app.use(express.static(staticpath));
app.use(compression())

//setting up routes
app.use('/account', user_router);
app.use('/product', product_router);
app.use('/admin', admin_router);

//connecting to the database
connectDb();

//to launch the server
app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`)
});