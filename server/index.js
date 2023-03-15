import express from "express"
import bp from "body-parser"
import recipesRouter from "./routes/recipes.js"
import connectDB from "./config/conn.js"
import mongoose from "mongoose"
import cors from "cors"
const app = express()

app.use(bp.urlencoded({ extended: true }))

//middleware
app.use(bp.json())

// allow all cors-requests
app.use(cors())

const port = process.env.port || 5000

app.get("/", (req, res) => {
    res.send("Main page")
})

// /recipes prefix ettei tarvitse recipes.js puolella määritellä
app.use("/api/recipes", recipesRouter)

// database connection
const db = connectDB()

db.then(() => {
    app.listen(port, () =>
        console.log(`Connected to db. Server running on port ${port}`)
    )
}).catch((error) => {
    console.log(error)
})

/* 
export default db
 */
