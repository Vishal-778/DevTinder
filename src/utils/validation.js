var validator = require("validator");

const validateSignUpData = (req) => {
    const{firstName,lastName,email} = req.body;

    if(!firstName || !lastName)
    {
        throw new Error("Nmae is not valid");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword)
    {
        throw new Error("Please Enter a Strong password");
    }

    
};

module.exports = {validateSignUpData,};
