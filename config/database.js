import mongoose from "mongoose";

let connected = false

const connectDB = async () =>{
    mongoose.set('strictQuery', true)

    if(connected){
        console.log('Database is connected');
        return;
    }
    try {
        mongoose.connect(process.env.MONGO_URI)
        connected = true
    } catch (error) {
        console.log(error);
                
    }
}
export default connectDB