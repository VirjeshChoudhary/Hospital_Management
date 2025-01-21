import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 

 const userSchema= new mongoose.Schema({
    firstName:{
        type : String,
        required:true,
        minLength :[3,"First Name Must Contain At Least 3 Characters!"]
    },
    lastName:{
        type : String,
        required:true,
        minLength :[3,"Last Name Must Contain At Least 3 Characters!"]
    },
    email:{
        type : String,
        required:true,
        validate:[validator.isEmail,"Please Provide A Valid Email!"]
    },
    phone:{
        type : String,
        required:true,
        minLength:[10,"Phone no. must contain 10 didgits!"],
        maxLength:[10,"Phone no. must contain 10 didgits!"],
    },
    nic:{
        type : String,
        required:true,
        minLength:[13,"NIC must contain 13 didgits!"],
        maxLength:[13,"NIC must contain 13 didgits!"],
    },
    dob:{
        type :Date,
        require :[true,"DOB IS REQUIRED"]
    },
    gender:{
        type: String,
        required :true,
        enum:["Male","Female"]
    },
    password:{
        type:String,
        minLength:[8,"Password must contain atleast 8 characters"],
        required:true,
        select:false
    },
    role:{
        type:"string",
        required:true,
        enum:["Admin","Patient", "Doctor"],
    },
    doctorDepartment:{
        type:String
    },
    docAvatar:{
        public_id:String,
        url:String,
    },
 })
 userSchema.pre("save",async function(next){ // pre save working is to hash the password before saving it to database
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,bcrypt.genSaltSync(8),null);
 })

userSchema.methods.comparePassword= async function (enteredPassword) {  // when you login to website it will compare both password 
    return await bcrypt.compare(enteredPassword,this.password);
}
userSchema.methods.generateWebToken= function () {  
    return jwt.sign({id : this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES,
    });
};

 export const User=mongoose.model("User",userSchema);