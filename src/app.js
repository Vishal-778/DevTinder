const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");





const { isJWT } = require("validator");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profiles");
const requestRouter = require("./routes/requests");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);



app.delete("/user", async (req,res) => {
    const userId=req.body.userId;

    try{
        const user=await User.findByIdAndDelete(userId);
        res.send("User deleted Sucessfully");
    }
    catch(err){
        res.status(400).send("User deleted Sucessfully");
    }
})

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




