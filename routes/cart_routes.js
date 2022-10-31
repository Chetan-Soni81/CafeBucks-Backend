const express = require('express');
const router = express.Router();
const fs = require('fs')

const CartModel = require('../models/cart')
const UserModel = require('../models/user')
const FoodModel = require('../models/food')

router.use((req, res, next) => {
    console.log("Time: " + Date.now());
    next();
})

router.get("", async (req, res) => {
    const userId = req.query;
    try {
        const itemlist = await CartModel.find().populate('productId').exec();
        
        let totalPrice = 0;
        
        itemlist.map(item => {
            let file = fs.readFileSync((item.productId.image).toString());
            item.productId.image = file.toString('base64');
            totalPrice += item.productId.price * item.quantity;
        })


        console.log(`totalprice: ${totalPrice}`);

        res.status(200).json({ itemlist, totalPrice })
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server Error"})
    }

})

router.post('/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {

        const cartItem = new CartModel({
            productId, quantity, userId
        })

        const newCartItem = await cartItem.save()

        if (!newCartItem) {
            return res.status(401).json({ success: false, message: "Cannot be added to the cart" });
        }

        res.status(200).json({ newCartItem })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Server Error" })
    }
})

module.exports = router