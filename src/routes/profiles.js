const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const jwt = require("jsonwebtoken");


profileRouter.get("/profile", userAuth, async (req,res) => {
    /* try{
         const cookies = req.cookies;
         const { token } = cookies;
         if(!token){
             throw new Error("Invalid token");
         }
         const decodedMessage= await jwt.sign({_id:user_id},"DEV@79TINDER$790");
         const{_id} = decodedMessage;
         const user = await User.findById((_id));
         if(!user)
         {
             throw new Error("User does not exist");
         }
         res.send(user);
     }
     catch(err) 
     {
         res.status(400).send("ERROR:" + err.message);
     } */
     const cookies = req.cookies;
     const {token} = cookies;
 
     const decodedMessage = await jwt.verify(token,"DEV@79TINDER$790");
     const {_id} = decodedMessage;
     console.log("Logged In User is:" + _id);
     const user = await User.findById(_id);
     if(!user) {
         throw new Error("user does not Exist");
     }
     
     res.send(user);
 });

 module.exports = profileRouter;