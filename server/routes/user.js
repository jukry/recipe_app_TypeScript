import express from "express"
const userRouter = express.Router()
import {
    registerUser,
    authenticateUser,
    getUserData,
} from "../controllers/userController.js"

userRouter.post("/", registerUser)
userRouter.post("/login", authenticateUser)
userRouter.get("/user", getUserData)

export default userRouter
