import express from "express"
import bp from "body-parser"
import recipesRouter from "./routes/recipes.js"
import userRouter from "./routes/user.js"
import authRouter from "./routes/auth.js"
import connectDB from "./config/conn.js"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cookieParser())

app.use(bp.urlencoded({ extended: true }))

//middleware
app.use(bp.json())

const corsOptions = {
    origin: "https://recipe-app-pkdp.onrender.com/",
    credentials: true,
    optionsSuccessStatus: 200,
}

// allow all cors-requests
app.use(cors(corsOptions))

const port = process.env.port || 5000

app.get("/", (req, res) => {
    res.send("Main page")
})

// prefix ettei tarvitse routerin puolella määritellä
app.use("/api/recipes", recipesRouter)
app.use("/users", userRouter)
app.use("/auth", authRouter)

// database connection
const db = connectDB()

db.then(() => {
    app.listen(port, () =>
        console.log(`Connected to db. Server running on port ${port}`)
    )
}).catch((error) => {
    console.log(error)
})
