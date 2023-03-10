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

// get all recipes
recipesRouter.get("/", getAllRecipes)

// get random recipe
recipesRouter.get("/random", getRandomRecipe)

//get recipe by id
recipesRouter.get("/:id", getRecipeById)

// create a new recipe
recipesRouter.post("/", createRecipe)

// delete a recipe by id
recipesRouter.delete("/:id", deleteRecipe)

// update request by id
recipesRouter.put("/:id", updateRecipe)

export default recipesRouter
