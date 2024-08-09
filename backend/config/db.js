import mongoose from "mongoose";

const connectDB = async() => {
    try {

        // const mongoUri = process.env.MONGO_URI

        // if (!mongoUri) {
        //     throw new Error("Mongouri is not present")
            
        // }

        await mongoose.connect("mongodb://127.0.0.1:27017/test")
        console.log("Successfully connectd to mongoDB....");
        
    } catch (error) {
        console.log(`ERROR : ${error.message}` );
        process.exit(1)
    }

}

export {connectDB}