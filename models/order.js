const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    foodID: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    quantity: {
        type: [Number]
    },
    isDelivered: Boolean
});

const order = mongoose.model(
    'orders', OrderSchema
);

module.exports = order;
