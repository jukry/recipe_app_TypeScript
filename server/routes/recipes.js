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

// route for get all recipes and create recipe
recipesRouter.route("/").get(getAllRecipes).post(createRecipe)

// get random recipe
recipesRouter.get("/random", getRandomRecipe)

// route for id based request
recipesRouter
    .route("/:id")
    .get(getRecipeById)
    .delete(deleteRecipe)
    .put(updateRecipe)

export default recipesRouter
