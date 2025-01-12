const adminAuth=(req,res,next) => {
    const token="xyz";
    const isAdminAuthorised=token==="xyz";
    if(!isAdminAuthorised)
    {
        res.status(401).send("Unautorised Admin");
    }
    else{
        console.log("Authorised User");
        next();
    }
};

module.exports = {
    adminAuth

}