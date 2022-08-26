const { json } = require('body-parser');
const express = require('express');
const router = express.Router();

const FoodModel = require('../models/food');

router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

//To send all products
router.get('/', (req, res) => {
    FoodModel.find().populate('category').exec((err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

//To send product by id
router.get('/:id', (req, res) => {
    let _id = req.params.id;

    FoodModel.findById(_id, (err , result) => {
        if(err) throw err;
        res.json(result)
    })
})

//To create a product
router.post('/create', async (req, res) => {
    let foodName = req.body.foodName;
    let price = req.body.price;
    let about = req.body.about;
    let category = req.body.category;

    const food = new FoodModel({
        foodName: foodName,
        price: price,
        about: about,
        category: category
    })

    try {
        await food.save();
        res.json({created: true});
    } catch (err) {
        console.log(err);
        res.json({created: false})
    }
})

//to update a product
router.put('/update', async (req, res) => {
    let _id = req.body._id;
    let foodName = req.body.foodName;
    let price = req.body.price;
    let about = req.body.about;
    let category = req.body.category;

    try {
        await FoodModel.updateOne({_id: _id}, {
            foodName: foodName,
            price: price,
            about: about,
            category: category
        })
        res.json({updated: true})
    } catch (err) {
        console.log(err);
        res.json({updated: false})
    }
})

//to delete a product
router.delete('/delete/:id' , async (req, res) => {
    let _id = req.params.id;
    
    try {
        await FoodModel.deleteOne({_id: _id});
        res.json({deleted: true});
    } catch (err) {
        console.log(err);
        res.json({deleted: false});
    }
})

module.exports = router