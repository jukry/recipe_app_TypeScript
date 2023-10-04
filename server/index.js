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
    origin:
        process.env.NODE_ENV === "production"
            ? [
                  "https://recipe-app-five-drab.vercel.app",
                  "https://recipe-powutmvwi-jukry.vercel.app",
                  "https://recipe-app-git-main-jukry.vercel.app/",
              ]
            : true,
    credentials: true,
    optionsSuccessStatus: 200,
}

// allow all cors-requests
app.use(cors(corsOptions))

const port = process.env.port || 5000
app.set("trust proxy", 2)
app.get("/ip", (request, response) => response.send(request.ip))
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
