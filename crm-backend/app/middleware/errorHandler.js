const errorHandler = (error,req,res,next) =>{
    //set a default status code or use what's provide
    const statusCode =error.statusCode || 500;

    //set a default error msg or use what's provide
    const message = error.message || 'Internal Server Error'

    //Optional:Log the full error to the console for debugging
    console.error(error);

    //send a JSON response  to the client with error info
    res.status( statusCode).json({
        success:false,
        message:message
    });
};
module.exports=errorHandler;
