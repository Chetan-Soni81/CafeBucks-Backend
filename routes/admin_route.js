const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();

const category_route = require('./category_route');
const product_route = require('./product_route')

const AdminModel = require('../models/admin')

//setting up nested routes
router.use('/category', category_route);
router.use('/product', product_route);

router.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
})

//To login as admin
router.get('/login', async (req, res) => {
    const { username, password } = req.query;
    try {
        const admin = await AdminModel.findOne({ username });

        if (!admin) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        res.status(200).json({ admin });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
})

module.exports = router