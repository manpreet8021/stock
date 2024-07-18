import mongoose from "mongoose";

const connectDb = async() => {
    try{
        const response = await mongoose.connect("mongodb+srv://manpreetsingh8521:XnNue9oqX3eQGaMs@cluster0.m5h11sl.mongodb.net/", {autoIndex: true});
        console.log("MongoDb connected");
    } catch(error) {
        console.log(`Check for error ${error}`);
    }
}

export default connectDb;