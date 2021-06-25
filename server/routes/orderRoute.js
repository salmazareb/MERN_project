const express = require('express');
const {getOneOrder,addOrder,updateOrderToPaid,getMyOrders} = require('../controllers/orderController');
const router = express.Router();
const {protect} = require ('../middlewares/authMiddleware')

router.route('/').post(protect,addOrder);
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOneOrder);
router.route('/:id/pay').put(protect,updateOrderToPaid)



module.exports = router