const express = require("express")
const app = express()
const cors = require("cors")
const logger = require("./middleware/reqLogger")
const errorHandler = require("./middleware/errorHandler")
const routes = require("./routes/postRoutes")
const userRoutes = require('./routes/userRoutes')
const cookieParser = require("cookie-parser")


app.use(express.json())
app.use(cors("*"))
app.use(cookieParser())
app.use(logger)


app.use('/api/auth', userRoutes)
app.use('/api', routes)

app.use(errorHandler)


module.exports = app