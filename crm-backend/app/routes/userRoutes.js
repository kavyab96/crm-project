const express = require('express');
const router =express.Router();
const {userRegister,userLogin,userLogout,getUserProfile} =require('../controllers/userController')
const validateUser =require('../middleware/validateUser')
const authMiddleware=require('../middleware/authMiddleware')


router.post('/register',validateUser,userRegister);
router.post('/login',userLogin);
router.post('/logout',authMiddleware,userLogout);
router.get('/profile',authMiddleware,getUserProfile);



module.exports=router;