import express from "express"
const userRouter = express.Router()
import {
    registerUser,
    authenticateUser,
    getUserData,
    getUserRecipes,
} from "../controllers/userController.js"
import protect from "../middleware/loginMiddleware.js"
import {
    addFavRecipe,
    deleteFavRecipe,
} from "../controllers/favRecipeController.js"

userRouter.post("/", registerUser)
userRouter.post("/login", authenticateUser)
userRouter.get("/user", protect, getUserData)
userRouter.get("/user/recipes", protect, getUserRecipes)
userRouter.post("/user/favrecipes", protect, addFavRecipe)
userRouter.delete("/user/favrecipes", protect, deleteFavRecipe)

export default userRouter
