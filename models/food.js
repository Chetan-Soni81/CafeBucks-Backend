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
    image : {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    }
}, {timestamps: true})

const food = mongoose.model('foods', foodSchema);
module.exports = food