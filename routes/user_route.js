const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();

const UserModel = require('../models/user');

const jsonParser = bodyParser.json();

mongoose.connect("mongodb://localhost:27017/foodDelivery", {
    useNewUrlParser: true
});

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
});

router.get('/login/', jsonParser, (req, res) => {
    let username = req.query.username;
    let password = req.query.password;

    console.log(username, password);
    UserModel.findOne({username: username, password: password}, (error, result)=>{
        if(error) throw error;
        console.log('result',result);
        res.json(result)
    })
});

router.post('/signup', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;

    const user = new UserModel({username: username, password: password, firstname: first_name, lastname: last_name});

    try{
        await user.save();
        res.json({created: 1});
    }
    catch (err) {
        console.log(err);
        res.json({created: 0});
    }
});

module.exports = router;