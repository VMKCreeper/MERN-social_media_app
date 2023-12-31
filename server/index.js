import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"

dotenv.config()
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())

app.use("/posts", postRoutes)
app.use("/users", userRoutes)

const URI = process.env.MONGO_URI
const PORT = process.env.PORT || 5000

mongoose.connect(URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})).catch((err) => {
    console.log(err.message)
})