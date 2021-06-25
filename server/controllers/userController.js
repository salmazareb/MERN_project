const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const generateToken = require('../utils/generateToken');

//@desc register new user
// @route POST /api/users
// @access public

const register = asyncHandler(async (req,res) => {
    const {name,email, password} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('is Invalid User')
    }
})


const authUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401);
        throw new Error("Invalid email and passowrd")
    }
})

const userProfile =  asyncHandler(async (req,res) => {
    const user =await User.findById(req.user._id)
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(401);
        throw new Error("User not found")
    }
})

const updateUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id) 
    if (user){
        user.name = req.body.name || user.name 
        user.email = req.body.email || user.email 
        if (req.body.password){
            user.password = req.body.password
        }
        const userUpdated = await user.save()
        res.status(201).json({
            _id: userUpdated._id,
            name: userUpdated.name,
            email: userUpdated.email,
            isAdmin: userUpdated.isAdmin,
            token: generateToken(userUpdated._id)
        })
    }else{
        res.status(401);
        throw new Error("User not found")
    }
})
//admin routs
const getUsers = asyncHandler(async (req,res) => {
    const users = await User.find()
    res.json(users)
})
const getOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find()
    res.json(orders)
})
module.exports = {register,authUser,userProfile,updateUserProfile,getUsers}