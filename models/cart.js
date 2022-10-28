const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    productId : {
        type: Schema.Types.ObjectId,
        ref: 'foods'
    },
    quantity: {
        type: Number,
        default: 1
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {timestamps: true})

const model = mongoose.model('carts', CartSchema)

module.exports = model