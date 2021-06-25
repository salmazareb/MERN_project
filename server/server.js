//concurrently 

const  dotenv =  require("dotenv");
const express = require('express')
// const cors=require('cors')
const app = express()
const productRoutes = require("./routes/productRoute")
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoute')
dotenv.config();
// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
require('./config/db')
// // Main routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders',orderRoutes)
app.get('/api/config/paypal',(req,res) =>{
    res.send("AUj6Ol1uxfjgYjsUjvKUproee1GyohbRF4f8NyUFYlVkjyW4kcOHWOMllUleAQFw21JimgInILbtGUds")
})
const port=8000
app.listen(port, ()=>{
    console.log("listening at port "+ port)
})