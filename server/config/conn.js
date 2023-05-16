import mongoose from "mongoose"
import * as dotenv from "dotenv"
dotenv.config()
mongoose.set("strictQuery", false)
async function connectDB() {
    try {
        await mongoose.connect(process.env.ATLAS_URI)
        //console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export default connectDB
