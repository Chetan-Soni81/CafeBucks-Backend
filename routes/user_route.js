const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const router = express.Router();

const UserModel = require('../models/user');
const cart_route = require('./cart_routes')
const category_route = require('./category_route')

const jsonParser = bodyParser.json();

mongoose.connect("mongodb://localhost:27017/foodDelivery", {
    useNewUrlParser: true
});

router.use('/cart', cart_route)
router.use('/category', category_route)

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
});

router.get('/login/:id', async (req, res) => {
    const id = req.params.id;

    try {
        let user = await UserModel.findById(id);

        if(!user) {
            return res.status(404).json({error: 'User Not Found'})
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json( {error: "server error"})  
    }
}) 

router.get('/login/', jsonParser, async (req, res) => {
    const { username, password } = req.query;

    console.log(username, password);

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        console.log('result ', user);
        res.status(200).json({ userId: user._id});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" })
    }
});

router.post('/signup', async (req, res) => {
    const { username, password, first_name, last_name } = req.body;

    try {

        let user = await UserModel.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const hashPwd = await bcrypt.hash(password, 12);

        user = new UserModel({
            username,
            password: hashPwd,
            firstname: first_name,
            lastname: last_name
        })

        await user.save();
        res.status(200).json({ created: 1 });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: "Server error" });
    }
});

module.exports = router;