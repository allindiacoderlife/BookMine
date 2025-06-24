const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;
// const mongoUrl = "mongodb+srv://allindiacoderlife:admin@cluster0.ck9vw1n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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