const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose
            .connect(mongoUrl, {})
            .then(() => {
                console.log("MongoDB Connected");
            })
    }
    catch(err) {
        console.error("Connection to MongoDB failed");
        process.exit(1);
    }
}

module.exports = connectDB;