const express = require('express');
const router =express.Router();
const caseController =require('../controllers/caseController')
const validateCase =require('../middleware/validateCase')
const authMiddleware=require('../middleware/authMiddleware')
const roleMiddleware=require('../middleware/roleMiddleware')

router.get('/',authMiddleware,caseController.getcases);
router.post('/',authMiddleware, roleMiddleware(['admin']),validateCase,caseController.addCase);
router.patch('/:id',authMiddleware,caseController.updateCase);
router.delete('/:id',authMiddleware,caseController.delCase);




module.exports=router;