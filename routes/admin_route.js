const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const category_route = require('./category_route');
const product_route = require('./product_route')

const AdminModel = require('../models/admin')

//setting up nested routes
router.use('/category', category_route);
router.use('/product', product_route);

router.use((req, res , next) => {
    console.log('Time:',Date.now());
    next();
})

//To login as admin
router.get('/login', (req, res) => {
    let username = req.query.username;
    let password = req.query.password;

    AdminModel.findOne({username: username, password: password}, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

module.exports = router