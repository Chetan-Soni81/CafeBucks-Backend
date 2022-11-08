const express = require('express')
const router = express.Router()

const CategoryModel = require('../models/category')

router.use((req, res, next) => {
    console.log('TIme: ' + Date.now())
    next()
})

//to send all category objects
router.get('/', async (req, res) => {
    // CategoryModel.find((error, result) => {
    //     if (error) throw error;
    //     res.json(result)
    // })

    try {
        const categoryList = await CategoryModel.find();

        if (!categoryList) {
            return res.status(404).json({ message: "Categories not found" })
        }

        res.status(200).json(categoryList)
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
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
router.post('/create', async (req, res) => {
    let categoryName = req.body.categoryName;
    console.log('data recieved: ', categoryName);

    try {
        const category = await CategoryModel.findOne({categoryName: categoryName});

        console.log('first step');
        
        if(category) {
            return res.status(400).json({error: "Category already exists"})
        }
        console.log('second step');
        
        const newCategory = CategoryModel.create({
            categoryName
        })
        console.log('third step');
        
        res.status(201).json({message: "Category created successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server Error"})
    }
})

//To delete a category object
router.delete('/delete', async (req, res) => {
    let _id = req.query._id;

    try {
        await CategoryModel.deleteOne({ _id: _id });
        res.status(200).json({ message: 'Deleted category successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Server Error" })
    }
})

//To update a category object
router.put('/update', async (req, res) => {
    let _id = req.body._id;
    let categoryName = req.body.categoryName;

    try {
        await CategoryModel.updateOne({ _id: _id }, { categoryName: categoryName })
        res.json({ updated: true })
    } catch (err) {
        console.log(err)
        res.json({ updated: false })
    }
})

module.exports = router