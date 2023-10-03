import express from "express"
const userRouter = express.Router()
import {
    registerUser,
    authenticateUser,
    getUserData,
    getUserRecipes,
    changePassword,
    deleteUser,
} from "../controllers/userController.js"
import protect from "../middleware/loginMiddleware.js"
import {
    addFavRecipe,
    deleteFavRecipe,
} from "../controllers/favRecipeController.js"
import newUserLimiter from "../middleware/newUserLimiter.js"

userRouter.post("/register", newUserLimiter, registerUser)
userRouter.post("/login", authenticateUser)
userRouter.get("/user", protect, getUserData)
userRouter.delete("/user", protect, deleteUser)
userRouter.get("/user/recipes", protect, getUserRecipes)
userRouter.post("/user/favrecipes", protect, addFavRecipe)
userRouter.delete("/user/favrecipes", protect, deleteFavRecipe)
userRouter.post("/user/newpassword", protect, changePassword)

export default userRouter
