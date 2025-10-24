const validateCase =(req,res,next)=>{
    const {customer_id, assigned_to, priority, status} = req.body
    if(!customer_id || !assigned_to || !priority || !status ){
        return res.status(400).json({error:'All fields are required'})
    }
    next();
}

module.exports=validateCase;