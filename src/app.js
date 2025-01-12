const express = require("express");

const app = express();

const {adminAuth} = require("./middlewares/auth")

app.get("/admin/getAllData",adminAuth,(req,res) => {
    
        res.send("All data sent");
   
});

app.get("/admin/deleteAllData",(req,res) => {
       res.send("All data deleted");
});

app.listen(3000,() => {
    console.log("Server is running sucessfully");
})