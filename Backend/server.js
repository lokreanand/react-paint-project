import express from "express";
// const express = require("express");
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://lokreanand:Andyboy7867@emp.5pcj8.mongodb.net/mern-auth",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

app.post("/login",(req,res)=>{
    const {email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
           if(password === user.password){
               res.send({flag:true,user:user})
           }else{
               res.send({flag:false})
           }
        }else{
            res.send({flag:"False"})
        }
    })
});
app.post("/register",(req,res)=>{
    console.log(req.body) 
    const {name,email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({flag:false})
        }else {
            const user = new User({name,email,password})
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({flag:true})
                }
            })
        }
    })


}) 

app.listen(5000,()=>{
    console.log("started")
})