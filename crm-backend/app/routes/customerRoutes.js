const express = require('express');
const router =express.Router();
const authMiddleware=require('../middleware/authMiddleware')
const validateCustomer=require('../middleware/validateCustomer')
const {getCustomers,addCustomer,updateCustomers,delCustomer} =require('../controllers/customerController')

router.get('/',authMiddleware,getCustomers);
router.post('/addCustomer',authMiddleware,validateCustomer,addCustomer);
router.patch('/updateCustomers/:id',authMiddleware,updateCustomers);
router.delete('/delCustomer/:id',authMiddleware,delCustomer);

module.exports=router;