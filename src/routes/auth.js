const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const {validateSignUpData} = require("../utils/validation");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req,res) => {
    try{
        validateSignUpData(req);
        
        
        const {firstName,lastName,email,password}=req.body;
        const passwordHash = await bcrypt.hash(password,10);
        console.log(passwordHash);

        const user = new User(
            {
                firstName,
                lastName,
                email,
                password:passwordHash,
               
               

            }
        )
        await user.save();
        res.send("User is added sucessfully");
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
  
}
);

authRouter.post("/login", async(req,res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if(!user)
        {
            throw new Error("EmailId is not present in Db");
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(isPasswordValid)
        {
            const token= await jwt.sign({_id:user._id},"DEV@79TINDER$790");
            console.log(token);
            res.cookie("token",token);
            res.send("Login Sucessfull");
        }
        else{
            throw new Error("Password is not correct");
        }
    }
        catch(err){
            res.status(400).send("Error:" + err.message);
       
    }
});

module.exports = authRouter;


