const mongoose = require("mongoose")
const config = require("./config")

const connectDb = async () => {
 try {
  await mongoose.connect(config.dbUrl)
  console.log("MongoDB connected successfully! :D")
 } catch (error) {
    console.error("Database connection unsuccessful. :(", error)
    process.exit(1)
 }
}

module.exports = connectDb
