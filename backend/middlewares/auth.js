import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import { User } from "../models/userSchema.js";

export const isAdminAuthenticated=catchAsyncErrors(async (req,res,next)=>{
    const token=req.cookies.AdminToken;
    if(!token){
        return next(new ErrorHandler("Admin not Authenticated"));
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET_KEY); // same webite is generate or kahi aur se generate toh nahi hua
    req.user=await User.findById(decode.id);
    if(req.user.role!=="Admin"){
        return next(
            new ErrorHandler(
                `${req.user.role} not authorized for this resources!`, 403
            )
        )
    }
    next();
});


export const isPatientAuthenticated=catchAsyncErrors(async (req,res,next)=>{
    const token=req.cookies.PatientToken;
    if(!token){
        return next(new ErrorHandler("User not Authenticated"));
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET_KEY); // same webite is generate or kahi aur se generate toh nahi hua
    req.user=await User.findById(decode.id);
    if(req.user.role!=="Patient"){
        return next(
            new ErrorHandler(
                `${req.user.role} not authorized for this resources!`, 403
            )
        )
    }
    next();
});