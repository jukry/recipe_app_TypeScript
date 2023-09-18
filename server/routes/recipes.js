import express from "express"
const recipesRouter = express.Router()
import {
    getAllRecipes,
    getRandomRecipe,
    getRecipeById,
    createRecipe,
    deleteRecipe,
    updateRecipe,
} from "../controllers/recipeController.js"
import protect from "../middleware/loginMiddleware.js"
import newRecipeLimiter from "../middleware/newRecipeLimiter.js"

// route for get all recipes and create recipe
recipesRouter
    .route("/")
    .get(getAllRecipes)
    .post(protect, newRecipeLimiter, createRecipe)

// get random recipe
recipesRouter.get("/random", getRandomRecipe)

// route for id based request
recipesRouter
    .route("/:id")
    .get(getRecipeById)
    .delete(protect, deleteRecipe)
    .put(protect, updateRecipe)

export default recipesRouter
