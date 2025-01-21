class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}
export const errorMiddleware=(err,req,res,next)=>{
    err.message=err.message || "Internal Server Error";
    err.statusCode=err.statusCode || 500;
    if(err.code === 11000){
         const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;   // when duplicate e-mail will come  and object ki keys ko handle krna h     
         err=new ErrorHandler(message,400);
    }
    if(err.name==="JsonWebTokenError"){
        const message="Json Web Token is Invalid, Try Again";
        err=new ErrorHandler(message,400);
    }
    if(err.name==="TokenExpiredError"){
        const message="Json Web Token is Expired, Try Again";
        err=new ErrorHandler(message,400);
    }
    if(err.name==="CastError"){
        const message=`Invalid ${err.path}`;
        err=new ErrorHandler(message,400);
    }
    const errMessage=err.errors ? Object.values(err.errors).map(error=>error.message).join(", ") : err.message;
    return res.status(err.statusCode).json({
        sucess:false,
        message:errMessage,
    })
    
};
export default ErrorHandler;