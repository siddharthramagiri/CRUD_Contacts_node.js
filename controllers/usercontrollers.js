
const expressAsyncHandler = require("express-async-handler");
const Users = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Register a User
const RegisterUser = expressAsyncHandler(async (req,res) => {
    const {username , email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All Fields Are Mandatory");
    }
    const userAvailable = await Users.findOne({email});
    if(userAvailable) {
        res.status(400);
        throw new Error("User Already Exists");
    };
    const hashpassword = await bcrypt.hash(password,10);

    //Register or store user in db
    const user = await Users.create({
        username,
        email,
        password : hashpassword,
    });
    console.log(user);
    if(user) {
        res.status(201).json({_id : user.id, email : user.email, username: user.username});
    } else {
        res.status(401);
        throw new Error("USer Not Created");
    }
    res.json({message: "Register the user"});
});


//Login User (Comparing Email pw)
const LoginUser = expressAsyncHandler(async (req,res) => {
    const {email , password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All Fields are Required");
    }
    const user = await Users.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))) {
        const accessToken = jwt.sign({
            users:{
                username : user.username,
                email : user.email,
                id : user.id,
            },
            },process.env.ACCESS_TOKEN_PRIVATE,
        { expiresIn : "20m" }
        );
        res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error("Email or Password is Incorrect");
    }
});

const CurrentUser = expressAsyncHandler(async (req,res) => {
    res.json(res.users);
})

module.exports = {RegisterUser , LoginUser, CurrentUser};