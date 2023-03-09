import express from "express"
const recipesRouter = express.Router()
import Recipe from "../models/Recipe.js"

// get all recipes
recipesRouter.get("/", async (req, res) => {
    const recipes = await Recipe.find()
    res.status(200).json(recipes)
})
// get random recipe
recipesRouter.get("/random", async (req, res) => {
    const randomRecipe = await Recipe.aggregate([{ $sample: { size: 1 } }])
    res.status(200).json(randomRecipe)
})

recipesRouter.post("/", async (req, res) => {
    const recipe = req.body
    console.log("RESEPTI", recipe)
    try {
        console.log("TRY POST")
        const resu = await Recipe.create(recipe)
        res.send(resu)
    } catch (err) {
        console.log("ERROR POST")
        res.status(500).send(err)
    }
})

export default recipesRouter
