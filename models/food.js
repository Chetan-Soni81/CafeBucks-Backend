const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true        
    },
    price: {
        type: Number,
        required: true
    }, 
    about: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    }
})

const food = mongoose.model('foods', foodSchema);
module.exports = food