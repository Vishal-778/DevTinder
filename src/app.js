const express = require("express");
const connectDB = require("./config/database");

const app = express();
const User = require("./model/user");

app.post("/signup", async (req,res) => {
    const user = new User({firstName:"Vishal",
    lastName:"Chaudhary",
    email:"xyz",
    gender:"Male",
});
await user.save();
res.send("User is added sucessfully");
});



connectDB()
.then(() => {
    console.log("Databse connection is established");
    app.listen(3000,() => {
        console.log("Server is suceessfully running on port 3000");
    });
})
.catch((err) => {
    console.log("Database Connection is not established");
});




