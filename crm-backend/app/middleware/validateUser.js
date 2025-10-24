const validateUser =(req,res,next)=>{
    const {name,email,password,phone } = req.body
    if(!name || !email || !password || !phone){
        return res.status(400).json({error:'All fields are required'})
    }
    next();
}

module.exports=validateUser;