const express = require('express');
const {register,authUser,userProfile,updateUserProfile,getUsers} = require('../controllers/userController');
const router = express.Router();
const {protect,admin} = require ('../middlewares/authMiddleware')

router.route("/").get(protect, admin, getUsers)
router.route('/register').post(register);
router.route('/login').post(authUser);
router.route('/profile').get(protect,userProfile).put(protect,updateUserProfile);



module.exports = router