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

// router.get('', async (req, res) => {
//     const { userId } = req.query;

//     console.log("userid recieved: ", userId);

//     try {

//         const user = await UserModel.findById(userId).populate('cart')

//         if (!user) {
//             return res.status(404).json({ error: "user not found" })
//         }

//         // console.log(user.cart);



//         const itemlist = user.cart;

//         let list = [];
//         for (let i in itemlist) {
//             try {

//                 let food = await FoodModel.findById(itemlist[i].productId);
//                 let file = fs.readFileSync(food.image);
//                 food.image = file.toString('base64');
//                 // food['quantity'] = item.quantity;
//                 list.push(food)
//             } catch (error) {

//             }
//         }
//         console.log("These are list items: ", list);


//         // console.log(`cart items: ${itemlist}`);

//         res.status(200).json({itemlist: list});

//     } catch (error) {
//         console.log(error.message);
//     }
// })

// router.post('/add', async (req, res) => {
//     const { userId, productId, quantity } = req.body;
//     try {

//         const cartItem = new CartModel({
//             productId, quantity
//         })

//         const newCartItem = await cartItem.save()

//         const user = await UserModel.findById(userId);

//         var itemlist = user.cart
//         itemlist.push(newCartItem._id)
//         user.cart = itemlist

//         console.log(user);

//         await user.save()

//         res.status(200).json({ newCartItem });
//     } catch (error) {
//         console.log(error.message);
//         res.status("500").json({ error: "Server error" })
//     }
// })

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