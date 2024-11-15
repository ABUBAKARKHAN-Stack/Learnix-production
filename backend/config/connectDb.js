import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_DB_URI)
        const { name, host, port } = connectionInstance.connection
        console.log(`Connected to MongoDB at mongodb://${host}:${port}/${name}`);
    } catch (error) {
        console.log(error)
    }
}

export { connectDB };