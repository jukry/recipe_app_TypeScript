import express from "express"
const authRouter = express.Router()
import { login, logout, refresh } from "../controllers/authController.js"
import loginLimiter from "../middleware/loginLimiter.js"

authRouter.post("/", login)
authRouter.get("/refresh", refresh)
authRouter.post("/logout", logout)

export default authRouter
