const express = require('express')
const router = express.Router()

const CategoryModel = require('../models/category')

router.use((req, res, next)=>{
    console.log('TIme: '+Date.now())
    next()
}) 

//to send all category objects
router.get('/', (req, res) => {
    CategoryModel.find((error, result) => {
        if (error) throw error;
        res.json(result)
    })
})

//to send category by id
router.get('/:_id', (req, res) => {
    let _id = req.params._id;

    CategoryModel.findById(_id, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

//To insert category objects
router.post('/create',async (req, res) => {
    let categoryName = req.body.categoryName;

    const category = new CategoryModel({categoryName: categoryName});

    try {
        await category.save();
        res.json({ok : "1"})
    } 
    catch (err) {
        console.log(err);
        res.json({ok: "0"})
    }
})

//To delete a category object
router.delete('/delete', async (req, res) => {
    let _id = req.query._id;

    try{
        await CategoryModel.deleteOne({_id: _id});
        res.json({deleted: true})
    } catch (err) {
        console.log(err)
        res.json({deleted: false})
    }
})

//To update a category object
router.put('/update', async (req, res) => {
    let _id = req.body._id;
    let categoryName = req.body.categoryName;

    try {
        await CategoryModel.updateOne({_id: _id}, {categoryName: categoryName})
        res.json({updated: true})
    } catch(err) {
        console.log(err)
        res.json({updated: false})
    }
})

module.exports = router