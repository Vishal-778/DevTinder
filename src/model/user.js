const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        gender:{
            type:String,
            enum:{
                values:["male","female","others"],
                message:'{VALUE} is not a gender type',
            },
        },
        password:{
            type:String,
            required:true,
        },
        
    }
);

userSchema.index({firstName:1, lastName:1});

const User = mongoose.model("User",userSchema);
module.exports = User;