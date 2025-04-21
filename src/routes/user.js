const express = require("express");
const userRouter = express.Router();
const {userAuth}= require("../middlewares/auth");

// Get all the pending connection Requests for tyhe loggedIn User
userRouter.get("/user/requests/received",userAuth,async(req,res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status: "interested",
            
        });
        res.json({message: "Data fetched Succesfully",
            data: connectionRequests,
    });


    }
    catch(err) {
        res.statusCode(400).send("ERROR : " + err.message);

    }
});

module.exports = userRouter;