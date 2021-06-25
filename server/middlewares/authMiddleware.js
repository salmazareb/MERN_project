const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');


const protect = asyncHandler(async(req,res,next) => {
    let token;
    if(req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, "geeks") 
            req.user = await User.findById(decode.id).select("-password")
            next() 
        }catch(error){
            res.status(401)
            throw new Error("Not authorized") 
        }

    }
    if (!token){
        res.status(401)
        throw new Error("Not token") 
    }
})

const admin = asyncHandler(async(req,res,next) => {
    if(req.user && req.user.isAdmin){
        next()
    }
    else{
        res.status(401)
        throw new Error("You are not admin") 
    }
})
module.exports = {protect,admin}