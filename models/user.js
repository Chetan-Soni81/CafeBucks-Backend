const mongoose = require('mongoose');
const OrderSchema = require('./order');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    address: [String], 
    cart: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "carts"
    }
});

const user = mongoose.model('users', UserSchema);

module.exports = user