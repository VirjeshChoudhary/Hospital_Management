import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"HOSPITAL_MANAGEMENT_SYSTEM",
    })
    .then(()=>{
        console.log("DB connected");
    })
    .catch((err)=>{
        console.log(`Error occured during db connection : ${err}`);
    });
};
