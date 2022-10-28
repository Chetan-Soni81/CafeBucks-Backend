const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoDB')

const connectDB = async () =>{
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            userStrictPopulate: false
        });

        console.log("Mongo Connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB