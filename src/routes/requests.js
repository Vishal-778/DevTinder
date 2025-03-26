const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../model/ConnectionRequest");
const User = require("../model/user");


/*requestRouter.post("/sendConnectionRequest",userAuth, async(req,res) => {
    const user = req.user;
    console.log("Sending a connection request");
    res.send(user.firstName + "sent the connection request!");
}); */

requestRouter.post("/request/send/:status/:toUserId",userAuth,
    async(req,res) => {
        try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored","interested"];
        
        if(!allowedStatus.includes(status))
        {
            return res.status(400).send({message: "Invalid status type:" + status});
        }

        //if there is an existing connectionRequest
        const existingConnectionRequest = await ConnectionRequest.findOne(
            {
                $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId},
                ],
            }
        );

        if(existingConnectionRequest)
        {
            return res.status(400).send({message: "ConnectionRequest Already Exists"});
        }

        //Find if user exists or not
        const toUser = await User.findById(toUserId);
        if(!toUser)
        {
            return res.status(400).json({message: "User not found!"});
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,toUserId,status
        })

        const data = await connectionRequest.save();

        res.json({
            message: req.user.firstName + " is " + status + " in " + toUser.firstName,
            data,

        })


        }
        catch(error) {
            res.status(400).send("ERROR:" + error.message);
        }
       
    }
    
) 

module.exports = requestRouter;