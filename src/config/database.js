const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("Database Link");
};

module.exports = connectDB;


