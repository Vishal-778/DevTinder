const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,

    },
    status : {
        type : String,
        enum : {values:[
                "accepted","rejected","ignored","interested"
        ],
        message : '{VALUE} is incorrect status type'
    }},

    
},
{
    timestamps:true,
}
);

connectionRequestSchema.index({fromUserId:1, toUserId:1});

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    //Check if fromUserId is equls  to toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
    {
        throw new Error("Cannot send connection request to yourself")
    }
    next();
})

const ConnectionRequestModel = new mongoose.model(
    'ConnectionRequest',   //Name of the model
    connectionRequestSchema,
)

module.exports = ConnectionRequestModel;