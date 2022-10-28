const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    foodID: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    quantity: {
        type: [Number]
    },
    isDelivered: Boolean
});

module.exports = OrderSchema;
