const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("DatabaseLink");
};

module.exports = connectDB;


