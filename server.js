const config = require('./src/config/config')
const app = require('./src/app')
const connectDb = require("./src/config/connectDb")
const PORT = config.port

app.listen(PORT, async () => {
  await connectDb()
  console.log("API is running on port " + PORT)
})