import express from "express"
const userRouter = express.Router()
import {
    registerUser,
    authenticateUser,
    getUserData,
    getUserRecipes,
} from "../controllers/userController.js"
import protect from "../middleware/loginMiddleware.js"

userRouter.post("/", registerUser)
userRouter.post("/login", authenticateUser)
userRouter.get("/user", protect, getUserData)
userRouter.get("/user/recipes", protect, getUserRecipes)

export default userRouter
