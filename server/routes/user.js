import express from "express"
const userRouter = express.Router()
import {
    registerUser,
    authenticateUser,
    getUserData,
} from "../controllers/userController.js"
import protect from "../middleware/loginMiddleware.js"

userRouter.post("/", registerUser)
userRouter.post("/login", authenticateUser)
userRouter.get("/user", protect, getUserData)

export default userRouter
