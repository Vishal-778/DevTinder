const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://vishalchaudhary2524:YGrIFWKsTlIovIqY@node.h8p2g.mongodb.net/devTinder");
};

module.exports = connectDB;


