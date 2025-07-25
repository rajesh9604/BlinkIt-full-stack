import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGODB_URI){
    throw new Error(
        "please provide MONGODB_URI in the .env file"
    ) 
}
async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connect DB");
        
    }catch(err){
        console.log("mongodb connect error", err);
        process.exit(1)
    }
}

export default connectDB