const validateCustomer =(req,res,next)=>{
    const {name,contact_info,status} = req.body
    if(!name || !contact_info || !status){
        return res.status(400).json({error:'All fields are required'})
    }
    next();
}

module.exports=validateCustomer;