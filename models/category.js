const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        unique: true,
        required: true
    }
});

const category = mongoose.model('categories', categorySchema);

module.exports = category;