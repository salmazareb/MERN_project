const Order = require('../models/OrderModel')
const asyncHandler = require("express-async-handler");

const addOrder = asyncHandler(async (req,res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;
    const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    });
    const newOrder = await order.save();
    res.json(newOrder);
});

const getOneOrder = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id).populate("user","email name")
    if(order){
        res.json(order);
    }
    else{
        res.status(404)
        throw new Error("Order not found")
    }
});

const updateOrderToPaid = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };
        const updateOrder = await order.save();
        res.json(updateOrder);
    }else{
        res.status(404)
        throw new Error("Order not found")
    }
})


const getMyOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find({user:req.user._id}).sort('-createdAt')
    res.json(orders)
})

const getOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find().populate("user" , "name")
    res.json(orders)
})

const isDelivered = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        order.isDelivered= true
        order.deliveredAt=Date.now()
        const updateOrder= await order.save()
    }
    res.json(updateOrder)
})
module.exports= {getOneOrder,addOrder,updateOrderToPaid,getMyOrders,getOrders,isDelivered}