import mongoose from "mongoose"

const connectDB=async()=>{
    try{
        // console.log(process.env.MONGODB_URL)
        const connection=await mongoose.connect(process.env.MONGoDB_URL)
    }
    catch(error){
        console.log("ERROR while connecting ot Mongodb:"+error);
        process.exit(1);
    }
};

export default connectDB