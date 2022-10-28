const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();


const FoodModel = require('../models/food');

const upload = multer({ dest: './public/images' })

router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

//To send all products
router.get('/', (req, res) => {
    FoodModel.find().populate('category').exec((err, result) => {
        if (err) throw err;

        result.map(data => {
            let file = fs.readFileSync(data.image);
            data.image = file.toString('base64')
        })

        res.json(result);
    })
})

router.get('/filtered', (req, res) => {
    let min = req.query.min;
    let max = req.query.max;

    FoodModel.find({
        price: { $gt: min, $lt: max }
    }).populate('category').exec((err, result) => {
        if (err) throw err;

        result.map(data => {
            let file = fs.readFileSync(data.image);
            data.image = file.toString('base64')
        })

        res.json(result);
    })
})

//To send product by id
router.get('/:id', (req, res) => {
    let _id = req.params.id;

    // FoodModel.findById(_id, (err , result) => {
    //     if(err) throw err;

    //         let file = fs.readFileSync(result.image);
    //         result.image = file.toString('base64')

    //     res.json(result)
    // })
    FoodModel.findById(_id).populate('category').exec((err, result) => {
        if (err) throw err;

        let file = fs.readFileSync(result.image);
        result.image = file.toString('base64')

        res.json(result)
    })
})

//To create a product
router.post('/create', upload.single('productImage'), async (req, res) => {

    let foodName = req.body.foodName;
    let price = req.body.price;
    let about = req.body.about;
    let category = req.body.category;
    let image = req.file

    const newPath = './public/images/' + (Date.now() + image.originalname);

    fs.rename(image.path, newPath, (err) => {
        if (err) throw err;
        console.log('renamed')
    })

    const food = new FoodModel({
        foodName: foodName,
        price: price,
        about: about,
        image: newPath,
        category: category
    })

    try {
        await food.save();
        res.json({ created: true });
    } catch (err) {
        console.log(err);
        res.json({ created: false })
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
        await FoodModel.updateOne({ _id: _id }, {
            foodName: foodName,
            price: price,
            about: about,
            category: category
        })
        res.json({ updated: true })
    } catch (err) {
        console.log(err);
        res.json({ updated: false })
    }
})

//to delete a product
router.delete('/delete/:id', async (req, res) => {
    let _id = req.params.id;

    try {
        await FoodModel.deleteOne({ _id: _id });
        res.json({ deleted: true });
    } catch (err) {
        console.log(err);
        res.json({ deleted: false });
    }
})

module.exports = router