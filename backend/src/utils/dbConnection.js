import mongoose from "mongoose"

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/auth_db"

async function dbConnection() {
    await mongoose.connect(MONGO_URL)
    .then(() => console.log("✅ Connected to MongoDB Successfully"))
    .catch((e) => console.log("❌ Error Connecting to MongoDB ", e))
}

export default dbConnection;