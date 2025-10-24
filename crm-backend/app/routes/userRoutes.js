const express = require('express');
const router =express.Router();
const {userRegister,userLogin,userLogout,getUserProfile,getUsers,updateUser,deleteUser} =require('../controllers/userController')
const validateUser =require('../middleware/validateUser')
const authMiddleware=require('../middleware/authMiddleware');
const { updateCase } = require('../controllers/caseController');
const roleMiddleware=require('../middleware/roleMiddleware')



router.post('/register',validateUser,userRegister);
router.post('/login',userLogin);
router.post('/logout',authMiddleware,userLogout);
router.get('/profile',authMiddleware,getUserProfile);
router.get('/',authMiddleware,getUsers);
router.patch('/updateUser/:id',authMiddleware,updateUser);
router.delete('/deleteUser/:id',authMiddleware,roleMiddleware(['admin']),deleteUser);



module.exports=router;