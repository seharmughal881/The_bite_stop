const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGODB_URI environment variable is not defined');
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        if (process.env.NODE_ENV === 'production') {
            console.log('Please check your environment variables on Render dashboard');
        }
        process.exit(1);
    }
};

module.exports = connectDB;
